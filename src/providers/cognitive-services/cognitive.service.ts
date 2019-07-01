declare var SpeechSDK;

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import keys from '../../utils/keys';
import { server } from '../../app/server.connection';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
// import * as SDK from 'microsoft-speech-browser-sdk';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import {  NgZone } from '@angular/core';

@Injectable()
export class CognitiveService {
    private recognizer;
    private soundAnalysisHeader: Headers;
    private authorizationToken: string = "a695cace0bbe42e7902d7f8aae1e8a6a";
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    listenMessage = this.emitChangeSource.asObservable();
    constructor(private http: Http, public speechRecognition: SpeechRecognition, public zone: NgZone) {
        // this.recognizer = this._RecognizerSetup(SDK, "Dictation", "en-US", "Simple", "17328acb588e413eaf4f56c885b3511f");
        this.soundAnalysisHeader = new Headers();
        
    }
    // Service message commands
    emitMessage(change: any) {
        this.emitChangeSource.next(change);
    }
    speak() {
        var self = this;
        var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        var speechConfig;
        if (this.authorizationToken) {
            this.soundAnalysisHeader.append('Ocp-Apim-Subscription-Key',this.authorizationToken);
            this.soundAnalysisHeader.append('Content-Type','audio/wav; codec="audio/pcm"; samplerate=16000');
            speechConfig = SpeechSDK.SpeechConfig.fromSubscription(this.authorizationToken, "westus");
        } else {
            alert("Please enter your key");
            return;
        }
        
        if (speechConfig) {
            speechConfig.speechRecognitionLanguage = "en-US";
        }
        console.log('Loaded SDK');
        this.recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
        this.recognizer.sessionStarted = function (s, e) {
            console.log(e);
            console.log("Session started");
        }
        this.recognizer.recognized = function (s, e) {
            console.log(e);
            console.log("Recognized");
            self.emitMessage(e.result.text);
        }
        this.recognizer.canceled = function (s, e) {
            console.log(e);
            console.log("Canceled");
            if (e.reason === SpeechSDK.CancellationReason.Error) {
                console.log(e.errorDetails);
            }
        }

        // Starts recognition
        this.recognizer.startContinuousRecognitionAsync();
        // this._recognizerStart(SpeechSDK, this.recognizer);
    }

    stopSpeaking() {
        const self = this;
        // this._RecognizerStop(SpeechSDK, this.recognizer);
        this.recognizer.stopContinuousRecognitionAsync(
            function () {
                self.recognizer.close();
                self.recognizer = undefined;
            },
            function (err) {
                self.recognizer.close();
                self.recognizer = undefined;
            });

        console.log('Stopped');
        // if(this.speechRecognition.stopListening) this.speechRecognition.stopListening().then(() => console.log('stoped'), (error) => self.emitMessage(error));
    }

    analyzeImage(imageDataURL: string): Observable<any> {
        const uriBase = server.vision_url;
        const headers = new Headers();
        const self = this;
        headers.append('Content-Type', 'application/octet-stream');
        headers.append('Ocp-Apim-Subscription-Key', "6c2ca639591f4c00bea957ad371c36ac");
        const src: Observable<any> = Observable.create((observer) => {
            let imageBlob = this.dataURItoBlob(imageDataURL);
            this.http.post(uriBase, imageBlob, {headers: headers}).map((res) => res.json()).subscribe((data) => {
                observer.next(data);
                observer.complete();
            }, (error) => observer.error(error));
        });
        return src;
    }

    dataURItoBlob(dataURI: string): Blob {
        // convert base64 to raw binary data held in a string
        // var byteString = atob(dataURI.split(',')[1]);
        const byteString = atob(dataURI);
    
        // separate out the mime component
        const mimeString = 'image/jpeg';
        // var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to an ArrayBuffer
        const arrayBuffer = new ArrayBuffer(byteString.length);
        let _ia = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            _ia[i] = byteString.charCodeAt(i);
        }
    
        const dataView = new DataView(arrayBuffer);
        const blob = new Blob([dataView], { type: mimeString });
        return blob;
    }

    analyseSound(soundFile: File | Blob): Observable<any> {
        const src: Observable<any> = Observable.create((observer) => {
            let speechURL ="https://speech.platform.bing.com/speech/recognition/dictation/cognitiveservices/v1?language=en-US&format=simple";
            this.http.post(speechURL, soundFile, {headers: this.soundAnalysisHeader}).subscribe((data) => {
                data = data.json();
                console.log(data);
                observer.next(data);
                observer.complete();
            }, (error) => {
                observer.error(error);
            });
        });
        return src;
    }

    private _RecognizerSetup(SDK: any, recognitionMode: string, language: string, format: string, subscriptionKey: string) {
            
        switch (recognitionMode) {
            case "Interactive" :
                recognitionMode = SDK.RecognitionMode.Interactive;    
                break;
            case "Conversation" :
                recognitionMode = SDK.RecognitionMode.Conversation;    
                break;
            case "Dictation" :
                recognitionMode = SDK.RecognitionMode.Dictation;    
                break;
            default:
                recognitionMode = SDK.RecognitionMode.Interactive;
        }
        var recognizerConfig = new SDK.RecognizerConfig(
            new SDK.SpeechConfig(
                new SDK.Context(
                    new SDK.OS(navigator.userAgent, "Browser", null),
                    new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
            recognitionMode,
            language, // Supported languages are specific to each recognition mode. Refer to docs.
            format); // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)
        
        return SDK.CreateRecognizer(recognizerConfig, new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey));
    }

    private _recognizerStart(SDK, recognizer) {
        recognizer.Recognize((event) => {
            /*
                Alternative syntax for typescript devs.
                if (event instanceof SDK.RecognitionTriggeredEvent)
            */
            switch (event.Name) {
                case "RecognitionTriggeredEvent" :
                    console.log("Initializing");
                    break;
                case "ListeningStartedEvent" :
                    console.log("Listening");
                    break;
                case "RecognitionStartedEvent" :
                    console.log("Listening_Recognizing");
                    break;
                case "SpeechStartDetectedEvent" :
                    console.log("Listening_DetectedSpeech_Recognizing");
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechHypothesisEvent" :
                    console.log('Hypoteses ->', event.Result.Text);
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechFragmentEvent" :
                    console.log('Hypoteses ->', event.Result.Text);
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechEndDetectedEvent" :
                    console.log('Speech end detected');
                    console.log("Processing_Adding_Final_Touches");
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechSimplePhraseEvent" :
                    console.log('Recognized phrase SIMPLE ->', JSON.stringify(event.Result, null, 3));
                    this.emitMessage(event.Result);
                    break;
                    case "SpeechDetailedPhraseEvent" :
                    console.log('Recognized phrase DETAILED ->', JSON.stringify(event.Result, null, 3));
                    this.emitMessage(event.Result);
                    break;
                case "RecognitionEndedEvent" :
                    console.log('Completed');
                    console.log("Idle");
                    console.log(JSON.stringify(event)); // Debug information
                    break;
            }
        })
        .On(() => {
            // The request succeeded. Nothing to do here.
            console.log('Success!');
        },
        (error) => {
            console.log('ERROR');
            console.info(error);
            console.error(error);
        });
    }

    private _RecognizerStop(SDK, recognizer) {
        // recognizer.AudioSource.Detach(audioNodeId) can be also used here. (audioNodeId is part of ListeningStartedEvent)
        recognizer.AudioSource.TurnOff();
    }

    
}