import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import keys from '../../utils/keys';
import {server} from '../../app/server.connection';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import * as SDK from 'microsoft-speech-browser-sdk';

@Injectable()
export class CognitiveService {
    private recognizer;
    private fileTransfer: FileTransferObject;
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    listenMessage = this.emitChangeSource.asObservable();
    constructor(private http: Http, private transfer: FileTransfer) {
        this.fileTransfer = this.transfer.create();
        this.recognizer = this._RecognizerSetup(SDK, "Dictation", "en-US", "Simple", "17328acb588e413eaf4f56c885b3511f");
        
    }
    // Service message commands
    emitMessage(change: any) {
        this.emitChangeSource.next(change);
    }
    speak() {
        console.log('Loaded SDK');
        console.log(SDK);
        this._recognizerStart(SDK, this.recognizer);
    }

    stopSpeaking() {
        this._RecognizerStop(SDK, this.recognizer);
    }

    analyzeImage(imageFilePath) {
        const uriBase = server.vision_url;
        const headers = new Headers();
        headers.append('Content-Type', 'application/octet-stream');
        headers.append('Ocp-Apim-Subscription-Key', keys.VISION_API_KEY);
    
        const options: FileUploadOptions = {
            fileKey: 'file',
            httpMethod: 'POST',
            mimeType: 'image/jpeg',
            headers
        };
        return this.fileTransfer.upload(imageFilePath, uriBase, options)
            .then(data => data.response)
            .then(res => {
            const resParse = JSON.parse(res);    
            return resParse.description.captions[0].text;
        }, error => {
            console.error(`ANALIZE IMAGE ERROR -> ${JSON.stringify(error)}`);
        });
        
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
            console.info('ERROR');
            console.error(error);
        });
    }

    private _RecognizerStop(SDK, recognizer) {
        // recognizer.AudioSource.Detach(audioNodeId) can be also used here. (audioNodeId is part of ListeningStartedEvent)
        recognizer.AudioSource.TurnOff();
    }

    
}