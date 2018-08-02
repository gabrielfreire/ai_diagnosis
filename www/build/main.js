webpackJsonp([0],{

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const server = {
    // url: 'http://localhost:3000/api'
    url: 'https://imsdiag.herokuapp.com/api',
    vision_url: 'https://westeurope.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories%2CDescription%2CColor&details=&language=en'
};
/* harmony export (immutable) */ __webpack_exports__["a"] = server;

//# sourceMappingURL=server.connection.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CognitiveService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_server_connection__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_microsoft_speech_browser_sdk__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_microsoft_speech_browser_sdk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_microsoft_speech_browser_sdk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_speech_recognition__ = __webpack_require__(336);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let CognitiveService = class CognitiveService {
    constructor(http, speechRecognition, zone) {
        this.http = http;
        this.speechRecognition = speechRecognition;
        this.zone = zone;
        // Observable string sources
        this.emitChangeSource = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        // Observable string streams
        this.listenMessage = this.emitChangeSource.asObservable();
        // this.recognizer = this._RecognizerSetup(SDK, "Dictation", "en-US", "Simple", "17328acb588e413eaf4f56c885b3511f");
        this.soundAnalysisHeader = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.soundAnalysisHeader.append('Ocp-Apim-Subscription-Key', '803f5c8476884b0baf897ed24e28fbf7');
        this.soundAnalysisHeader.append('Content-Type', 'audio/wav; codec="audio/pcm"; samplerate=16000');
    }
    // Service message commands
    emitMessage(change) {
        this.emitChangeSource.next(change);
    }
    speak() {
        this.recognizer = this._RecognizerSetup(__WEBPACK_IMPORTED_MODULE_6_microsoft_speech_browser_sdk__, "Dictation", "en-US", "Simple", "803f5c8476884b0baf897ed24e28fbf7");
        console.log('Loaded SDK');
        console.log(__WEBPACK_IMPORTED_MODULE_6_microsoft_speech_browser_sdk__);
        const self = this;
        // this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
        //     console.log('available ?', available);
        //     this.speechRecognition.hasPermission().then((has) => {
        //         console.log('Permission', has);
        //         if(has) {
        //             let res = {};
        //             self.speechRecognition.startListening({language: 'en-US', matches:5, showPartial: true}).subscribe((matches) => {
        //                 console.log('Listening');
        //                 res['DisplayText'] = matches[0];
        //                 res['RecognitionStatus'] = 'Success';
        //                 console.log(res);
        //                 self.emitMessage(res);
        //             }, (error) => {
        //                 console.log('error->', error);
        //                 self.emitMessage(error)
        //             });
        //             // self._recognizerStart(SDK, self.recognizer);
        //         } else {
        //             self.emitMessage("No permission!");
        //             console.log('Permission', has);
        //             self.speechRecognition.requestPermission().then(()=>{
        //                 console.log('Permitted');
        //                 self.emitMessage("Permitted!");
        //                 let res = {};
        //                 self.speechRecognition.startListening({language: 'en-US', matches:5, showPartial: true}).subscribe((matches) => {
        //                     console.log('Listening');
        //                     res['DisplayText'] = matches[0];
        //                     res['RecognitionStatus'] = 'Success';
        //                     console.log(res);
        //                     self.emitMessage(res);
        //                 }, (error) => {
        //                     console.log('error->', error);
        //                     self.emitMessage(error)
        //                 });
        //                 // self._recognizerStart(SDK, self.recognizer);
        //             }, (error) => {
        //                 console.log('error->', error);
        //                 self.emitMessage(error)
        //             });
        //         }
        //     }, (error) => self.emitMessage(error));
        // }, (error) => {
        //     console.log('Error ocurred ->', error);
        //     self.emitMessage('Error ' + JSON.stringify(error));
        // });
        this._recognizerStart(__WEBPACK_IMPORTED_MODULE_6_microsoft_speech_browser_sdk__, this.recognizer);
    }
    stopSpeaking() {
        const self = this;
        this._RecognizerStop(__WEBPACK_IMPORTED_MODULE_6_microsoft_speech_browser_sdk__, this.recognizer);
        console.log('Stopped');
        // if(this.speechRecognition.stopListening) this.speechRecognition.stopListening().then(() => console.log('stoped'), (error) => self.emitMessage(error));
    }
    analyzeImage(imageDataURL) {
        const uriBase = __WEBPACK_IMPORTED_MODULE_2__app_server_connection__["a" /* server */].vision_url;
        const headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        const self = this;
        headers.append('Content-Type', 'application/octet-stream');
        headers.append('Ocp-Apim-Subscription-Key', "6c2ca639591f4c00bea957ad371c36ac");
        const src = __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].create((observer) => {
            let imageBlob = this.dataURItoBlob(imageDataURL);
            this.http.post(uriBase, imageBlob, { headers: headers }).map((res) => res.json()).subscribe((data) => {
                observer.next(data);
                observer.complete();
            }, (error) => observer.error(error));
        });
        return src;
    }
    dataURItoBlob(dataURI) {
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
    analyseSound(soundFile) {
        const src = __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].create((observer) => {
            let speechURL = "https://speech.platform.bing.com/speech/recognition/dictation/cognitiveservices/v1?language=en-US&format=simple";
            this.http.post(speechURL, soundFile, { headers: this.soundAnalysisHeader }).subscribe((data) => {
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
    _RecognizerSetup(SDK, recognitionMode, language, format, subscriptionKey) {
        switch (recognitionMode) {
            case "Interactive":
                recognitionMode = SDK.RecognitionMode.Interactive;
                break;
            case "Conversation":
                recognitionMode = SDK.RecognitionMode.Conversation;
                break;
            case "Dictation":
                recognitionMode = SDK.RecognitionMode.Dictation;
                break;
            default:
                recognitionMode = SDK.RecognitionMode.Interactive;
        }
        var recognizerConfig = new SDK.RecognizerConfig(new SDK.SpeechConfig(new SDK.Context(new SDK.OS(navigator.userAgent, "Browser", null), new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))), recognitionMode, language, // Supported languages are specific to each recognition mode. Refer to docs.
        format); // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)
        return SDK.CreateRecognizer(recognizerConfig, new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey));
    }
    _recognizerStart(SDK, recognizer) {
        recognizer.Recognize((event) => {
            /*
                Alternative syntax for typescript devs.
                if (event instanceof SDK.RecognitionTriggeredEvent)
            */
            switch (event.Name) {
                case "RecognitionTriggeredEvent":
                    console.log("Initializing");
                    break;
                case "ListeningStartedEvent":
                    console.log("Listening");
                    break;
                case "RecognitionStartedEvent":
                    console.log("Listening_Recognizing");
                    break;
                case "SpeechStartDetectedEvent":
                    console.log("Listening_DetectedSpeech_Recognizing");
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechHypothesisEvent":
                    console.log('Hypoteses ->', event.Result.Text);
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechFragmentEvent":
                    console.log('Hypoteses ->', event.Result.Text);
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechEndDetectedEvent":
                    console.log('Speech end detected');
                    console.log("Processing_Adding_Final_Touches");
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechSimplePhraseEvent":
                    console.log('Recognized phrase SIMPLE ->', JSON.stringify(event.Result, null, 3));
                    this.emitMessage(event.Result);
                    break;
                case "SpeechDetailedPhraseEvent":
                    console.log('Recognized phrase DETAILED ->', JSON.stringify(event.Result, null, 3));
                    this.emitMessage(event.Result);
                    break;
                case "RecognitionEndedEvent":
                    console.log('Completed');
                    console.log("Idle");
                    console.log(JSON.stringify(event)); // Debug information
                    break;
            }
        })
            .On(() => {
            // The request succeeded. Nothing to do here.
            console.log('Success!');
        }, (error) => {
            console.log('ERROR');
            console.info(error);
            console.error(error);
        });
    }
    _RecognizerStop(SDK, recognizer) {
        // recognizer.AudioSource.Detach(audioNodeId) can be also used here. (audioNodeId is part of ListeningStartedEvent)
        recognizer.AudioSource.TurnOff();
    }
};
CognitiveService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_speech_recognition__["a" /* SpeechRecognition */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
], CognitiveService);

//# sourceMappingURL=cognitive.service.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let AppService = class AppService {
    constructor() {
        // Observable string sources
        this.emitChangeSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        // Observable string streams
        this.listenMessage = this.emitChangeSource.asObservable();
    }
    // Service message commands
    emitMessage(change) {
        this.emitChangeSource.next(change);
    }
};
AppService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], AppService);

//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web_audio_audioContextGenerator_service__ = __webpack_require__(840);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__web_audio_audioContextGenerator_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web_audio_recorder__ = __webpack_require__(430);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__web_audio_wav_recorder__ = __webpack_require__(337);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__web_audio_wav_recorder__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__diagnostics_diagnostic_service__ = __webpack_require__(322);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__diagnostics_diagnostic_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cognitive_services_cognitive_service__ = __webpack_require__(163);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__cognitive_services_cognitive_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__camera_camera_provider__ = __webpack_require__(325);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__camera_camera_provider__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 196:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 196;

/***/ }),

/***/ 253:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 253;

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(300);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let TabsPage = class TabsPage {
    constructor() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
};
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\tabs\tabs.html"*/'<ion-tabs>\n    <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let AboutPage = class AboutPage {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
        this.dataie = `{
    "metadata": null,
    "questionset": [{
        "additional_information": {
            "title": "Patient Health Questionnaire (PHQ-9)",
            "created_at": null,
            "updated_at": null,
            "question_id": null,
            "subheader": "Validity has been assessed against an independent structured mental health professional (MHP) interview. PHQ-9 score ≥10 had a sensitivity of 88% and a specificity of 88% for major depression. It can even be used over the telephone."
        },
        "questions": [{
                "key": "question1",
                "label": "Little interest or pleasure in doing things?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 0,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question2",
                "label": "Feeling down, depressed, or hopeless?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 1,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question3",
                "label": "Trouble falling or staying asleep, or sleeping too much?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 2,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question4",
                "label": "Feeling tired or having little energy?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 3,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question5",
                "label": "Poor appetite or overeating?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 4,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question6",
                "label": "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 5,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question7",
                "label": "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 6,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question8",
                "label": "Thoughts that you would be better off dead, or of hurting yourself in some way?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 7,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question9",
                "label": "Trouble concentrating on things, such as reading the newspaper or watching television?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 8,
                "visibility": "visible",
                "controlType": "dropdown"
            }
        ],
        "evaluation": [{
                "maxscore": 27,
                "event": {
                    "type": "score_id",
                    "message": "Severe"
                },
                "fact": "mental_health_condition",
                "path": ".score"
            },
            {
                "maxscore": 19,
                "event": {
                    "type": "score_id",
                    "message": "Moderately Severe"
                },
                "fact": "mental_health_condition",
                "path": ".score"
            },
            {
                "maxscore": 14,
                "event": {
                    "type": "score_id",
                    "message": "Moderate"
                },
                "fact": "mental_health_condition",
                "path": ".score"
            },
            {
                "maxscore": 9,
                "event": {
                    "type": "score_id",
                    "message": "Mild"
                },
                "fact": "mental_health_condition",
                "path": ".score"
            },
            {
                "maxscore": 4,
                "event": {
                    "type": "score_id",
                    "message": "None"
                },
                "fact": "mental_health_condition",
                "path": ".score"
            }
        ]
    }]
}`;
        this.ruleie = `{
      conditions: {
          all: [{
                  fact: 'sore-throat',
                  operator: 'lessThanInclusive',
                  value: 10,
                  path: '.soreThroatLevel'
              },
              {
                  fact: 'sore-throat',
                  operator: 'greaterThanInclusive',
                  value: 5,
                  path: '.soreThroatLevel'
              },
              {
                  fact: 'stuffy-nose',
                  operator: 'greaterThanInclusive',
                  value: 5,
                  path: '.stuffyNoseLevel'
              },
              {
                  fact: 'headache',
                  operator: 'greaterThanInclusive',
                  value: 6,
                  path: '.headacheLevel'
              },
              {
                  fact: 'has-fever',
                  operator: 'greaterThanInclusive',
                  value: 7,
                  path: '.feverLevel'
              }
          ]
      },
      event: {
          type: 'has-flu',
          params: {
              message: 'The current Patient has flu',
              recommendations: ['Drink a lot of water', 'Consume Vitamin C', 'Patient should Rest']
          }
      }
  }`;
    }
};
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-about',template:/*ion-inline-start:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\about\about.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            About\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-card color="dark">\n        <ion-card-header>Question data format</ion-card-header>\n        <ion-card-content>\n            <pre>{{dataie}}</pre>\n        </ion-card-content>\n    </ion-card>\n    <ion-card color="dark">\n        <ion-card-header>Rule data format</ion-card-header>\n        <ion-card-content>\n            <pre>{{ruleie}}</pre>\n        </ion-card-content>\n    </ion-card>\n    <ion-card color="dark">\n        <ion-card-header>Heart Disease Data</ion-card-header>\n        <ion-card-content>\n            <img src="assets/imgs/age_patients.png">\n            <img src="assets/imgs/hd_patients.png">\n        </ion-card-content>\n    </ion-card>\n    <ion-card color="dark">\n        <ion-card-header>Heart Disease Neural Network Model</ion-card-header>\n        <ion-card-content>\n            <img src="assets/imgs/nn_graph.png">\n            <img src="assets/imgs/accuracy_cost.png">\n        </ion-card-content>\n    </ion-card>\n    <ion-card color="dark">\n        <ion-card-header>New Heart Disease Neural Network Model</ion-card-header>\n        <ion-card-content>\n            <img src="assets/imgs/nn_graph_97.png">\n            <img src="assets/imgs/accuracy_cost_2.png">\n        </ion-card-content>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\about\about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ContactPage = class ContactPage {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
};
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-contact',template:/*ion-inline-start:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\contact\contact.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Contact\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <ion-list-header>Follow IMS on LinkedIn</ion-list-header>\n        <ion-item>\n            <ion-icon name="ionic" item-start></ion-icon>\n            <a href="https://www.linkedin.com/company/1308682/" style="font-size:11px">https://www.linkedin.com/company/1308682/</a>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\contact\contact.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], ContactPage);

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_watson_chat__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__formbuilder_form_template_formBuilder__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__picture_analisys_picture_analisys__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_service__ = __webpack_require__(168);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let HomePage = class HomePage {
    constructor(navCtrl, camera, appService) {
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.appService = appService;
    }
    ngOnInit() {
        this.appService.listenMessage.subscribe((value) => {
            switch (value) {
                case 'hd':
                    this.goToForm('hd');
                    break;
                case 'flu':
                    this.goToForm('flu');
                    break;
            }
        });
    }
    goToChat() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__chat_watson_chat__["a" /* ChatPage */]);
    }
    goToPictureAnalisys() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__picture_analisys_picture_analisys__["a" /* PictureAnalisysPage */]);
    }
    goToForm(value) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__formbuilder_form_template_formBuilder__["a" /* FormBuilderCustom */], { form: value });
    }
};
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\home\home.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>IMS Diagnosis</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <h3>Select a Diagnosis</h3>\n    <button full ion-button color="calm" (click)="goToForm(\'flu\')">Flu Diagnosis</button>\n    <button full ion-button color="calm" (click)="goToForm(\'hd\')">Heart Disease Diagnosis</button>\n    <button full ion-button color="calm" (click)="goToForm(\'mh\')">Patient Health Questionnaire (PHQ-9)</button>\n    <h3>Watson Services</h3>\n    <button full ion-button color="calm" (click)="goToForm(\'watson\')">Ask Watson Discovery</button>\n    <button full ion-button color="calm" (click)="goToChat()">Ask Watson in a Conversation</button>\n    <h3>MS Azure Services</h3>\n    <button full ion-button color="calm" (click)="goToPictureAnalisys()">Analyze a picture</button>\n</ion-content>'/*ion-inline-end:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_6__app_app_service__["a" /* AppService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ChatUser__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ChatRoom__ = __webpack_require__(527);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let ChatPage = class ChatPage {
    constructor(socket) {
        this.socket = socket;
        this.chatRoom = new __WEBPACK_IMPORTED_MODULE_4__ChatRoom__["a" /* ChatRoom */]();
    }
    ngOnInit() {
        //start watson chat
        this.chatRoom.addUser(new __WEBPACK_IMPORTED_MODULE_3__ChatUser__["a" /* ChatUser */]('bot'));
        this.chatRoom.addUser(new __WEBPACK_IMPORTED_MODULE_3__ChatUser__["a" /* ChatUser */]('user'));
        this.zone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]({ enableLongStackTrace: false });
        this.socket.connect();
        this.chatBox = "";
        this.socket.on("chat_message", (msg) => {
            this.zone.run(() => {
                this.chatRoom.addMessage('bot', `${msg}`);
                setTimeout(() => {
                    if (this.content._scroll) {
                        this.content.scrollToBottom();
                    }
                }, 300);
            });
        });
        this.socket.on('disconnect', () => {
            // TODO SOMETHING
            console.warn('Disconnected from socket');
        });
    }
    ionViewDidLeave() {
        this.socket.disconnect();
    }
    send(message) {
        // if(message && message != "") {
        this.zone.run(() => {
            this.chatRoom.addMessage('user', `${this.chatBox}`);
            setTimeout(() => {
                if (this.content._scroll) {
                    this.content.scrollToBottom();
                }
            }, 300);
        });
        this.socket.emit("chat_message", this.chatBox);
        this.chatBox = "";
        this.focus();
    }
    onFocus() {
        this.content.resize();
        this.content.scrollToBottom();
    }
    focus() {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('content'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Content */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Content */]) === "function" && _a || Object)
], ChatPage.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chat_input'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], ChatPage.prototype, "messageInput", void 0);
ChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-chat',template:/*ion-inline-start:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\chat_watson\chat.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            Ask Dr. Watson\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content #content class="scroll-content" class="home">\n\n    <div class="message-wrap">\n\n        <div class="message" #list *ngFor="let message of chatRoom.messages" \n\n        [class.left]=" message.user == \'bot\'" \n\n        [class.right]="message.user == \'user\'">\n\n            <div class="message-detail">\n\n                <div class="message-info">\n\n                    <p>{{ message.user == \'bot\' ? "Dr. Watson" : "You"}}</p>\n\n                </div>\n\n                <div class="message-content">\n\n                    <p class="line-breaker" [innerHTML]="message.message"></p>\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n</ion-content>\n\n<ion-footer no-border style=\'height: 55px;\'>\n\n    <div class="input-wrap">\n\n        <textarea #chat_input class="chat-input" type="text" [(ngModel)]="chatBox" (focusin)="onFocus()" (keyup.enter)="send($event)" placeholder="Type something...">\n\n        </textarea>\n\n        <button item-right icon-only ion-button (click)="send($event)">\n\n            <ion-icon name=\'ios-send\' ios=\'ios-send\' md=\'md-send\'></ion-icon>\n\n        </button>\n\n    </div>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\chat_watson\chat.html"*/,
        styles: ['./chat.scss']
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"]) === "function" && _c || Object])
], ChatPage);

var _a, _b, _c;
//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormBuilderCustom; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__questions_question_service__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questions_question_control_service__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_diagnostics_diagnostic_service__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loaders_loaders__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mappers_event_mapper_service__ = __webpack_require__(323);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







const ERROR_NO_EVENT_TO_TRIGGER = "No event was passed to the trigger";
const UNTITLED_QUESTIONNAIRE = 'Untitled Questionnaire';
/**
 * FORM COMPONENT
 */
let FormBuilderCustom = class FormBuilderCustom {
    constructor(questionControlService, questionService, diagnosticsService, loadingCtrl, eventMapper, viewCtrl) {
        this.questionControlService = questionControlService;
        this.questionService = questionService;
        this.diagnosticsService = diagnosticsService;
        this.loadingCtrl = loadingCtrl;
        this.eventMapper = eventMapper;
        this.viewCtrl = viewCtrl;
        this.changeEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.questions = [];
        this.payLoad = '';
        this.title = '';
        this.hasSubmit = true;
    }
    ngOnInit() {
        this.listenToQuestionEvents();
        let params = this.viewCtrl.getNavParams();
        if (params && params.data) {
            this.getForm(params.data.form);
        }
    }
    /**
     * Submit data to get action back from server, in this case: Diagnostic
     */
    onSubmit() {
        let loading = this.loadingCtrl.create(__WEBPACK_IMPORTED_MODULE_5__loaders_loaders__["a" /* LoaderConfigs */].submit);
        this.hasSubmit = false;
        this.questions = [];
        loading.present();
        this.diagnosticsService.getDiagnostic(this.form.value).subscribe((res) => {
            if (res && res.data)
                this.payLoad = res;
            loading.dismiss();
        });
    }
    /**
     * Listener for the change event of a df-question
     */
    listenToQuestionEvents() {
        //listen for the event from df-question
        this.changeEvent.subscribe((eventBody) => {
            if (!eventBody)
                throw ERROR_NO_EVENT_TO_TRIGGER;
            let eventTarget = eventBody.question.event.target;
            let targetQuestion = this.getQuestion(eventTarget);
            let options = {
                event: eventBody.question.event.type || "visibility",
                action: eventBody.question.event.action || "visible",
                target: targetQuestion
            };
            let newQuestion = this.eventMapper.applyAction(options);
            this.updateQuestion(targetQuestion.key, newQuestion);
        });
    }
    /**
     * Get a specific form by name
     *
     * Questionnaire names -> 'flu', 'hd', 'mh' and 'watson'
     * @param option A questionnaire name
     */
    getForm(option) {
        let loading = this.loadingCtrl.create(__WEBPACK_IMPORTED_MODULE_5__loaders_loaders__["a" /* LoaderConfigs */].loading);
        loading.present();
        this.questionService.makeForm(option).subscribe((questionnaire) => {
            this.title = questionnaire.additional_information.title ? questionnaire.additional_information.title : UNTITLED_QUESTIONNAIRE;
            this.form = this.questionControlService.toFormGroup(questionnaire.questions);
            this.questions = questionnaire.questions;
            this.hasSubmit = true;
            this.payLoad = '';
            loading.dismiss();
        }, (error) => {
            loading.dismiss();
            console.log(error);
        });
    }
    /**
     * *****************
     * QUESTIONS UTILITY METHODS
     * *****************
     */
    /**
     * Returns a question by key
    * @param key question key
    * @return A Question
    */
    getQuestion(key) {
        for (var i = 0; i < this.questions.length; i++) {
            if (this.questions[i].key === key) {
                return this.questions[i];
            }
        }
        return null;
    }
    /**
     * Update a specific question
    * @param key question key
    */
    updateQuestion(key, newQuestion) {
        for (var i = 0; i < this.questions.length; i++) {
            if (this.questions[i].key === key) {
                this.questions[i] = newQuestion;
            }
        }
    }
    /**
     * Clear the form
     */
    clear() {
        this.questions = [];
        this.hasSubmit = false;
        this.payLoad = '';
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], FormBuilderCustom.prototype, "changeEvent", void 0);
FormBuilderCustom = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-form',template:/*ion-inline-start:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\home\formbuilder\form-template\formBuilder.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{title}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n    <div *ngIf="form">\n\n        <!-- <h4 *ngIf="questions && questions.length">{{title}}</h4> -->\n\n        <form (ngSubmit)="onSubmit()" [formGroup]="form">\n\n            <div *ngFor="let question of questions" class="form-row">\n\n                <df-question [changeEvent]="changeEvent" [question]="question" [form]="form"></df-question>\n\n            </div>\n\n\n\n            <div *ngIf="hasSubmit" class="form-row">\n\n\n\n                <button full ion-button color="calm" type="submit" [disabled]="!form.valid">Get Diagnostic</button>\n\n\n\n            </div>\n\n        </form>\n\n\n\n\n\n        <!-- ASK WATSON DISCOVERY -->\n\n        <div *ngIf="payLoad && !payLoad.data.prediction && payLoad.data.usage" class="form-row">\n\n            <pre>{{ payLoad.data | json }}</pre>\n\n        </div>\n\n        <div *ngIf="payLoad && !payLoad.data.prediction && !payLoad.data.usage && payLoad.data.results" class="form-row">\n\n            <ion-card>\n\n                <ion-card-header>\n\n                    <h1 ion-text>WATSON</h1>\n\n                </ion-card-header>\n\n                <ion-card-content>\n\n                    <h1 *ngIf="payLoad.data.results.length == 0">No results were found</h1>\n\n                    <!-- <h1 *ngIf="payLoad.data.results.length">{{payLoad.data.results.length}} results...</h1> -->\n\n                    <h1 *ngIf="payLoad.data.results.length">Categories:</h1>\n\n                    <ion-item-group *ngFor="let res of payLoad.data.results">\n\n                        <ion-item-divider color="light"><strong>Result score: {{res.result_metadata.score}}</strong></ion-item-divider>\n\n                        <ion-item *ngFor="let cat of res.enriched_text.categories">\n\n\n\n                            <p class="label-result-watson-discovery"><strong>Category label:</strong> <span>{{cat.label}}</span></p>\n\n                            <p class="label-result-watson-discovery"><strong>Category score:</strong> <span>{{cat.score}}</span></p>\n\n\n\n                        </ion-item>\n\n                        <ion-item-divider color="light"><strong>Concepts</strong></ion-item-divider>\n\n                        <ion-item *ngFor="let concpt of res.enriched_text.concepts">\n\n\n\n                            <p class="label-result-watson-discovery"><strong>Concept: </strong><span>{{concpt.text}}</span></p>\n\n                            <p class="label-result-watson-discovery"><strong>Concept relevance: </strong><span>{{concpt.relevance}}</span></p>\n\n\n\n                            <strong>Concept source: </strong>\n\n                            <a class="label-result-watson-discovery" [href]="concpt.dbpedia_resource" target="_blank"><span>{{concpt.dbpedia_resource}}</span></a>\n\n                        </ion-item>\n\n                    </ion-item-group>\n\n                    <h1 *ngIf="payLoad.data.results.length">Passages:</h1>\n\n                    <ion-item-group *ngFor="let passage of payLoad.data.passages">\n\n                        <ion-item-divider color="light"><strong>Relevance score: {{passage.passage_score.toFixed(2)}}</strong></ion-item-divider>\n\n                        <ion-item>\n\n                            <p class="label-result-watson-discovery" [innerHTML]="passage.passage_text"></p>\n\n                        </ion-item>\n\n                    </ion-item-group>\n\n                </ion-card-content>\n\n            </ion-card>\n\n\n\n        </div>\n\n\n\n\n\n        <!-- FLU DIAGNOSIS -->\n\n        <div *ngIf="payLoad && !payLoad.data.score && !payLoad.data.prediction && !payLoad.data.usage && !payLoad.data.results" class="form-row">\n\n\n\n            <ion-card [style.backgroundColor]="payLoad.data.message ? \'#ffdada\' : \'#e6ffe6\'">\n\n\n\n                <ion-card-header>\n\n                    <!-- <h1>Diagnosis:</h1> -->\n\n                </ion-card-header>\n\n\n\n                <ion-card-content>\n\n                    <!-- Add card content here! -->\n\n                    <h1 ion-text [style.color]="payLoad.data.message ? \'red\' : \'green\'">\n\n                        <ion-icon name="{{payLoad.data.message ? \'alert\' : \'checkmark\'}}"></ion-icon> {{payLoad.data.message ? payLoad.data.message : \'This patient does not seem to have the flu\'}}</h1>\n\n                    <span *ngIf="payLoad.data.recommendations && payLoad.data.recommendations.length">\n\n                        <ion-item-group>\n\n                            <ion-item-divider color="light"><strong>Recommendations:</strong></ion-item-divider>\n\n                            <ion-item *ngFor="let rec of payLoad.data.recommendations">\n\n                                    <ion-icon name="alert"></ion-icon> {{rec}}\n\n                            </ion-item>\n\n                        </ion-item-group>\n\n                    </span>\n\n                </ion-card-content>\n\n\n\n            </ion-card>\n\n        </div>\n\n\n\n        <!-- MENTAL HEALTH DIAGNOSIS -->\n\n        <div *ngIf="payLoad && payLoad.data.score && !payLoad.data.prediction && !payLoad.data.usage && !payLoad.data.results" class="form-row">\n\n\n\n            <ion-card [style.backgroundColor]="payLoad.data.score >= 15 ? \'#ffdada\' : \'#e6ffe6\'">\n\n\n\n                <ion-card-header>\n\n                    <!-- <h1>Diagnosis:</h1> -->\n\n                </ion-card-header>\n\n\n\n                <ion-card-content>\n\n                    <!-- Add card content here! -->\n\n                    <h1 ion-text [style.color]="payLoad.data.score >= 15 ? \'red\' : \'green\'">\n\n                        <!-- <ion-icon name="{{payLoad.data.message ? \'alert\' : \'checkmark\'}}"></ion-icon> {{payLoad.data.message ? payLoad.data.message : \'This patient does not seem to have the flu\'}}</h1> -->\n\n                        <ion-icon name="{{payLoad.data.score >= 15 ? \'alert\' : \'checkmark\'}}"></ion-icon> {{\'Score: \' + payLoad.data.score}}</h1>\n\n                    <h2 ion-text [style.color]="payLoad.data.score >= 15 ? \'red\' : \'green\'">\n\n                        <ion-icon name="{{payLoad.data.score >= 15 ? \'alert\' : \'checkmark\'}}"></ion-icon> Hi, {{payLoad.data.event.params.message}}</h2>\n\n                    <span *ngIf="payLoad.data.recommendations && payLoad.data.recommendations.length">\n\n                        <ion-item-group>\n\n                            <ion-item-divider color="light"><strong>Recommendations:</strong></ion-item-divider>\n\n                            <ion-item *ngFor="let rec of payLoad.data.recommendations">\n\n                                    <ion-icon name="alert"></ion-icon> {{rec}}\n\n                            </ion-item>\n\n                        </ion-item-group>\n\n                    </span>\n\n                </ion-card-content>\n\n\n\n            </ion-card>\n\n        </div>\n\n\n\n\n\n        <!-- PRESENCE OF HEART DISEASE AI NEURAL NETWORK -->\n\n        <div *ngIf="payLoad && payLoad.data.prediction && !payLoad.data.usage && !payLoad.data.results" class="form-row">\n\n\n\n            <ion-card [style.backgroundColor]="payLoad.data.prediction[0] > 5 ? \'#ffdada\' : \'#e6ffe6\'">\n\n\n\n                <ion-card-header>\n\n                    <h1 ion-text>AI Predicted:</h1>\n\n                </ion-card-header>\n\n\n\n                <ion-card-content>\n\n                    <span *ngIf="payLoad.data.prediction && payLoad.data.prediction.length">\n\n                            <ion-item-group>\n\n                                <ion-item>\n\n                                    <p style="font-size:1.2em; text-align:center; justify-content:center; margin: 0 auto; color:rgb(19, 19, 38)"><strong>Presence of Heart Disease score from 0 to 10 where 0 means no presence and 10 means <br>absolute presence of some Heart Disease:</strong></p><br>\n\n                                </ion-item>\n\n                                <ion-item>\n\n                                    <p style="font-size:2em; text-align:center; justify-content:center; margin: 0 auto; color:rgb(19, 19, 38)"><strong>Score: {{payLoad.data.prediction[0].toFixed(2)}}</strong></p>\n\n                                <br>\n\n                                    <p style="font-size:1.4em; text-align:center; justify-content:center; margin: 0 auto;" [style.color]=\'payLoad.data.prediction[0] > 5 ? "red" : "green"\'>\n\n                                        <ion-icon name="{{payLoad.data.prediction[0] > 5 ? \'alert\' : \'checkmark\'}}"></ion-icon> Hi, {{payLoad.data.event?.params?.message}}\n\n                                    </p>\n\n                                </ion-item>\n\n                                <ion-item>\n\n                                    <strong>Accuracy:</strong>\n\n                                    {{payLoad.data.accuracy.toFixed(2)}}%\n\n                                </ion-item>\n\n                            </ion-item-group>\n\n                        </span>\n\n                </ion-card-content>\n\n\n\n            </ion-card>\n\n            <ion-card *ngIf="payLoad.data.prediction[0] > 5" [style.backgroundColor]="payLoad.data.prediction[0] > 5 ? \'#ffdada\' : \'#e6ffe6\'">\n\n\n\n                <ion-card-header>\n\n                    <h1>Suggestions for treatment:</h1>\n\n                </ion-card-header>\n\n\n\n                <ion-card-content>\n\n                    <span *ngIf="payLoad.data.prediction && payLoad.data.prediction.length">\n\n                            <ion-item-group>\n\n                                <ion-item>\n\n                                    <p><ion-icon name="alert"></ion-icon> <strong>Excess weight causes your heart to work harder and increases the risk for heart disease,<br> \n\n                                        high blood pressure, diabetes and high cholesterol. Exercising regularly and eating smaller \n\n                                        portions of nutrient-rich foods may help you maintain a healthy weight.<br> \n\n                                        Learn the warning signs of a heart attack and stroke.</strong></p>\n\n                                </ion-item>\n\n                                <ion-item>\n\n                                    <p><ion-icon name="alert"></ion-icon> <strong>Don’t smoke or expose yourself to second-hand smoke.</strong></p>\n\n                                </ion-item>\n\n                                <ion-item>\n\n                                    <p><ion-icon name="alert"></ion-icon> <strong>Maintain a healthy blood pressure.</strong></p>\n\n                                </ion-item>\n\n                                <ion-item>\n\n                                    <p><ion-icon name="alert"></ion-icon> <strong>Monitor your cholesterol (blood lipids).</strong></p>\n\n                                </ion-item>\n\n                                <ion-item>\n\n                                    <p><ion-icon name="alert"></ion-icon> <strong>Make exercise a daily habit.</strong></p>\n\n                                </ion-item>\n\n                                <ion-item>\n\n                                    <p><ion-icon name="alert"></ion-icon> <strong>Reduce stress.</strong></p>\n\n                                </ion-item>\n\n                            </ion-item-group>\n\n                        </span>\n\n                </ion-card-content>\n\n\n\n            </ion-card>\n\n        </div>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\home\formbuilder\form-template\formBuilder.html"*/,
        styles: ['./formBuilder.scss']
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__questions_question_control_service__["a" /* QuestionControlService */],
        __WEBPACK_IMPORTED_MODULE_1__questions_question_service__["a" /* QuestionService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_diagnostics_diagnostic_service__["a" /* DiagnosticsService */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_6__mappers_event_mapper_service__["a" /* QuestionEventMapper */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* ViewController */]])
], FormBuilderCustom);

//# sourceMappingURL=formBuilder.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webdnn__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webdnn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_webdnn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mappers_question_mapper_service__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_server_connection__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






const SERVER_URL = __WEBPACK_IMPORTED_MODULE_5__app_server_connection__["a" /* server */].url;
/**
 * Connect to REST API
 */
let QuestionService = class QuestionService {
    constructor(http, questionMapper) {
        this.http = http;
        this.questionMapper = questionMapper;
        Object(__WEBPACK_IMPORTED_MODULE_0_webdnn__["load"])('./../../assets/neural_network/output').then(runner => {
            console.log('loaded');
            console.log(runner.backendName);
            console.log(runner.inputs);
            console.log(runner.outputs);
        });
    }
    /**
     * Make a Questionnaire form of a certain type
     *
     * Types -> 'flu', 'hd', 'mh' and 'watson'
     * @param option The name of the Questionnaire
     * @return An Observable of a QuestionBody object
     */
    makeForm(option) {
        let fn;
        switch (option) {
            case 'flu': // Flu Diagnosis
                //build the form and load the questions
                fn = this.getFluQuestions();
                break;
            case 'hd': // Heart Disease Diagnosis
                fn = this.getHeartDiseaseQuestions();
                break;
            case 'mh': // Mental Health Depression Diagnosis
                fn = this.getMentalHealthQuestions();
                break;
            case 'watson': // Watson Discovery
                fn = this.getWatsonQuestions();
                break;
            default:
                break;
        }
        return fn;
    }
    /**
     * Get flu questionnaire metadata
     *
     * @return An Observable of QuestionBody object
     */
    getFluQuestions() {
        return this.http.get(SERVER_URL + '/questions/flu').map((res) => this.questionMapper.map(res));
    }
    /**
     * Get Heart Disease questionnaire metadata
     *
     * @return An Observable of QuestionBody object
     */
    getHeartDiseaseQuestions() {
        return this.http.get(SERVER_URL + '/questions/heartdisease').map((res) => this.questionMapper.map(res));
    }
    /**
     * Get Heart Disease questionnaire metadata
     *
     * @return An Observable of QuestionBody object
     */
    getMentalHealthQuestions() {
        return this.http.get(SERVER_URL + '/questions/mentalhealth').map((res) => this.questionMapper.map(res));
    }
    /**
     * Get Watson questionnaire metadata
     *
     * @return An Observable of QuestionBody object
     */
    getWatsonQuestions() {
        return this.http.get(SERVER_URL + '/questions/askwatson').map((res) => this.questionMapper.map(res));
    }
};
QuestionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__mappers_question_mapper_service__["a" /* QuestionMapper */]])
], QuestionService);

//# sourceMappingURL=question.service.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionMapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_home_formbuilder_questions_question_model__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_formbuilder_questions_question_dropdown_model__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_home_formbuilder_questions_question_toggle_model__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_formbuilder_questions_question_textbox_model__ = __webpack_require__(530);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let QuestionMapper = class QuestionMapper {
    constructor() { }
    /**
     * Question Mapper
     * @param res response from http request
     */
    map(res) {
        let response = res.json();
        let questions = [];
        let q = response.questions;
        let addInfo = response.additional_information || { title: "" };
        //traverse fields
        for (var i = 0; i < q.length; i++) {
            const field = q[i];
            const controlType = q[i].controlType || "";
            //create specific question type
            let question = this.mapToQuestion(controlType, field);
            questions.push(question);
        }
        //return the components in the right order
        return {
            questions: questions.sort((a, b) => a.order - b.order),
            additional_information: addInfo
        };
    }
    /**
     * Create a Question object of some type
     *
     * Types -> 'textbox', 'textarea', 'dropdown' and 'toggle'
     * @param controlType Type of question
     * @param question <Question> Object with meta information about the question
     * @return Question Object of some type
     */
    mapToQuestion(controlType, question) {
        let cQuestion = null;
        switch (controlType) {
            case 'textbox':
                let textBox = new __WEBPACK_IMPORTED_MODULE_4__pages_home_formbuilder_questions_question_textbox_model__["a" /* TextboxQuestion */](question);
                cQuestion = textBox;
                break;
            case 'textarea':
                let textArea = new __WEBPACK_IMPORTED_MODULE_4__pages_home_formbuilder_questions_question_textbox_model__["a" /* TextboxQuestion */](question);
                cQuestion = textArea;
                break;
            case 'dropdown':
                let dropdownField = new __WEBPACK_IMPORTED_MODULE_2__pages_home_formbuilder_questions_question_dropdown_model__["a" /* DropdownQuestion */](question);
                cQuestion = dropdownField;
                break;
            case 'toggle':
                let toggle = new __WEBPACK_IMPORTED_MODULE_3__pages_home_formbuilder_questions_question_toggle_model__["a" /* ToggleQuestion */](question);
                cQuestion = toggle;
                break;
            default:
                cQuestion = new __WEBPACK_IMPORTED_MODULE_1__pages_home_formbuilder_questions_question_model__["a" /* Question */](question);
                break;
        }
        return cQuestion;
    }
};
QuestionMapper = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], QuestionMapper);

//# sourceMappingURL=question-mapper.service.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionControlService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Convert metadata to FormGroup object
 */
let QuestionControlService = class QuestionControlService {
    constructor() { }
    /**
     * Transform an Array of Questions into a FormGroup
     * @param questions Array of Questions
     * @return A FormGroup
     */
    toFormGroup(questions) {
        let group = {};
        questions.forEach(question => {
            group[question.key] = this.toFormControl(question);
        });
        return new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */](group);
    }
    /**
     * Transform one Question into a FormControl
     * @param question Question object
     * @return A FormControl
     */
    toFormControl(question) {
        return question.required ? new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */](question.value || '', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required) : new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */](question.value || '');
    }
};
QuestionControlService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], QuestionControlService);

//# sourceMappingURL=question-control.service.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiagnosticsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_server_connection__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



const SERVER_URL = __WEBPACK_IMPORTED_MODULE_2__app_server_connection__["a" /* server */].url;
let DiagnosticsService = class DiagnosticsService {
    constructor(http) {
        this.http = http;
    }
    getDiagnostic(input) {
        // HEART DISEASE
        if (input.chol) {
            return this.http.post(SERVER_URL + '/questions/heartdisease/diagnostic', input).map((res) => res.json());
        }
        // WATSON DISCOVERY
        if (input.text) {
            return this.http.post(SERVER_URL + '/questions/discoverwatson', input).map((res) => res.json());
        }
        // MENTAL HEALTH
        if (input.question1) {
            return this.http.post(SERVER_URL + '/questions/mentalhealth/diagnostic', input).map((res) => res.json());
        }
        // FLU 
        return this.http.post(SERVER_URL + '/questions/flu/diagnostic', input).map((res) => res.json());
    }
};
DiagnosticsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], DiagnosticsService);

//# sourceMappingURL=diagnostic.service.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionEventMapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// errors
const ERROR_NO_PARAMETER = "Event parameter or type is missing";
const ERROR_NO_MATCH_ACTION = "This action does not match any possible action";
var Events;
(function (Events) {
    Events["Visibility"] = "visibility";
})(Events || (Events = {}));
var Actions;
(function (Actions) {
    Actions["Visible"] = "visible";
    Actions["Hidden"] = "hidden";
})(Actions || (Actions = {}));
let QuestionEventMapper = class QuestionEventMapper {
    constructor() { }
    /**
     * Apply events to questions
     * @param options <ActionOptions> Action options with meta information about the event, the action and the target
     */
    applyAction(options) {
        if (!options.event)
            throw ERROR_NO_PARAMETER;
        let event = options.event;
        let question = options.target;
        // Visibility Event
        if (options.event == Events.Visibility) {
            if (question[event] == Actions.Hidden) {
                question[event] = Actions.Visible;
            }
            else if (question[event] == Actions.Visible) {
                question[event] = Actions.Hidden;
            }
            else {
                throw ERROR_NO_MATCH_ACTION;
            }
        }
        //TODO other events
        return question;
    }
};
QuestionEventMapper = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], QuestionEventMapper);

//# sourceMappingURL=event-mapper.service.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PictureAnalisysPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_camera_camera_provider__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_cognitive_services_cognitive_service__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





/**
 * Generated class for the PictureAnalisysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let PictureAnalisysPage = class PictureAnalisysPage {
    constructor(navCtrl, navParams, cameraProvider, cognitiveService, loadingCtrl, nativeStorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cameraProvider = cameraProvider;
        this.cognitiveService = cognitiveService;
        this.loadingCtrl = loadingCtrl;
        this.nativeStorage = nativeStorage;
        this.isMute = false;
        this.loading = 'Loading';
        this.picture = false;
        this.imageDescription = '';
        this.isSpeak = false;
        this.error = false;
    }
    ionViewCanEnter() {
        // this.nativeStorage.getItem('isMute').then(data => this.isMute = data);
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad PictureAnalisysPage');
        return this.takePicture();
    }
    takePicture() {
        return __awaiter(this, void 0, void 0, function* () {
            const loading = this.loadingCtrl.create({
                content: `${this.loading} ...`
            });
            let descriptionAnalyzedImage;
            loading.present();
            this.isSpeak = false;
            this.imageDescription = '';
            try {
                let picture = yield this.cameraProvider.getPictureFromCamera();
                if (picture) {
                    this.setPicture(picture); // picture is the temporary path
                    this.cognitiveService.analyzeImage(picture).subscribe((data) => {
                        loading.dismiss();
                        descriptionAnalyzedImage = data.description.captions[0].text;
                        this.imageDescription = descriptionAnalyzedImage;
                    }, (error) => {
                        loading.dismiss();
                        this.error = `Error: ${JSON.stringify(error)}`;
                    });
                }
            }
            catch (error) {
                loading.dismiss();
                this.error = `Error: ${JSON.stringify(error)}`;
                console.error(this.error);
            }
        });
    }
    getBase64(file, cb) {
        const self = this;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            self.error = `${JSON.stringify(error)}`;
        };
    }
    setPicture(picture) {
        this.picture = "data:image/jpeg;base64," + picture;
    }
};
PictureAnalisysPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-picture-analisys',template:/*ion-inline-start:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\picture-analisys\picture-analisys.html"*/'<!--\n  Generated template for the PictureAnalisysPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>pictureAnalisys</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img *ngIf="picture" [src]="picture" />\n    <div class="container-description" (click)="takePicture()">\n        <!-- Image description -->\n        <p class="image-description">{{imageDescription}}</p>\n        <p *ngIf="error" class="error">{{error}}</p>\n    </div>\n</ion-content>'/*ion-inline-end:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\picture-analisys\picture-analisys.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_camera_camera_provider__["a" /* CameraProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers_cognitive_services_cognitive_service__["a" /* CognitiveService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */]])
], PictureAnalisysPage);

//# sourceMappingURL=picture-analisys.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let CameraProvider = class CameraProvider {
    constructor(camera) {
        this.camera = camera;
    }
    getPictureFromCamera() {
        return this.getImage(this.camera.PictureSourceType.CAMERA);
    }
    getImage(pictureSourceType, quality = 50, saveToPhotoAlbum = false) {
        const options = {
            quality,
            saveToPhotoAlbum,
            sourceType: pictureSourceType,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG
        };
        return this.camera.getPicture(options);
    }
};
CameraProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */]])
], CameraProvider);

//# sourceMappingURL=camera.provider.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WavRecorder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__recorder__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5____ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(33);
// Copyright (c) 2017 Tracktunes Inc
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// make this a multiple of PROCESSING_BUFFER_LENGTH (from record.ts)
// export const WAV_CHUNK_LENGTH: number = 4096;
// export const WAV_CHUNK_LENGTH: number = 262144;
const WAV_CHUNK_LENGTH = 131072;
/* unused harmony export WAV_CHUNK_LENGTH */

// pre-allocate the double chunk buffers used for saving to DB
const WAV_CHUNK1 = new Int16Array(WAV_CHUNK_LENGTH);
const WAV_CHUNK2 = new Int16Array(WAV_CHUNK_LENGTH);
/**
 * Audio Record functions based on WebAudio.
 * @class WebAudioRecorder
 */
let WavRecorder = class WavRecorder extends __WEBPACK_IMPORTED_MODULE_4__recorder__["a" /* WebAudioRecorder */] {
    // this is how we signal
    constructor(audioContextGenerator, platform) {
        super(audioContextGenerator, platform);
        this.audioContextGenerator = audioContextGenerator;
        this.platform = platform;
        // Observable string sources
        this.emitChangeSource = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
        // Observable string streams
        this.listenBlobs = this.emitChangeSource.asObservable();
        console.log('constructor()');
        this.filePath = null;
        this.setter = new __WEBPACK_IMPORTED_MODULE_3__models__["a" /* DoubleBufferSetter */](WAV_CHUNK1, WAV_CHUNK2, () => {
            // THIS CALLBACK IS CALLED MULTIPLE TIMES WHILE THE AUDIO IS BEING RECORDED
            // TODO remove saveWavFileChunk from this callback and maybe replace for a debugging log to see activeBuffer change
            this.saveWav(this.setter.activeBuffer).subscribe(null, (err) => {
                // alert('Error in RecordWav.setter(): ' + err);
                console.error('Error in RecordWav.setter(): ' + err);
            });
            // console.log('Recording: ' + this.setter.bufferIndex);
        });
        this.nChunksSaved = 0;
    }
    /**
     * Precondition: Pcm is clipped (?)
     * valueCB receives the inputBuffer value clipped (-1, 1) from onAudioProcess
     * and setter.setNext calls saveWavFileChunk through swap() method
     */
    valueCB(pcm) {
        this.setter.setNext(pcm < 0 ? pcm * 0x8000 : pcm * 0x7fff);
    }
    /**
     *
     */
    getFilePath() {
        return this.filePath;
    }
    /**
     *
     */
    unloadRecordedFile() {
        this.filePath = null;
    }
    // Service message commands
    emit(blob) {
        this.emitChangeSource.next(blob);
    }
    /**
     * Save the next wav file chunk
     * TODO change this method in a way i don't save chunks, but the whole file in the end of recording from buffer data
     * @return {Observable<void>}
     */
    saveWav(arr) {
        console.log('saveWav(arr.size=' + arr.length + ', nSamples: ' + this.nRecordedSamples + ')');
        let src = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create((observer) => {
            if (this.nChunksSaved == 0) {
                __WEBPACK_IMPORTED_MODULE_3__models__["b" /* WavFile */].createWavFile(this.filePath, arr, this.audioContext).subscribe((blob) => {
                    this.nChunksSaved = 1;
                    this.emit(blob);
                    observer.next(blob);
                    observer.complete();
                }, (err1) => {
                    observer.error(err1);
                });
            }
            else {
                __WEBPACK_IMPORTED_MODULE_3__models__["b" /* WavFile */].appendToWavFile(arr, this.nRecordedSamples - arr.length).subscribe((blob) => {
                    this.nChunksSaved++;
                    // emit blob every 100 chunks
                    // if(this.nChunksSaved % 2 == 0) {
                    // }
                    this.emit(blob);
                    observer.next(blob);
                    observer.complete();
                }, (err1) => {
                    observer.error(err1);
                });
            }
        });
        return src;
    }
    /**
     * Start recording
     */
    start() {
        return new Promise((resolve, reject) => {
            super.start().then(() => {
                const dateCreated = Date.now();
                const displayDateCreated = Object(__WEBPACK_IMPORTED_MODULE_3__models__["d" /* formatUnixTimestamp */])(dateCreated);
                const filePath = '/' + displayDateCreated;
                this.filePath = filePath;
                resolve();
            }, (error) => {
                console.log('ERROR AT -> WAV-RECORDER START()');
                reject();
            });
        });
    }
    /**
     * Stop recording and save the last chunk.
     * Precondition: called start() already
     * // TODO save file from activeBuffer data, no need to keep saving file chunks with cordova file plugin and appending
     *
     * @return {Observable<void>}
     */
    stop() {
        console.log('WavRecorder:stop() @ ' + this.setter.bufferIndex + ', len: ' + this.setter.activeBuffer.subarray(0, this.setter.bufferIndex).length);
        this.reset();
        let src = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create((observer) => {
            this.saveWav(this.setter.activeBuffer.subarray(0, this.setter.bufferIndex)).subscribe((formDataFile) => {
                console.log("WavFile:saveWav() @ Saved");
                console.log('form data ' + JSON.stringify(formDataFile));
                this.nChunksSaved = 0;
                this.setter.reset();
                //downloadBlob(formDataFile, "somewav.wav");
                if (this.audioContext.close) {
                    this.audioContext.close().then(() => {
                        console.log('AUDIO CONTEXT CLOSED');
                    });
                }
                else if (this.audioContext.state == "running") {
                    this.audioContext.suspend().then(() => {
                        console.log('AUDIO CONTEXT SUSPENDED');
                    });
                }
                __WEBPACK_IMPORTED_MODULE_3__models__["b" /* WavFile */].clearBlob();
                // observer.next(formDataFile);
                observer.next();
                observer.complete();
            }, (err) => {
                observer.error(err);
            });
        });
        return src;
    }
};
WavRecorder = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5____["a" /* AudioContextGenerator */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["h" /* Platform */]])
], WavRecorder);

//# sourceMappingURL=wav-recorder.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wav_file_wav_file__ = __webpack_require__(836);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__wav_file_wav_file__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__double_buffer_double_buffer__ = __webpack_require__(837);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__double_buffer_double_buffer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filesystem_filesystem__ = __webpack_require__(838);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__misc_utils_misc_utils__ = __webpack_require__(839);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__misc_utils_misc_utils__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__misc_utils_misc_utils__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__misc_utils_misc_utils__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__misc_utils_misc_utils__["d"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RecordStatus */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebAudioRecorder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2____ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/** @const {string} Heartbeat clock's ID of function to run periodically */
const RECORDER_CLOCK_FUNCTION_NAME = 'recorder';
/**
 * @const {string} Length of script processing buffer - (a) this must be a
 * power of 2; (b) the smaller this is, the more accurately we track time.
 */
// const PROCESSING_BUFFER_LENGTH: number = 19456;
// const PROCESSING_BUFFER_LENGTH: number = 16384;
const PROCESSING_BUFFER_LENGTH = 8192;
// const PROCESSING_BUFFER_LENGTH: number = 1024;
/** @const {number}  Waiting time between checks that WAA is initialized */
const WAIT_MSEC = 50;
// statuses
var RecordStatus;
(function (RecordStatus) {
    // uninitialized means we have not been initialized yet
    RecordStatus[RecordStatus["UNINITIALIZED_STATE"] = 0] = "UNINITIALIZED_STATE";
    // error occured - no indexedDB available
    RecordStatus[RecordStatus["NO_DB_ERROR"] = 1] = "NO_DB_ERROR";
    // error occured - no AudioContext
    RecordStatus[RecordStatus["NO_CONTEXT_ERROR"] = 2] = "NO_CONTEXT_ERROR";
    // error occured - no microphone
    RecordStatus[RecordStatus["NO_MICROPHONE_ERROR"] = 3] = "NO_MICROPHONE_ERROR";
    // error occured - no getUserMedia()
    RecordStatus[RecordStatus["NO_GETUSERMEDIA_ERROR"] = 4] = "NO_GETUSERMEDIA_ERROR";
    // error occured - getUserMedia() has crashed
    RecordStatus[RecordStatus["GETUSERMEDIA_ERROR"] = 5] = "GETUSERMEDIA_ERROR";
    // normal operation
    RecordStatus[RecordStatus["READY_STATE"] = 6] = "READY_STATE";
})(RecordStatus || (RecordStatus = {}));
function _normalizeAudio(pcmData) {
    for (var i = 0; i < pcmData.length; i++) {
        pcmData[i] = parseFloat(pcmData[i]) / 32767.0;
    }
    // If last value is NaN, remove it.
    if (isNaN(pcmData[pcmData.length - 1])) {
        pcmData.pop();
    }
    return pcmData;
}
/**
 * Audio recording functions using Web Audio API
 * @class WebAudioRecorder
 */
let WebAudioRecorder = class WebAudioRecorder {
    // this is how we signal
    constructor(audioContextGenerator, platform) {
        this.audioContextGenerator = audioContextGenerator;
        this.platform = platform;
        console.log('constructor()');
        const self = this;
        this.nClipped = 0;
        this.status = RecordStatus.UNINITIALIZED_STATE;
        this.isMobileAudioInput = false;
        window.addEventListener('audioinput', (event) => {
            self.onAudioProcess(event);
        }, false);
    }
    /**
     * Wait indefinitely until DB is ready for use, via an observable.
     * @returns Observable<void> - Observable that emits when ready for use.
     */
    waitForWAA() {
        // NOTE:this loop should only repeat a handful of times or so
        let source = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create((observer) => {
            const repeat = () => {
                console.log('waitForWAA:repeat()');
                if (this.status !== RecordStatus.UNINITIALIZED_STATE) {
                    observer.next();
                    observer.complete();
                }
                else {
                    setTimeout(repeat, WAIT_MSEC);
                }
            };
            repeat();
        });
        return source;
    }
    /**
     * Initialize audio, get it ready to record
     * @returns void
     */
    initAudio() {
        console.log('initAudio(): SAMPLE RATE: ' + this.sampleRate);
        var self = this;
        const getUserMediaOptions = {
            video: false,
            audio: true
        };
        if (this.platform.is('ios') || this.platform.is('android') || this.platform.is('cordova')) {
            if (this._hasAudioInput()) {
                console.log('Using audioinput');
                this.isMobileAudioInput = true;
                try {
                    let captureCfg = {
                        sampleRate: 16000,
                        bufferSize: PROCESSING_BUFFER_LENGTH,
                        channels: 1,
                        format: audioinput.FORMAT.PCM_16BIT,
                        audioSourceType: audioinput.AUDIOSOURCE_TYPE.DEFAULT
                    };
                    audioinput.initialize(captureCfg, () => {
                        audioinput.checkMicrophonePermission((hasPermission) => {
                            if (hasPermission) {
                                console.warn('Already have permission to record');
                                // startRecording
                                this.connectNodes();
                            }
                            else {
                                console.warn('No permission to record yet');
                                console.warn('Asking...');
                                audioinput.getMicrophonePermission((hasPermission, message) => {
                                    if (hasPermission) {
                                        console.warn('User granted permission to record');
                                        this.connectNodes();
                                    }
                                    else {
                                        console.warn('User denied permission to record');
                                        this.status = RecordStatus.GETUSERMEDIA_ERROR;
                                    }
                                });
                            }
                        });
                    });
                }
                catch (err) {
                    this.status = RecordStatus.GETUSERMEDIA_ERROR;
                    const msg = 'initAudio(old2): err: ' +
                        err + ', code: ' + err.code;
                    // alert(msg);
                    console.log(msg);
                }
            }
        }
        else {
            this.isMobileAudioInput = false;
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // We're in mozilla but not yet in chrome
                // new getUserMedia is available, use it to get microphone stream
                // console.log('Using NEW navigator.mediaDevices.getUserMedia');
                navigator.mediaDevices.getUserMedia(getUserMediaOptions)
                    .then((stream) => {
                    this.connectNodes(stream);
                })
                    .catch((err) => {
                    this.status = RecordStatus.NO_MICROPHONE_ERROR;
                    const msg = 'initAudio(new): err: ' + err + ', code: ' + err.code;
                    console.log(msg);
                });
            }
            else {
                // This is what is called if we're in chrome / chromium
                // console.log('Using OLD navigator.getUserMedia (new not there)');
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia;
                if (navigator.getUserMedia) {
                    // old getUserMedia is available, use it
                    try {
                        navigator.getUserMedia(getUserMediaOptions, (stream) => {
                            this.connectNodes(stream);
                        }, (err) => {
                            this.status = RecordStatus.NO_MICROPHONE_ERROR;
                            const msg = 'initAudio(old1): err: ' + err + ', code: ' + err.code;
                            console.log(msg);
                        });
                    }
                    catch (err) {
                        this.status = RecordStatus.GETUSERMEDIA_ERROR;
                        const msg = 'initAudio(old2): err: ' + err + ', code: ' + err.code;
                        console.log(msg);
                    }
                }
                else {
                    // neither old nor new getUserMedia are available
                    console.warn('initAudio() Error: no getUserMedia');
                    this.status = RecordStatus.NO_GETUSERMEDIA_ERROR;
                }
            }
        }
    }
    /**
     * @param {AudioProcessingEvent}
     * @returns void
     */
    onAudioProcess(processingEvent) {
        // console.log('onAudioProcess() ' + this.isRecording);
        if (this.isMobileAudioInput) {
            // DO MOBILE STUFF
            // console.log('mobile onAudioProcess() -> ' + (<any>processingEvent).data.length); // DEBUG ONLY
            if (processingEvent && processingEvent.data) {
                let inputData = processingEvent.data;
                let i;
                let value;
                let absValue;
                this.currentVolume = 0;
                let audioBuffer = this.audioContext.createBuffer(1, (inputData.length / 1), this.audioContext.sampleRate);
                //let buffer = _normalizeAudio(inputData);
                let buffer = [];
                for (i = 0; i < PROCESSING_BUFFER_LENGTH; i++) {
                    value = inputData[i];
                    //   const clippedValue: number = value / 32767.0;
                    const clippedValue = Math.max(-1.0, Math.min(1.0, value));
                    if (value !== clippedValue) {
                        this.nClipped++;
                    }
                    if (this.isRecording) {
                        buffer.push(clippedValue);
                        this.valueCB(clippedValue);
                        this.nRecordedSamples++;
                    }
                }
                // Listen to myself for debugging purposes
                if (this.isRecording) {
                    audioBuffer.getChannelData(0).set(buffer);
                    let source = this.audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(this.audioContext.destination);
                    source.start(1);
                }
            }
            return;
        }
        // console.log('browser onAudioProcess() ->', processingEvent);
        let inputBuffer = processingEvent.inputBuffer;
        let outputBuffer = processingEvent.outputBuffer;
        let inputData = inputBuffer.getChannelData(0);
        let outputData = outputBuffer.getChannelData(0);
        let i;
        let value;
        let absValue;
        // put the maximum of current buffer into this.currentVolume
        this.currentVolume = 0;
        for (i = 0; i < PROCESSING_BUFFER_LENGTH; i++) {
            // value is the float value of the current PCM sample
            // it is expected to be in [-1, 1] but goes beyond that
            // sometimes
            value = inputData[i];
            const clippedValue = Math.max(-1.0, Math.min(1.0, value));
            if (value !== clippedValue) {
                this.nClipped++;
            }
            // absValue is what we use to monitor volume = abs(value)
            absValue = Math.abs(clippedValue);
            // keep track of volume using abs value
            if (absValue > this.currentVolume) {
                this.currentVolume = absValue;
            }
            // fill up double-buffer active buffer if recording (and
            // save every time a fill-up occurs)
            // if (this.valueCB && this.isRecording) {
            if (this.isRecording) {
                // outputData[i] = clippedValue;
                this.valueCB(clippedValue);
                this.nRecordedSamples++;
            }
        }
    }
    /**
     * Create audioGainNode & scriptProcessorNode
     * @returns void
     */
    createNodes() {
        console.log('createNodes()');
        this.audioContext = this.audioContextGenerator.createAudioContext();
        if (this.audioContext) {
            this.audioContextGenerator.setAudioContext(this.audioContext);
            this.sampleRate = this.audioContext.sampleRate;
            // create the gainNode
            this.audioGainNode = this.audioContext.createGain();
            // create and configure the scriptProcessorNode
            this.scriptProcessorNode = this.audioContext.createScriptProcessor(PROCESSING_BUFFER_LENGTH, 1, 1);
            this.scriptProcessorNode.onaudioprocess = (processingEvent) => {
                this.onAudioProcess(processingEvent);
            };
        }
    }
    /**
     * Create the following nodes:
     * this.sourceNode (createMediaStreamSourceNode)
     * |--> this.gainNode (createGain)
     *      |--> this.scriptProcessorNode (createScriptProcessor)
     *           |--> MediaStreamAudioDestinationNode
     * @param {MediaStream} stream the stream obtained by getUserMedia
     * @returns void
     */
    connectNodes(stream) {
        console.log('connectNodes()');
        const self = this;
        if (this.isMobileAudioInput) {
            audioinput.start({ bufferSize: PROCESSING_BUFFER_LENGTH, streamToWebAudio: false });
            audioinput.connect(this.audioContext.destination);
            // call the reset() function to normalize state
            this.reset();
            // now, after nodes are connected, we can tell the world we're ready
            this.status = RecordStatus.READY_STATE;
            return;
        }
        // TODO: a check here that this.mediaStream is valid
        // create a source node out of the audio media stream
        // (the other nodes, which do not require a stream for their
        // initialization, are created in this.createNodes())
        this.sourceNode = this.audioContext.createMediaStreamSource(stream);
        // sourceNode (microphone) -> gainNode
        this.sourceNode.connect(this.audioGainNode);
        // gainNode -> scriptProcessorNode
        this.audioGainNode.connect(this.scriptProcessorNode);
        // scriptProcessorNode -> destination
        this.scriptProcessorNode.connect(this.audioContext.destination);
        // call the reset() function to normalize state
        this.reset();
        // now, after nodes are connected, we can tell the world we're ready
        this.status = RecordStatus.READY_STATE;
    }
    ///////////////////////////////////////////////////////////////////////////
    // PUBLIC API METHODS
    ///////////////////////////////////////////////////////////////////////////
    /**
     * Ensures change detection every GRAPHICS_REFRESH_INTERVAL
     * @returns void
     */
    startMonitoring() {
        console.log('startMonitoring()');
    }
    /**
     * Stops monitoring (stops change detection)
     * @returns void
     */
    stopMonitoring() {
        console.log('stopMonitoring()');
    }
    /**
     * Reset all peak stats as if we've just started playing audio at
     * time 0. Call this when you want to compute stats from now.
     * @returns void
     */
    resetPeaks() {
        this.maxVolumeSinceReset = 0;
        // at first we're always at 100% peax at max
        this.percentPeaksAtMax = '100.0';
        // make this 1 to avoid NaN when we divide by it
        this.nPeakMeasurements = 1;
        // make this 1 to match nPeakMeasurements and get 100% at start
        this.nPeaksAtMax = 1;
        // we start from zero again
        this.nClipped = 0;
    }
    /**
     * Set the multiplier on input volume (gain) effectively changing volume
     * @param {number} factor fraction of volume, where 1.0 is no change
     * @returns void
     */
    setGainFactor(factor) {
        if (this.status === RecordStatus.READY_STATE) {
            this.audioGainNode.gain.value = factor;
        }
        this.resetPeaks();
    }
    /**
     * Start recording
     * @returns void
     */
    start() {
        return new Promise((resolve, reject) => {
            // create nodes that do not require a stream in their constructor
            this.createNodes();
            // this call to resetPeaks() also initializes private variables
            this.resetPeaks();
            // grab microphone, init nodes that rely on stream, connect nodes
            this.initAudio();
            this.waitForWAA().subscribe(() => {
                // reset peaks again when WAA is ready
                this.resetPeaks();
                this.nRecordedSamples = 0;
                this.isRecording = true;
                this.isInactive = false;
                resolve();
            }, (error) => {
                console.log('ERROR AT -> RECORDER START()');
                reject();
            });
        });
    }
    /**
     * Pause recording
     * @returns void
     */
    pause() {
        this.isRecording = false;
    }
    /**
     * Resume recording
     * @returns void
     */
    resume() {
        this.isRecording = true;
    }
    /**
     * Stop recording, reset all for next recording.
     * @returns void
     */
    reset() {
        const self = this;
        this.isRecording = false;
        this.isInactive = true;
        if (this._hasAudioInput() && this.isMobileAudioInput && this.status == RecordStatus.READY_STATE) {
            audioinput.stop(() => {
                self.isMobileAudioInput = false;
            });
            audioinput.disconnect();
        }
        this.status = RecordStatus.UNINITIALIZED_STATE;
    }
    /**
     * Returns recording time, in seconds.
     * @returns number
     */
    getTime() {
        return this.isInactive ? 0 : this.nRecordedSamples / this.sampleRate;
    }
    _hasAudioInput() {
        return typeof audioinput !== "undefined";
    }
};
WebAudioRecorder = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2____["a" /* AudioContextGenerator */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* Platform */]])
], WebAudioRecorder);

//# sourceMappingURL=recorder.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_web_animations_js_web_animations_min__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_web_animations_js_web_animations_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_web_animations_js_web_animations_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(438);



Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webdnn__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webdnn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_webdnn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_about_about__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_chat_watson_chat__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_picture_analisys_picture_analisys__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_formbuilder_form_template_formBuilder__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_formbuilder_questions_template_dynamic_form_question_component__ = __webpack_require__(841);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_formbuilder_questions_question_control_service__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_home_formbuilder_questions_question_service__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__mappers_question_mapper_service__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__mappers_event_mapper_service__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_animations__ = __webpack_require__(842);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_tabs_tabs__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_splash_screen__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ng_socket_io__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_file_transfer__ = __webpack_require__(844);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_text_to_speech__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_native_storage__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__app_service__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_speech_recognition__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers__ = __webpack_require__(183);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
const config = { url: 'https://imsdiag.herokuapp.com', options: {} };
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_chat_watson_chat__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_formbuilder_form_template_formBuilder__["a" /* FormBuilderCustom */],
            __WEBPACK_IMPORTED_MODULE_11__pages_picture_analisys_picture_analisys__["a" /* PictureAnalisysPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_home_formbuilder_questions_template_dynamic_form_question_component__["a" /* DynamicFormQuestionComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_22_ng_socket_io__["SocketIoModule"].forRoot(config)
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_chat_watson_chat__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_formbuilder_form_template_formBuilder__["a" /* FormBuilderCustom */],
            __WEBPACK_IMPORTED_MODULE_11__pages_picture_analisys_picture_analisys__["a" /* PictureAnalisysPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_home_formbuilder_questions_template_dynamic_form_question_component__["a" /* DynamicFormQuestionComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_21__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_file_transfer__["b" /* FileTransferObject */],
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_text_to_speech__["a" /* TextToSpeech */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_14__pages_home_formbuilder_questions_question_control_service__["a" /* QuestionControlService */],
            __WEBPACK_IMPORTED_MODULE_15__pages_home_formbuilder_questions_question_service__["a" /* QuestionService */],
            __WEBPACK_IMPORTED_MODULE_16__mappers_question_mapper_service__["a" /* QuestionMapper */],
            __WEBPACK_IMPORTED_MODULE_17__mappers_event_mapper_service__["a" /* QuestionEventMapper */],
            __WEBPACK_IMPORTED_MODULE_29__providers__["d" /* DiagnosticsService */],
            __WEBPACK_IMPORTED_MODULE_29__providers__["c" /* CognitiveService */],
            __WEBPACK_IMPORTED_MODULE_29__providers__["b" /* CameraProvider */],
            __WEBPACK_IMPORTED_MODULE_27__app_service__["a" /* AppService */],
            __WEBPACK_IMPORTED_MODULE_29__providers__["e" /* WavRecorder */],
            __WEBPACK_IMPORTED_MODULE_29__providers__["a" /* AudioContextGenerator */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_cognitive_services_cognitive_service__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_service__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_web_audio_wav_recorder__ = __webpack_require__(337);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let MyApp = class MyApp {
    constructor(platform, statusBar, splashScreen, cognitiveService, appService, loadingCtrl, recorder) {
        this.cognitiveService = cognitiveService;
        this.appService = appService;
        this.loadingCtrl = loadingCtrl;
        this.recorder = recorder;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        // recorder.waitForWAA().subscribe(()=>{
        //   recorder.resetPeaks();
        // });
        this.zone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]({ enableLongStackTrace: false });
        this.isMobile = true;
    }
    ngOnInit() {
        this.messageSubscription = this.cognitiveService.listenMessage.subscribe((message) => {
            if (message.RecognitionStatus == 'Success') {
                this.zone.run(() => {
                    if (message.DisplayText.length > this.spokenMessage.length) {
                        this.spokenMessage = message.DisplayText;
                    }
                    console.log(`Spoken -----------> ${this.spokenMessage}`);
                    const lowerMsg = this.spokenMessage.toLowerCase();
                    if (lowerMsg.indexOf('go to') != -1 && lowerMsg.indexOf('heart disease') != -1) {
                        // this.goToForm('hd');
                        this.appService.emitMessage('hd');
                        if (!this.isMobile) {
                            this.stop(false); // Dont need to stop here when using DEVICE AUDIOINPUT, only need with native SpeechRecognition
                        }
                    }
                    if (lowerMsg.indexOf('go to') != -1 && lowerMsg.indexOf('flu') != -1) {
                        this.appService.emitMessage('flu');
                        if (!this.isMobile) {
                            this.stop(false);
                        }
                    }
                });
            }
            if (typeof message == 'string') {
                this.debug = '';
                this.debug += message;
            }
        });
    }
    // ********************************************
    //                MOBILE
    // ********************************************
    speakStop() {
        const self = this;
        this.debug = '';
        if (!this.speaking) {
            this.speaking = true;
            this.spokenMessage = '';
            const loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                content: `
            <div class="custom-spinner-container">
                <div class="custom-spinner-box">
                    Analyzing, please wait...
                </div>
            </div>`,
                duration: 100000
            });
            loading.present();
            this.recorder.start().then(() => {
                // READY
                this.debug += 'READY TO SPEAK';
                console.log('READY TO SPEAK');
                loading.dismiss();
                this.recorder.listenBlobs.subscribe((blob) => {
                    console.log('Listening to BLOBS...');
                    self.cognitiveService.analyseSound(blob).subscribe((data) => {
                        console.log('**************** analyseSound() @ SUCCESS *****************');
                        self.debug = '';
                        self.debug += blob.size + ' -> ';
                        self.debug += 'Success!!';
                        console.log(`DATA  ${JSON.stringify(data)}`);
                        self.cognitiveService.emitMessage(data);
                        //subs.unsubscribe();
                    }, (error) => {
                        self.debug = '';
                        self.debug += `An Error ocurred: ${JSON.stringify(error)}`;
                        console.log(error);
                    });
                });
            });
        }
        else {
            this.stop(false);
        }
    }
    stop(erase) {
        const self = this;
        this.spokenMessage = erase ? '' : this.spokenMessage;
        this.speaking = false;
        this.debug = '';
        let subs = this.recorder.stop().subscribe((file) => {
            console.log('FINAL FILE SIZE ->', file.size);
            self.debug += 'Stoped! File created';
            // TODO send to Azure Bing Speech API by POST
            self.debug = '';
        }, (err) => {
            console.log(`ERROR -> , ${JSON.stringify(err)}`);
        });
    }
};
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\app\app.html"*/'<ion-nav [root]="rootPage">\n\n</ion-nav>\n\n<div class="speakerContainer">\n\n    <h4 id="debug">DEBUG LOG: {{debug}}</h4>\n\n    <h4 id="answer">Output: {{spokenMessage}}</h4>\n\n    <button (click)="speakStop()" [ngClass]="{\'active\': speaking}" class="floating" color="calm">\n\n        <ion-icon name="mic"></ion-icon>\n\n    </button>\n\n</div>\n\n'/*ion-inline-end:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_5__providers_cognitive_services_cognitive_service__["a" /* CognitiveService */],
        __WEBPACK_IMPORTED_MODULE_6__app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_7__providers_web_audio_wav_recorder__["a" /* WavRecorder */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 523:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ChatUser {
    constructor(name) {
        this.name = name;
        this.messages = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChatUser;

//# sourceMappingURL=ChatUser.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ChatRoom {
    constructor() {
        this.users = {};
        this.messages = [];
    }
    addUser(user) {
        this.users[user.name] = user;
    }
    addMessage(userName, message) {
        this.users[userName].messages.push(message);
        this.messages.push({ user: userName, message: message });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChatRoom;

//# sourceMappingURL=ChatRoom.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__question_model__ = __webpack_require__(63);

class DropdownQuestion extends __WEBPACK_IMPORTED_MODULE_0__question_model__["a" /* Question */] {
    constructor(question) {
        super(question);
        this.controlType = 'dropdown';
        this.options = [];
        this.options = question['options'] || [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DropdownQuestion;

//# sourceMappingURL=question-dropdown.model.js.map

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__question_model__ = __webpack_require__(63);

class ToggleQuestion extends __WEBPACK_IMPORTED_MODULE_0__question_model__["a" /* Question */] {
    constructor(options) {
        super(options);
        this.controlType = 'toggle';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ToggleQuestion;

//# sourceMappingURL=question-toggle.model.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__question_model__ = __webpack_require__(63);

class TextboxQuestion extends __WEBPACK_IMPORTED_MODULE_0__question_model__["a" /* Question */] {
    constructor(options = {}) {
        super(options);
        this.type = options['type'] !== "" ? options['type'] : 'text';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TextboxQuestion;

//# sourceMappingURL=question-textbox.model.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const LoaderConfigs = {
    submit: {
        spinner: 'bubbles',
        content: `
            <div class="custom-spinner-container">
                <div class="custom-spinner-box">
                    Analyzing, please wait...
                </div>
            </div>`,
        duration: 100000
    },
    loading: {
        spinner: 'bubbles',
        content: `
            <div class="custom-spinner-container">
                <div class="custom-spinner-box">
                    Loading...
                </div>
            </div>`,
        duration: 100000
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = LoaderConfigs;

//# sourceMappingURL=loaders.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Question {
    constructor(options) {
        this.value = options.value || "";
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required || false;
        this.order = options.order === undefined ? 1 : options.order;
        this.visibility = options.visibility || "visible";
        this.event = options.event || null;
        this.controlType = options.controlType || '';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Question;

//# sourceMappingURL=question.model.js.map

/***/ }),

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);

/** @const {string} Mime type of wav file */
const WAV_MIME_TYPE = 'audio/wav';
/* unused harmony export WAV_MIME_TYPE */

// internal constants and functions
const NUMBER_MIME_TYPE = 'application/octet-stream';
const CHUNKSIZE_START_BYTE = 4;
const SAMPLE_RATE_START_BYTE = 24;
const SAMPLE_RATE_END_BYTE = SAMPLE_RATE_START_BYTE + 4;
const SUBCHUNK2SIZE_START_BYTE = 40;
const SUBCHUNK2SIZE_END_BYTE = SUBCHUNK2SIZE_START_BYTE + 4;
const N_HEADER_BYTES = 44;
/**
 *
 */
function sampleToByte(iSample) {
    'use strict';
    return N_HEADER_BYTES + 2 * iSample;
}
/*
  function byteToSample(iByte: number): number {
  'use strict';
  return iByte / 2 - N_HEADER_BYTES;
  }
*/
class BlobFactory {
    constructor() {
        this.parts = [];
    }
    append(part) {
        this.parts.push(part);
        this.blob = undefined;
    }
    getBlob() {
        if (!this.blob) {
            this.blob = new Blob(this.parts, { type: WAV_MIME_TYPE });
        }
        return this.blob;
    }
    clear() {
        this.parts = [];
        this.blob = undefined;
    }
}
const blobFactory = new BlobFactory();
/**
 *
 */
function makeWavBlobHeaderView(nSamples, sampleRate) {
    'use strict';
    // see: http://soundfile.sapp.org/doc/WaveFormat/
    const arrayByteLength = 2 * nSamples, arrayBuffer = new ArrayBuffer(N_HEADER_BYTES), headerView = new DataView(arrayBuffer), writeAscii = (dataView, offset, text) => {
        const len = text.length;
        for (let i = 0; i < len; i++) {
            dataView.setUint8(offset + i, text.charCodeAt(i));
        }
    };
    //
    // NB: this is single-channel (mono)
    //
    //   0-4: ChunkId
    writeAscii(headerView, 0, 'RIFF');
    //   4-8: ChunkSize
    headerView.setUint32(4, 36 + arrayByteLength, true);
    //  8-12: Format
    writeAscii(headerView, 8, 'WAVE');
    // 12-16: Subchunk1ID
    writeAscii(headerView, 12, 'fmt ');
    // 16-20: Subchunk1Size
    headerView.setUint32(16, 16, true);
    // 20-22: AudioFormat
    headerView.setUint16(20, 1, true);
    // 22-24: NumChannels
    headerView.setUint16(22, 1, true);
    // 24-28: SampleRate
    headerView.setUint32(24, sampleRate, true);
    // 28-32: ByteRate
    headerView.setUint32(28, sampleRate * 2, true);
    // 32-34: BlockAlign
    headerView.setUint16(32, 2, true);
    // 34-36: BitsPerSample
    headerView.setUint16(34, 16, true);
    // 36-40: Subchunk2ID
    writeAscii(headerView, 36, 'data');
    // 40-44: Subchunk2Size
    headerView.setUint32(40, arrayByteLength, true);
    return headerView;
} // public static makeWavBlobHeaderView(
let AUDIO_CONTEXT;
let SAMPLE_RATE = 0;
let HEADER_VIEW;
/**
 *
 */
class WavFile {
    /**
     *
     */
    static createWavFile(filePath, wavData, audioContext) {
        console.log('createWavFile(' + filePath + ') - nSamples=' + wavData.length);
        if (!AUDIO_CONTEXT) {
            AUDIO_CONTEXT = audioContext;
            SAMPLE_RATE = AUDIO_CONTEXT.sampleRate;
        }
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            const nSamples = wavData.length;
            HEADER_VIEW = makeWavBlobHeaderView(nSamples, SAMPLE_RATE);
            blobFactory.append(HEADER_VIEW);
            blobFactory.append(wavData);
            const blob = blobFactory.getBlob();
            console.log('The blob created -->', blob);
            // downloadBlob(blob, "somewav.wav");
            // observer.next(blob);
            observer.next(blob);
            observer.complete();
        });
        return src;
    }
    static appendToWavFile(wavData, nPreAppendSample) {
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            const nSamples = nPreAppendSample + wavData.length;
            const subchunk2size = 2 * nSamples;
            const chunkSize = 36 + subchunk2size;
            let view = new DataView(new ArrayBuffer(4));
            // this.clearBlob();
            // blobFactory.append(HEADER_VIEW);
            view.setUint32(0, chunkSize, true);
            blobFactory.append(view);
            view.setUint32(0, subchunk2size, true);
            blobFactory.append(view);
            blobFactory.append(wavData);
            const blob = blobFactory.getBlob();
            observer.next(blob);
            observer.complete();
        });
        return src;
    }
    static clearBlob() {
        blobFactory.clear();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WavFile;

//# sourceMappingURL=wav-file.js.map

/***/ }),

/***/ 837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Tracktunes Inc
class DoubleBuffer {
    constructor(buffer1, buffer2, preSwapCB = null) {
        this.buffer1 = buffer1;
        this.buffer2 = buffer2;
        this.preSwapCB = preSwapCB;
        this.bufferLength = buffer1.length;
        if (!(this.buffer1['length'] && this.buffer2['length'])) {
            throw Error('double buffer no length');
        }
        if (buffer2.length !== this.bufferLength) {
            throw Error('double buffer size mismatch');
        }
        this.reset();
    }
    reset() {
        this.bufferIndex = 0;
        this.cumulativeIndex = 0;
        this.activeBuffer = this.buffer1;
    }
    swap() {
        if (this.preSwapCB) {
            this.preSwapCB(); // preSwapCB is calling saveWavFileChunk everytime
        }
        if (this.activeBuffer === this.buffer1) {
            this.activeBuffer = this.buffer2;
        }
        else {
            this.activeBuffer = this.buffer1;
        }
        this.bufferIndex = 0;
    }
}
/* unused harmony export DoubleBuffer */

class DoubleBufferGetter extends DoubleBuffer {
    constructor(buffer1, buffer2, preSwapCB = null) {
        super(buffer1, buffer2, preSwapCB);
    }
    getNext() {
        if (this.bufferIndex === this.bufferLength) {
            this.swap();
        }
        let value = this.activeBuffer[this.bufferIndex];
        this.cumulativeIndex++;
        this.bufferIndex++;
        return value;
    }
}
/* unused harmony export DoubleBufferGetter */

class DoubleBufferSetter extends DoubleBuffer {
    constructor(buffer1, buffer2, preSwapCB = null) {
        super(buffer1, buffer2, preSwapCB);
    }
    setNext(value) {
        if (this.bufferIndex === this.bufferLength) {
            this.swap();
        }
        this.activeBuffer[this.bufferIndex] = value;
        // this.activeBuffer = this._downSample(this.activeBuffer, SAMPLE_RATE, 1000 * 16);
        this.cumulativeIndex++;
        this.bufferIndex++;
    }
    _downSample(data, oldSampleRate, newSampleRate) {
        let fitCount = Math.round(data.length * (newSampleRate / oldSampleRate));
        let newData = [];
        let springFactor = (data.length - 1) / (fitCount - 1);
        newData[0] = data[0]; // for new allocation
        for (var i = 1; i < fitCount - 1; i++) {
            let tmp = i * springFactor;
            let before = new Number(Math.floor(tmp)).toFixed();
            let after = new Number(Math.ceil(tmp)).toFixed();
            let atPoint = tmp - parseFloat(before);
            newData[i] = this._linearInterpolate(data[before], data[after], atPoint);
        }
        newData[fitCount - 1] = data[data.length - 1]; // for new allocation
        return newData;
    }
    _linearInterpolate(before, after, atPoint) {
        return before + (after - before) * atPoint;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DoubleBufferSetter;

//# sourceMappingURL=double-buffer.js.map

/***/ }),

/***/ 838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(429);
// Copyright (c) 2017 Tracktunes Inc


/** @constant {number} */
const DEFAULT_REQUEST_SIZE = 1024 * 1024 * 1024;
/* unused harmony export DEFAULT_REQUEST_SIZE */

class Filesystem {
    /**
     * @param  {FileSystem} fileSystem
     * @param  {string[]} paths
     * @returns Observable<Entry[]>
     */
    static getEntriesFromPaths(fileSystem, paths) {
        console.log('getEntriesFromPaths(fs, [' + paths.join(', ') + '])');
        const entryObservableArray = paths.map((path) => {
            return Filesystem.getPathEntry(fileSystem, path, false);
        });
        const result = [];
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].from(entryObservableArray).concatAll().subscribe((entry) => {
                result.push(entry);
            }, (err) => {
                observer.error(err);
            }, () => {
                observer.next(result);
                observer.complete();
            });
        });
        return src;
    }
    /**
     * @param  {FileSystem} fileSystem
     * @param  {string[]} paths
     * @returns Observable<void>
     */
    static deleteEntries(fileSystem, paths) {
        console.log('deleteEntries(fs, [' + paths.join(', ') + '])');
        const entryObservableArray = paths.map((path) => {
            return Filesystem.getPathEntry(fileSystem, path, false);
        });
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].from(entryObservableArray).concatAll().subscribe((entry) => {
                Filesystem.deleteEntry(entry).subscribe(null, (err1) => {
                    observer.error(err1);
                });
            }, (err2) => {
                observer.error(err2);
            }, () => {
                observer.next();
                observer.complete();
            });
        });
        return src;
    }
    /**
     * @param  {FileSystem} fileSystem
     * @param  {string[]} paths
     * @param  {DirectoryEntry} parent
     * @returns Observable<void>
     */
    static moveEntries(fileSystem, paths, parent) {
        console.log('moveEntries(fs, ' + paths + ',' +
            parent.name + ')');
        const entryObservableArray = paths.map((path) => {
            return Filesystem.getPathEntry(fileSystem, path, false);
        });
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].from(entryObservableArray).concatAll().subscribe((entry) => {
                Filesystem.moveEntry(entry, parent).subscribe(null, (err1) => {
                    observer.error(err1);
                });
            }, (err2) => {
                observer.error(err2);
            }, () => {
                observer.next();
                observer.complete();
            });
        });
        return src;
    }
    /**
     * @param  {Entry} entry
     * @param  {DirectoryEntry} parent
     * @returns Observable<void>
     */
    static moveEntry(entry, parent) {
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            entry.moveTo(parent, entry.name, (ent) => {
                console.log('moveEntry(): SUCCESS');
                observer.next();
                observer.complete();
            }, (err) => {
                console.log('moveEntry(): ERROR: ' + err);
                observer.error(err);
            });
        });
        return src;
    }
    /**
     * see https://www.html5rocks.com/en/tutorials/file/filesystem/
     * @param  {Entry} entry
     * @param  {string} oldName
     * @param  {string} newName
     * @returns Observable<void>
     */
    static rename(fileSystem, parentDirectoryEntry, oldName, newName) {
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_1__models__["e" /* isFolder */])(oldName)) {
                fileSystem.root.getDirectory(oldName, { create: false }, (entry) => {
                    entry.moveTo(parentDirectoryEntry, newName);
                    console.log('RENAME DIR SUCCESS ::: ' + newName);
                    observer.next();
                    observer.complete();
                }, (err) => {
                    console.log('RENAME DIR ERROR ::: ' + err);
                    observer.error(err);
                });
            }
            else {
                fileSystem.root.getFile(oldName, { create: false }, (entry) => {
                    entry.moveTo(parentDirectoryEntry, newName);
                    observer.next();
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                });
            }
        });
        return src;
    }
    /**
     * @param  {Entry} entry
     * @returns Observable<void>
     */
    static deleteEntry(entry) {
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            if (entry.isFile) {
                entry.remove(() => {
                    observer.next();
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                });
            }
            else if (entry.isDirectory) {
                entry.removeRecursively(() => {
                    observer.next();
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                });
            }
        });
        return src;
    }
    /**
     * @param  {FileSystem} fileSystem
     * @param  {string} path
     * @param  {boolean=false} bCreate
     * @returns Observable<Entry>
     */
    static getPathEntry(fileSystem, path, bCreate = false) {
        console.log('getPathEntry(fs, ' + path + ', ' + bCreate + ')');
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            if (path === '/') {
                observer.next(fileSystem.root);
                observer.complete();
            }
            else if (path[path.length - 1] === '/') {
                // it's a folder
                fileSystem.root.getDirectory(path, { create: bCreate }, (directoryEntry) => {
                    observer.next(directoryEntry);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                });
            } // if (path[path.length - 1] === '/') {
            else {
                // it's a file
                console.log('fileSystem.root.getFile(' + path + ', ' + bCreate + ')');
                fileSystem.root.getFile(path, { create: bCreate }, (fileEntry) => {
                    observer.next(fileEntry);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                });
            } // if (path[path.length - 1] === '/') { .. else { ..}
        });
        return src;
    }
    /**
     * @param  {boolean} bPersistent
     * @returns Observable<UsageAndQuota>
     */
    static queryUsageAndQuota(bPersistent) {
        const storageType = bPersistent ? 'webkitPersistentStorage' : 'webkitTemporaryStorage', src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            navigator[storageType].queryUsageAndQuota((usedBytes, grantedBytes) => {
                observer.next({
                    usedBytes: usedBytes,
                    grantedBytes: grantedBytes
                });
                observer.complete();
            }, (err) => {
                observer.error(err);
            });
        });
        return src;
    }
    /**
     * @param  {boolean} bPersistent
     * @returns Observable<number>
     */
    static requestQuota(bPersistent) {
        const storageType = bPersistent ? 'webkitPersistentStorage' : 'webkitTemporaryStorage', src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            navigator[storageType].requestQuota(DEFAULT_REQUEST_SIZE, (grantedBytes) => {
                observer.next(grantedBytes);
                observer.complete();
            }, (err) => {
                observer.error(err);
            });
        });
        return src;
    }
    /**
     * @param  {boolean=true} bPersistent
     * @param  {number=DEFAULT_REQUEST_SIZE} requestSize
     * @returns Observable<FileSystem>
     */
    static getFileSystem(bPersistent = true, requestSize = DEFAULT_REQUEST_SIZE) {
        console.log('getFileSystem(bPersistent=' + bPersistent + ', requestSize=' + requestSize + ')');
        const fsType = bPersistent ? window.PERSISTENT : window.TEMPORARY;
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            Filesystem.requestQuota(bPersistent).subscribe((grantedBytes) => {
                (window.requestFileSystem ||
                    window['webkitRequestFileSystem'])(fsType, grantedBytes, (fs) => {
                    observer.next(fs);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                });
            });
        });
        return src;
    }
    /**
     * Write data into a file, starting at a particular location.
     * @param {FileSystem} fs - the file system we're working with
     * @param {string} path - full path of file to write to.
     * @param {Blob} blob - the data to write.
     * @param {number} seekOffset - the location (byte) to start writing from.
     * @param {boolean} bCreate - whether to create the file first or not.
     * @returns Observable<void>
     */
    static writeToFile(fs, path, blob, seekOffset, bCreate) {
        console.log('writeToFile(fs, ' + path + ', bCreate=' + bCreate + ')');
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            fs.root.getFile(path, { create: bCreate }, (fileEntry) => {
                // Create a FileWriter object for our FileEntry (log.txt).
                fileEntry.createWriter((fileWriter) => {
                    fileWriter.onwriteend = (event) => {
                        observer.next();
                        observer.complete();
                    };
                    fileWriter.onerror = (err1) => {
                        observer.error(err1);
                    };
                    if (seekOffset > 0) {
                        fileWriter.seek(seekOffset);
                    }
                    fileWriter.write(blob);
                }, (err1) => {
                    observer.error(err1);
                });
            }, (err2) => {
                observer.error(err2);
            }); // fs.root.getFile(
        });
        return src;
    }
    /**
     * @param {FileSystem} fs - the file system we're working with
     * @param {string} path - the file to append to
     * @param {Blob} blob - the data to write
     * @returns Observable<FileEntry>
     */
    static appendToFile(fs, path, blob) {
        console.log('appendToFile(fs, ' + path + ', blob)');
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            fs.root.getFile(path, { create: false }, (fileEntry) => {
                // Create a FileWriter object for our FileEntry (log.txt).
                fileEntry.createWriter((fileWriter) => {
                    fileWriter.onwriteend = (event) => {
                        console.log('appendToFile() - ' + 'Wrote ' + blob.size + ' bytes. ' + 'Accum = ' + fileWriter.length + ' bytes');
                        observer.next(fileEntry);
                        observer.complete();
                    };
                    fileWriter.onerror = (err1) => {
                        observer.error(err1);
                    };
                    // see to end and write from there
                    fileWriter.seek(fileWriter.length);
                    fileWriter.write(blob);
                }, (err2) => {
                    observer.error(err2);
                });
            }, (err3) => {
                observer.error(err3);
            }); // fs.root.getFile(
        });
        return src;
    }
    /**
     *
     * @param {FileSystem} fs - the file system we're working with
     * @param {string} path - the file to get metadata from
     * @returns Observable<Metadata>
     */
    static getMetadata(fs, path) {
        console.log('getMetadata(fs, ' + path + ')');
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_1__models__["e" /* isFolder */])(path)) {
                fs.root.getDirectory(path, { create: false }, (directoryEntry) => {
                    directoryEntry.getMetadata((metadata) => {
                        observer.next(metadata);
                        observer.complete();
                    }, (err1) => {
                        observer.error(err1);
                    });
                }, (err2) => {
                    observer.error(err2);
                }); // fs.root.getFile(
            }
            else {
                fs.root.getFile(path, { create: false }, (fileEntry) => {
                    fileEntry.getMetadata((metadata) => {
                        observer.next(metadata);
                        observer.complete();
                    }, (err1) => {
                        observer.error(err1);
                    });
                }, (err2) => {
                    observer.error(err2);
                }); // fs.root.getFile(
            }
        });
        return src;
    }
    /**
     * @param {FileSystem} fs - the file system we're working with
     * @param {string} path - the path of the file to download
     * @returns Observable<void>
     */
    static downloadFileToDevice(fs, path) {
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            fs.root.getFile(path, { create: false }, (fileEntry) => {
                fileEntry.file((file) => {
                    const name = Object(__WEBPACK_IMPORTED_MODULE_1__models__["f" /* pathFileName */])(path);
                    const len = name.length;
                    const bSuffix = name.slice(len - 4, len).toLowerCase() === '.wav';
                    Object(__WEBPACK_IMPORTED_MODULE_1__models__["c" /* downloadBlob */])(file, bSuffix ? name : name + '.wav');
                    observer.next();
                    observer.complete();
                });
            });
        });
        return src;
    }
    /**
     * @param {FileSystem} fs - the file system we're working with
     * @param {string} path - the file to read from
     * @param {number} startByte
     * @param {number} endByte
     * @returns Observable<ArrayBuffer>
     */
    static readFromFile(fs, path, startByte = null, endByte = null) {
        console.log('readFromFile(fs, ' + path + ', ' + startByte + ', ' + endByte + ')');
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            fs.root.getFile(path, { create: false }, (fileEntry) => {
                fileEntry.file((file) => {
                    const fileReader = new FileReader();
                    fileReader.onloadend = (event) => {
                        console.log('onloadend: filereader.result = ' + fileReader.result.byteLength);
                        // console.dir(fileReader.result);
                        observer.next(fileReader.result);
                        observer.complete();
                    };
                    fileReader.onerror = (err1) => {
                        observer.error(err1);
                    };
                    if (startByte || endByte) {
                        // >=1 of startByte nor endByte were
                        // specified, read from startByte to
                        // endByte this is where we call slice()
                        const start = startByte || 0;
                        const end = endByte || file.size;
                        const blob = file.slice(start, end);
                        // we may need to give the blob (a) a
                        // header, (b) a mime type and then the
                        // chunks may be decoded - try that next.
                        fileReader.readAsArrayBuffer(blob);
                    }
                    else {
                        // neither startByte nor endByte were
                        // specified, read entire file
                        fileReader.readAsArrayBuffer(file);
                    }
                }, (err2) => {
                    observer.error(err2);
                });
            }, (err3) => {
                observer.error(err3);
            }); // fs.root.getFile(
        });
        return src;
    }
    /**
     * @param {DirectoryEntry} parentDirectoryEntry
     * @param {string} name
     * @returns Observable<DirectoryEntry>
     */
    static createFolder(parentDirectoryEntry, name) {
        console.log('createFolder(' + parentDirectoryEntry.fullPath + ', ' + name + ')');
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            parentDirectoryEntry.getDirectory(name, { create: true }, (directoryEntry) => {
                observer.next(directoryEntry);
                observer.complete();
            }, (err) => {
                observer.error(err);
            });
        });
        return src;
    }
    /**
     * @param {DirectoryEntry} directoryEntry -
     */
    static readFolderEntries(directoryEntry) {
        console.log('readFolderEntries(' + directoryEntry.fullPath + ')');
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            let dirReader = directoryEntry.createReader();
            let results = [];
            const readEntries = () => {
                dirReader.readEntries((entries) => {
                    if (entries.length) {
                        results = results.concat(entries);
                        readEntries();
                    }
                    else {
                        // base case - done
                        observer.next(results);
                        observer.complete();
                    }
                }, (err) => {
                    observer.error(err);
                });
            };
            // start reading dir entries
            readEntries();
        });
        return src;
    }
    /**
     * @param {FileSystem} fileSystem - file system where we're erasing
     * @returns Observable<void>
     */
    static eraseEverything(fileSystem) {
        const src = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].create((observer) => {
            Filesystem.readFolderEntries(fileSystem.root).subscribe((entries) => {
                const paths = entries.map((entry) => {
                    return entry.fullPath + (entry.isFile ? '' : '/');
                });
                console.log('CURRENT PATHS ', paths);
                Filesystem.deleteEntries(fileSystem, paths).subscribe(() => {
                    console.log('ALL ERASED');
                    observer.next();
                    observer.complete();
                }, (err1) => {
                    observer.error(err1);
                });
            }, (err2) => {
                observer.error(err2);
            });
        });
        return src;
    }
}
/* unused harmony export Filesystem */

//# sourceMappingURL=filesystem.js.map

/***/ }),

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getFullPath */
/* harmony export (immutable) */ __webpack_exports__["c"] = isFolder;
/* harmony export (immutable) */ __webpack_exports__["d"] = pathFileName;
/* unused harmony export pathParent */
/* unused harmony export pathChild */
/* unused harmony export copyFromObject */
/* unused harmony export has */
/* unused harmony export isFunction */
/* unused harmony export isDefined */
/* unused harmony export isUndefined */
/* unused harmony export isString */
/* unused harmony export isPositiveWholeNumber */
/* unused harmony export isWholeNumber */
/* unused harmony export isOdd */
/* unused harmony export isEven */
/* unused harmony export formatTime */
/* harmony export (immutable) */ __webpack_exports__["b"] = formatUnixTimestamp;
/* unused harmony export formatDate */
/* unused harmony export objectInspector */
/* unused harmony export prependArray */
/* harmony export (immutable) */ __webpack_exports__["a"] = downloadBlob;
// Copyright (c) 2017 Tracktunes Inc

/**
 * Extracts the full path of an entry, if it's a folder it ends with '/'.
 * @param {string}
 * @returns string
 */
function getFullPath(entry) {
    const fullPath = entry.fullPath;
    return entry.isDirectory && (fullPath.length > 1) ?
        fullPath + '/' : fullPath;
}
/**
 * Returns true if path is a folder and false otherwise.
 * @param {string}
 * @returns boolean
 */
function isFolder(path) {
    return (path[path.length - 1] === '/');
}
/**
 * Extracts the filename out of a full-path
 * @param {string}
 * @returns string
 */
function pathFileName(filePath) {
    return filePath.replace(/^.*[\\\/]/, '');
}
/**
 * Extracts the folder out of a full-path
 * @param {string}
 * @returns string
 */
function pathFolderName(filePath) {
    // return filePath.replace(pathFileName(filePath), '');
    return filePath.match(/^.*[\\\/]/).toString();
}
function pathParent(path) {
    if (isFolder(path)) {
        return folderPathParent(path);
    }
    else {
        return pathFolderName(path);
    }
}
function pathChild(path) {
    return path.replace(pathParent(path), '');
}
/**
 * Extracts the parent folder out of a full-path of a folder argument.
 * @param {string}
 * @returns string
 */
function folderPathParent(dirPath) {
    const pathParts = dirPath.split('/').filter((str) => { return str !== ''; }), nParts = pathParts.length;
    if (nParts <= 1) {
        return '/';
    }
    return '/' + pathParts.splice(0, nParts - 1).join('/') + '/';
}
/**
 * Update object 'dest' by adding or changing any fields that differ in 'src'
 * @param {Object} 'src' the source object from which to update 'dest'
 * @param {Object} 'dest' the destination object to update and return
 * @returns Object - the updated 'dest' object
 */
function copyFromObject(src, dest) {
    for (let prop in src) {
        if (has(src, prop)) {
            dest[prop] = src[prop];
        }
    }
    return dest;
}
/**
 * @param {any}
 * @param {any}
 * @returns boolean
 */
function has(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
/**
 * Checks if the given argument is a function.
 * @param {any}
 * @returns boolean
 */
function isFunction(func) {
    return (typeof func) === 'function';
}
/**
 * Checks if the given argument is defined.
 * @param {any}
 * @returns boolean
 */
function isDefined(obj) {
    return (typeof obj) !== 'undefined';
}
/**
 * Checks if the given argument is undefined.
 * @param {any}
 * @returns boolean
 */
function isUndefined(obj) {
    return (typeof obj) === 'undefined';
}
/**
 * Checks if the given argument is a string.
 * @param {any}
 * @returns boolean
 */
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
/**
 * Positive whole number test
 * @param {number} the number we're verifying
 * @returns boolean - whether argument is a positive whole number
 */
function isPositiveWholeNumber(num) {
    return (isWholeNumber(num) && num > 0);
}
/**
 * Whole number test
 * @param {number} the number we're verifying
 * @returns boolean - whether argument is a whole number
 */
function isWholeNumber(num) {
    return (num === 0 || (num && !isNaN(num) && num === Math.floor(num)));
}
/**
 * @param {number}
 * return {boolean}
 */
function isOdd(num) {
    if (!isWholeNumber(num)) {
        throw Error('isOdd expected whole number as input, got: ' + num);
    }
    return num % 2 === 1;
}
/**
 * @param {number}
 * @returns boolean
 */
function isEven(num) {
    return !isOdd(num);
}
/**
 * @param {number}
 * @returns string
 */
function addZero(num) {
    return (num < 10) ? '0' : '';
}
/**
 * format time into H*:MM:SS.CC
 * @param {number} - number of seconds, float
 * @param {number} - maximum time, determines final string length/components
 * @returns string - the time string representation
 */
function formatTime(timeInSeconds, maxTimeInSeconds) {
    let nSeconds = Math.floor(timeInSeconds), 
    // initialize the result with the centiseconds portion and period
    result = (timeInSeconds - nSeconds).toFixed(2).substr(1);
    if (timeInSeconds < 60 && maxTimeInSeconds < 60) {
        // no minutes
        result = addZero(nSeconds) + nSeconds.toString() + result;
    }
    else {
        // yes minutes
        let nMinutes = Math.floor(nSeconds / 60.0);
        nSeconds -= nMinutes * 60;
        result = ':' + addZero(nSeconds) + nSeconds.toString() + result;
        if (timeInSeconds < 3600 && maxTimeInSeconds < 3600) {
            // no hours in timeInSeconds
            result = addZero(nMinutes) + nMinutes.toString() + result;
        }
        else {
            // we've got hours - timeInSeconds spans hours
            const nHours = Math.floor(nMinutes / 60.0);
            nMinutes -= nHours * 60;
            result = nHours.toString() + ':' + addZero(nMinutes) +
                nMinutes + result;
        }
    }
    return result;
}
/**
 * Create a string that reflects the Unix timestamp 'timestamp'
 * at 1 second resolution in human readable form
 * @param {number} timestamp - Unix timestamp representation of datetime
 * @returns string - human readable text representation of timestamp
 */
function formatUnixTimestamp(timestamp) {
    return formatDate(new Date(timestamp));
}
/**
 * Create a string that reflects the Unix date 'date'
 * at 1 second resolution in human readable form
 * @param {number} timestamp - Unix timestamp representation of datetime
 * @returns string - human readable text representation of timestamp
 */
function formatDate(date) {
    return [
        date.getFullYear().toString(),
        '-',
        (date.getMonth() + 1).toString(),
        '-',
        date.getDate().toString()
    ].join('').toLowerCase().replace(' ', '');
}
/**
 * Digs through a Javascript object to display all its properties.
 * @param {Object} - a Javascript object to inspect
 * @returns string - concatenated descriptions of all object properties
 */
function objectInspector(object) {
    let rows = [], key, count = 0;
    for (key in object) {
        if (!has(object, key)) {
            continue;
        }
        const val = object[key];
        rows.push([' - ', key, ':', val, ' (', typeof val, ')'].join(''));
        count++;
    }
    return [
        '\nType: ' + typeof object,
        'Length: ' + count,
        rows.join('\n')
    ].join('\n');
}
/**
 * Adds a value to an array as its first element.
 * @param {any} value - value to add to array.
 * @param {any[]} arr - the array to add to.
 * @returns any[] - the appended-to array.
 */
function prependArray(value, arr) {
    let newArray = arr.slice(0);
    newArray.unshift(value);
    return newArray;
}
/**
 * Save blob into a local file.
 * NOTE: we cannot use the function below everywhere
 * (a) because some browsers don't support the url that's created
 *     the way it's created here as the href field;
 * (b) because chrome on android would not allow this - it considers
 *     it to be a cross origin request, so at this point we cannot
 *     download on mobile browsers.
 * @param {Blob}
 * @param {filename}
 */
function downloadBlob(blob, filename) {
    /*
    let url = (window.URL || window.webkitURL)
        .createObjectURL(blob);
    let link = document.getElementById("a-save-link");
    link.href = url;
    link.download = filename || 'output.wav';
    console.log('hi1');
    console.dir(link);
    console.log('simulateCLick(link): ' + simulateClick(link));
    console.log('hi2');
    // link.click();
    */
    const url = (window['URL'] || window['webkitURL'])
        .createObjectURL(blob);
    let anchorElement = document.createElement('a');
    anchorElement.style.display = 'none';
    anchorElement.href = url;
    anchorElement.setAttribute('download', filename);
    document.body.appendChild(anchorElement);
    // anchorElement.click();
    simulateClick(anchorElement);
    setTimeout(() => {
        document.body.removeChild(anchorElement);
        window.URL.revokeObjectURL(url);
        console.log('downloadBlob(' + filename + '): finished!');
    }, 100);
}
/**
 * Simulate a click event.
 * @public
 * @param {Element} elem  the element to simulate a click on
 * @returns boolean - True if canceled, false otherwise
 */
function simulateClick(element) {
    // Create our event (with options)
    const evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: false,
        view: window
    });
    // If cancelled, don't dispatch our event
    return element.dispatchEvent(evt);
}
//# sourceMappingURL=misc-utils.js.map

/***/ }),

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioContextGenerator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let AudioContextGenerator = class AudioContextGenerator {
    constructor() { }
    createAudioContext() {
        let context = null;
        window['AudioContext'] =
            window['AudioContext'] || window['webkitAudioContext'];
        try {
            // context = new AudioContext({ latencyHint: 'playback' });
            context = new AudioContext();
        }
        catch (err) {
            console.error('Web Audio API is not supported in this browser');
        }
        return context;
    }
    getAudioContext() {
        return this.context || null;
    }
    getSampleRate() {
        return this.context ? this.context.sampleRate : null;
    }
    setAudioContext(context) {
        this.context = context;
    }
};
AudioContextGenerator = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], AudioContextGenerator);

//# sourceMappingURL=audioContextGenerator.service.js.map

/***/ }),

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicFormQuestionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questions_question_model__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let DynamicFormQuestionComponent = class DynamicFormQuestionComponent {
    constructor() { }
    /**
     * Verify if is valid input field
     * @return True or False
     */
    get isValid() {
        return this.form.controls[this.question.key] ? this.form.controls[this.question.key].valid : true;
    }
    /**
     * Method to handle form value changes and realtime responses
     * @param: event EventEmitter sent from the component
     * @param: question Question that must contains the metadata for the action
     */
    onChangeAnswer(event, question) {
        if (question.event) {
            let action = { event, question };
            this.changeEvent.emit(action);
        }
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__questions_question_model__["a" /* Question */])
], DynamicFormQuestionComponent.prototype, "question", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */])
], DynamicFormQuestionComponent.prototype, "form", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], DynamicFormQuestionComponent.prototype, "changeEvent", void 0);
DynamicFormQuestionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'df-question',template:/*ion-inline-start:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\home\formbuilder\questions-template\dynamic-form-question.component.html"*/'<!-- Item wrapper -->\n\n<ion-item [hidden]="question.visibility == \'hidden\'" [formGroup]="form" [ngSwitch]="question.controlType">\n\n    <!-- Label -->\n\n    <ion-label class="question-label question-label-sm" stacked [attr.for]="question.key">{{question.label}}</ion-label>\n\n\n\n    <!-- Input text field -->\n\n    <ion-input class="question-input" *ngSwitchCase="\'textbox\'" [formControlName]="question.key" [id]="question.key" [type]="question.type"></ion-input>\n\n\n\n    <!-- Input text area -->\n\n    <ion-textarea rows="8" class="question-input" *ngSwitchCase="\'textarea\'" [formControlName]="question.key" [id]="question.key" [type]="question.type"></ion-textarea>\n\n\n\n    <!-- Input combobox area -->\n\n    <ion-select [id]="question.key" *ngSwitchCase="\'dropdown\'" [formControlName]="question.key">\n\n        <ion-option *ngFor="let opt of question.options" [value]="opt.key">{{opt.value}}</ion-option>\n\n    </ion-select>\n\n\n\n    <!-- Input true/false toggle area -->\n\n    <ion-toggle (ionChange)="onChangeAnswer($event, question)" *ngSwitchCase="\'toggle\'" [formControlName]="question.key" [id]="question.key" [(ngModel)]="question.value"></ion-toggle>\n\n\n\n</ion-item>\n\n<!-- Required label -->\n\n<!-- <div class="errorMessage" *ngIf="!isValid">{{question.label}} is required</div> -->\n\n<div class="errorMessage" *ngIf="!isValid">Required</div>'/*ion-inline-end:"C:\Users\gabriel.freire\Documents\workspace\expert_system\src\pages\home\formbuilder\questions-template\dynamic-form-question.component.html"*/,
        styles: ['./dynamic-form-question.component.css']
    }),
    __metadata("design:paramtypes", [])
], DynamicFormQuestionComponent);

//# sourceMappingURL=dynamic-form-question.component.js.map

/***/ })

},[432]);
//# sourceMappingURL=main.js.map