import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import keys from '../../utils/keys';
import {server} from '../../app/server.connection';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as SDK from 'microsoft-speech-browser-sdk';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import {  NgZone } from '@angular/core';
@Injectable()
export class CognitiveService {
    private recognizer;
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    listenMessage = this.emitChangeSource.asObservable();
    constructor(private http: Http, public speechRecognition: SpeechRecognition, public zone: NgZone) {
        this.recognizer = this._RecognizerSetup(SDK, "Dictation", "en-US", "Simple", "17328acb588e413eaf4f56c885b3511f");
        
    }
    // Service message commands
    emitMessage(change: any) {
        this.emitChangeSource.next(change);
    }
    speak() {
        console.log('Loaded SDK');
        console.log(SDK);
        const self = this;
        this.speechRecognition.hasPermission().then((has) => {
            if(has) {
                let res = {};
                self.speechRecognition.startListening({language: 'en-US', matches:5, showPartial: true}).subscribe((matches) => {
                    res['DisplayText'] = matches;
                    res['RecognitionStatus'] = 'Success';
                    console.log(res);
                    self.emitMessage(res);
                }, (error) => self.emitMessage(error));
                // self._recognizerStart(SDK, self.recognizer);
            } else {
                self.emitMessage("No permission!");
                self.speechRecognition.requestPermission().then(()=>{
                    self.emitMessage("Permitted!");
                    let res = {};
                    self.speechRecognition.startListening({language: 'en-US', matches:5, showPartial: true}).subscribe((matches) => {
                        res['DisplayText'] = matches;
                        res['RecognitionStatus'] = 'Success';
                        console.log(res);
                        self.emitMessage(res);
                    }, (error) => self.emitMessage(error));
                    // self._recognizerStart(SDK, self.recognizer);

                }, (error) => self.emitMessage(error));
            }
        }, (error) => self.emitMessage(error));
        // this._recognizerStart(SDK, this.recognizer);
    }

    stopSpeaking() {
        const self = this;
        // this._RecognizerStop(SDK, this.recognizer);
        if(this.speechRecognition.stopListening) this.speechRecognition.stopListening().then(() => console.log('stoped'), (error) => self.emitMessage(error));
    }

    analyzeImage(imageFileURL: string): Observable<any> {
        const uriBase = server.vision_url;
        const headers = new Headers();
        const self = this;
        headers.append('Content-Type', 'application/octet-stream');
        headers.append('Ocp-Apim-Subscription-Key', "6c2ca639591f4c00bea957ad371c36ac");
        var src: Observable<any> = Observable.create((observer) => {
            this.makeBlobFromUrl(imageFileURL).subscribe((blob: Blob) => {
                let imageBlob = blob;
                observer.next(this.http.post(uriBase, imageBlob, {headers: headers}).map((res) => res.json()));
                observer.complete();
            }, (error) => {
                observer.error("An error ocurred on CognitiveServices.analyzeImage() @ makeBlobFromUrl");
            });
        });
        return src;
        // let imageBlob = this.dataURItoBlob(imageFileURL);
    }

    makeBlobFromUrl(url): Observable<Blob> {
        var src: Observable<Blob>= Observable.create((observer) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = function(e) {
              if (this.status == 200) {
                var myBlob = this.response;
                observer.next(myBlob);
                observer.complete();
                // myBlob is now the blob that the object URL pointed to.
              }
            };
            xhr.send();
        });
        return src;
    }

    dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // var byteString = atob(dataURI.split(',')[1]);
        var byteString = atob(dataURI);
    
        // separate out the mime component
        var mimeString = 'image/jpeg';
        // var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to an ArrayBuffer
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var _ia = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            _ia[i] = byteString.charCodeAt(i);
        }
    
        var dataView = new DataView(arrayBuffer);
        var blob = new Blob([dataView], { type: mimeString });
        return blob;
    }

    analyseSound(soundFilePath) {

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
                    null,
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