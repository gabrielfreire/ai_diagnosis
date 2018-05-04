// Copyright (c) 2017 Tracktunes Inc
declare let audioinput: any;

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { formatTime } from '../../models';
import { AudioContextGenerator } from '../';
import { Platform } from 'ionic-angular';

/** @const {string} Heartbeat clock's ID of function to run periodically */
const RECORDER_CLOCK_FUNCTION_NAME: string = 'recorder';


/**
 * @const {string} Length of script processing buffer - (a) this must be a
 * power of 2; (b) the smaller this is, the more accurately we track time.
 */
const PROCESSING_BUFFER_LENGTH: number = 4096;

/** @const {number}  Waiting time between checks that WAA is initialized */
const WAIT_MSEC: number = 50;
// statuses
export enum RecordStatus {
    // uninitialized means we have not been initialized yet
    UNINITIALIZED_STATE,
    // error occured - no indexedDB available
    NO_DB_ERROR,
    // error occured - no AudioContext
    NO_CONTEXT_ERROR,
    // error occured - no microphone
    NO_MICROPHONE_ERROR,
    // error occured - no getUserMedia()
    NO_GETUSERMEDIA_ERROR,
    // error occured - getUserMedia() has crashed
    GETUSERMEDIA_ERROR,
    // normal operation
    READY_STATE
}
function _normalizeAudio (pcmData) {
  for (var i = 0; i < pcmData.length; i++) {
      pcmData[i] = parseFloat(pcmData[i]) / 32767.0;
  }
  // If last value is NaN, remove it.
  if (isNaN(pcmData[pcmData.length - 1])) {
      pcmData.pop();
  }
  return pcmData;
}
// Add some web audio missing type definitions: See http://stackoverflow.com/..
// ..questions/32797833/typescript-web-audio-api-missing-definitions

// interface MediaStreamAudioDestinationNode extends AudioNode {
//     stream: MediaStream;
// }

// interface AudioContext {
//     createMediaStreamDestination: () => any;
// }

interface Gain {
    value: number;
}

interface AudioGainNode extends AudioNode {
    gain: Gain;
}

/**
 * Audio recording functions using Web Audio API
 * @class WebAudioRecorder
 */
@Injectable()
export abstract class WebAudioRecorder {
    private sourceNode: MediaElementAudioSourceNode;
    private audioGainNode: AudioGainNode;
    private scriptProcessorNode: ScriptProcessorNode;
    private nPeaksAtMax: number;
    private nPeakMeasurements: number;
    protected nRecordedSamples: number;
    public status: RecordStatus;
    public sampleRate: number;
    // isInactive means not recording and not paused
    public isInactive: boolean;
    // isRecording means actively recording and not paused
    public isRecording: boolean;
    public currentVolume: number;
    public displayTime: string;
    public maxVolumeSinceReset: number;
    public percentPeaksAtMax: string;
    public audioContext: AudioContext;

    public nClipped: number;
    public isMobileAudioInput: boolean;

    protected abstract valueCB(pcm: number): void;

    // this is how we signal
    constructor(public audioContextGenerator: AudioContextGenerator, public platform: Platform) {
        console.log('constructor()');

        this.nClipped = 0;

        // WONT CREATE AUDIO CONTEXT HERE BECAUSE IOS DOENS'T ALLOW IT TO BE CREATED THIS WAY
        // if (!AUDIO_CONTEXT) {
        //     this.status = RecordStatus.NO_CONTEXT_ERROR;
        //     return;
        // }

        this.status = RecordStatus.UNINITIALIZED_STATE;
        this.isMobileAudioInput = false;
    }

    /**
     * Wait indefinitely until DB is ready for use, via an observable.
     * @returns Observable<void> - Observable that emits when ready for use.
     */
    public waitForWAA(): Observable<void> {
        // NOTE:this loop should only repeat a handful of times or so
        let source: Observable<void> = Observable.create((observer) => {
            const repeat: () => void = () => {
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
    private initAudio(): void {
        console.log('initAudio(): SAMPLE RATE: ' + this.sampleRate);
        var self = this;
        const getUserMediaOptions: Object = {
            video: false,
            audio: true
        };

        if(this.platform.is('ios') || this.platform.is('android') || this.platform.is('cordova')){
            if(audioinput){
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
                            if(hasPermission){
                                console.log('Already have permission to record');
                                // startRecording
                                this.connectNodes();
                            } else {
                                console.log('No permission to record yet');
                                console.log('Asking...');
                                audioinput.getMicrophonePermission((hasPermission, message) => {
                                    if(hasPermission) {
                                        console.log('User granted permission to record');
                                        this.connectNodes();
                                    } else {
                                        console.warn('User denied permission to record');
                                        this.status = RecordStatus.GETUSERMEDIA_ERROR;
                                    }
                                });
                            }
                        });
                    });
                } catch (err) {
                    this.status = RecordStatus.GETUSERMEDIA_ERROR;
                    const msg: string = 'initAudio(old2): err: ' +
                          err + ', code: ' + err.code;
                    // alert(msg);
                    console.log(msg);
                }
            }
        } else {
            this.isMobileAudioInput = false;
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // We're in mozilla but not yet in chrome
                // new getUserMedia is available, use it to get microphone stream
                // console.log('Using NEW navigator.mediaDevices.getUserMedia');

                navigator.mediaDevices.getUserMedia(getUserMediaOptions)
                    .then((stream: MediaStream) => {
                        this.connectNodes(stream);
                    })
                    .catch((err: any) => {
                        this.status = RecordStatus.NO_MICROPHONE_ERROR;
                        const msg: string = 'initAudio(new): err: ' +
                              err + ', code: ' + err.code;
                        // alert(msg);
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
                        navigator.getUserMedia(getUserMediaOptions,(stream: MediaStream) => {
                            this.connectNodes(stream);
                        },
                        (err: any) => {
                            this.status = RecordStatus.NO_MICROPHONE_ERROR;
                            const msg: string = 'initAudio(old1): err: ' +
                                    err + ', code: ' + err.code;
                            // alert(msg);
                            console.log(msg);
                        });
                    }
                    catch (err) {
                        this.status = RecordStatus.GETUSERMEDIA_ERROR;
                        const msg: string = 'initAudio(old2): err: ' +
                              err + ', code: ' + err.code;
                        // alert(msg);
                        console.log(msg);
                    }
                } else {
                    // neither old nor new getUserMedia are available
                    console.warn('initAudio() Error: no getUserMedia');
                    // alert('initAudio() Error: no getUserMedia');
                    this.status = RecordStatus.NO_GETUSERMEDIA_ERROR;

                }
            }
        }
    }

    /**
     * @param {AudioProcessingEvent}
     * @returns void
     */
    private onAudioProcess(processingEvent: AudioProcessingEvent | Event): void {
        // console.log('onAudioProcess() ' + this.isRecording);
        if(this.isMobileAudioInput) {
            // DO MOBILE STUFF
            console.log('mobile onAudioProcess() ->', (<any>processingEvent).data.length);
            if((<any>processingEvent) && (<any>processingEvent).data) {
                let inputData: number[] = (<any>processingEvent).data;
                let i: number;
                let value: number;
                let absValue: number;
                this.currentVolume = 0;
                let audioBuffer = this.audioContext.createBuffer(1, (inputData.length / 1), this.audioContext.sampleRate);
                //let buffer = _normalizeAudio(inputData);
                let buffer = []
                for(i = 0; i < inputData.length; i++) {
                  value = inputData[i];
                  const clippedValue: number = Math.max(-1.0, Math.min(1.0, value));
                  if (value !== clippedValue) {
                    this.nClipped++;
                  }
                  absValue = Math.abs(clippedValue);
                  // keep track of volume using abs value
                  if (absValue > this.currentVolume) {
                    this.currentVolume = absValue;
                  }
                  if (this.isRecording) {
                    // outputData[i] = clippedValue;
                    buffer.push(clippedValue);
                    this.valueCB(clippedValue);
                    this.nRecordedSamples++;
                  }
                }
                audioBuffer.getChannelData(0).set(buffer);
                let source = this.audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(this.audioGainNode);
                source.start(0);
            }
            return;
        }
        // console.log('browser onAudioProcess() ->', processingEvent);
        let inputBuffer: AudioBuffer = (<AudioProcessingEvent>processingEvent).inputBuffer;
        let outputBuffer: AudioBuffer = (<AudioProcessingEvent>processingEvent).outputBuffer;
        let inputData: Float32Array = inputBuffer.getChannelData(0);
        let outputData: Float32Array = outputBuffer.getChannelData(0);
        let i: number;
        let value: number;
        let absValue: number;
        // put the maximum of current buffer into this.currentVolume
        this.currentVolume = 0;
        for (i = 0; i < PROCESSING_BUFFER_LENGTH; i++) {
            // value is the float value of the current PCM sample
            // it is expected to be in [-1, 1] but goes beyond that
            // sometimes
            value = inputData[i];
            const clippedValue: number = Math.max(-1.0, Math.min(1.0, value));
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
                outputData[i] = clippedValue;
                this.valueCB(clippedValue);
                this.nRecordedSamples++;
            }
        }
    }

    /**
     * Create audioGainNode & scriptProcessorNode
     * @returns void
     */
    private createNodes(): void {
        console.log('createNodes()');
        this.audioContext = this.audioContextGenerator.createAudioContext();
        if(this.audioContext) {
            this.audioContextGenerator.setAudioContext(this.audioContext);
            this.sampleRate = this.audioContext.sampleRate;
            // create the gainNode
            this.audioGainNode = this.audioContext.createGain();
            // create and configure the scriptProcessorNode
            this.scriptProcessorNode = this.audioContext.createScriptProcessor(PROCESSING_BUFFER_LENGTH, 1, 1);
            this.scriptProcessorNode.onaudioprocess = (processingEvent: AudioProcessingEvent): any => {
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
    private connectNodes(stream?: MediaStream): void {
        console.log('connectNodes()');
        const self = this;
        if(this.isMobileAudioInput) {
            // DO MOBILE STUFF WITH AUDIOINPUT
            audioinput.start({ bufferSize: PROCESSING_BUFFER_LENGTH, streamToWebAudio: false });
            window.addEventListener('audioinput', (event) => {
                self.onAudioProcess(event);
                // console.log('DATA FROM AUDIOINPUT', event);
            }, false);
            audioinput.connect(this.audioGainNode);
            this.audioGainNode.connect(this.audioContext.destination);
            // audioinput.connect(this.audioContext.destination);
            this.status = RecordStatus.READY_STATE;
            return;
        }
        // TODO: a check here that this.mediaStream is valid

        // create a source node out of the audio media stream
        // (the other nodes, which do not require a stream for their
        // initialization, are created in this.createNodes())
        this.sourceNode = this.audioContext.createMediaStreamSource(stream);

        // create a destination node (need something to connect the
        // scriptProcessorNode with or else it won't process audio)
        // let dest: MediaStreamAudioDestinationNode =
        //     this.audioContext.createMediaStreamDestination();

        // sourceNode (microphone) -> gainNode
        this.sourceNode.connect(this.audioGainNode);

        // gainNode -> scriptProcessorNode
        this.audioGainNode.connect(this.scriptProcessorNode);

        // scriptProcessorNode -> destination
        // this.scriptProcessorNode.connect(dest);
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
    public startMonitoring(): void {
        console.log('startMonitoring()');
        // this.heartbeat.addFunction(RECORDER_CLOCK_FUNCTION_NAME,// the monitoring actions are in the following function:
        //     () => {
        //         // update displayTime property
        //         // TODO: do the formatting outside this function, test heavily
        //         // but it should significantly help efficiency
        //         this.displayTime = formatTime(this.getTime(), Infinity);
        //         // console.log(this.displayTime);
        //         // update currentVolume property
        //         this.nPeakMeasurements += 1;
        //         if (this.currentVolume > this.maxVolumeSinceReset) {
        //             // on new maximum, re-start counting peaks
        //             this.resetPeaks();
        //             this.maxVolumeSinceReset = this.currentVolume;
        //         }
        //         else if (this.currentVolume === this.maxVolumeSinceReset) {
        //             this.nPeaksAtMax += 1;
        //         }

        //         // update percentPeaksAtMax property
        //         this.percentPeaksAtMax =
        //             (100.0 * this.nPeaksAtMax / this.nPeakMeasurements)
        //             .toFixed(1);
        //     });
    }

    /**
     * Stops monitoring (stops change detection)
     * @returns void
     */
    public stopMonitoring(): void {
        console.log('stopMonitoring()');
        // this.heartbeat.removeFunction(RECORDER_CLOCK_FUNCTION_NAME);
    }

    /**
     * Reset all peak stats as if we've just started playing audio at
     * time 0. Call this when you want to compute stats from now.
     * @returns void
     */
    public resetPeaks(): void {
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
    public setGainFactor(factor: number): void {
        if (this.status === RecordStatus.READY_STATE) {
            this.audioGainNode.gain.value = factor;
        }
        this.resetPeaks();
    }

    /**
     * Start recording
     * @returns void
     */
    public start(): void {
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
        });
    }

    /**
     * Pause recording
     * @returns void
     */
    public pause(): void {
        this.isRecording = false;
    }

    /**
     * Resume recording
     * @returns void
     */
    public resume(): void {
        this.isRecording = true;
    }

    /**
     * Stop recording, reset all for next recording.
     * @returns void
     */
    protected reset(): void {
        this.isRecording = false;
        this.isInactive = true;
        //if(this.isMobileAudioInput) this.status = RecordStatus.UNINITIALIZED_STATE;
        if(audioinput && this.isMobileAudioInput) {
          audioinput.stop((url) => { console.log('FINAL URL -> ', url) });
          audioinput.disconnect();
        }

    }

    /**
     * Returns recording time, in seconds.
     * @returns number
     */
    private getTime(): number {
        return this.isInactive ? 0 : this.nRecordedSamples / this.sampleRate;
    }

}
