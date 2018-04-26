// Copyright (c) 2017 Tracktunes Inc

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { formatTime } from '../../models';
import { AUDIO_CONTEXT, SAMPLE_RATE } from '../';

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

    public nClipped: number;

    protected abstract valueCB(pcm: number): void;

    // this is how we signal
    constructor() {
        console.log('constructor()');

        this.nClipped = 0;

        if (!AUDIO_CONTEXT) {
            this.status = RecordStatus.NO_CONTEXT_ERROR;
            return;
        }

        this.status = RecordStatus.UNINITIALIZED_STATE;

        // create nodes that do not require a stream in their constructor
        this.createNodes();

        // this call to resetPeaks() also initializes private variables
        this.resetPeaks();

        // grab microphone, init nodes that rely on stream, connect nodes
        this.initAudio();
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
        console.log('initAudio(): SAMPLE RATE: ' + SAMPLE_RATE);

        const getUserMediaOptions: Object = {
            video: false,
            audio: true
        };

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
            }
            else {
                // neither old nor new getUserMedia are available
                console.warn('initAudio() Error: no getUserMedia');
                // alert('initAudio() Error: no getUserMedia');
                this.status = RecordStatus.NO_GETUSERMEDIA_ERROR;
            }
        }
    }

    /**
     * @param {AudioProcessingEvent}
     * @returns void
     */
    private onAudioProcess(processingEvent: AudioProcessingEvent): void {
        // console.log('onAudioProcess() ' + this.isRecording);
        let inputBuffer: AudioBuffer = processingEvent.inputBuffer;
        let inputData: Float32Array = inputBuffer.getChannelData(0);
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

            // clip monitored volume at [0, 1]
            // if (absValue > 1) {
            //     absValue = 1;
            // }

            // keep track of volume using abs value
            if (absValue > this.currentVolume) {
                this.currentVolume = absValue;
            }

            // fill up double-buffer active buffer if recording (and
            // save every time a fill-up occurs)
            // if (this.valueCB && this.isRecording) {
            if (this.isRecording) {
                this.valueCB(clippedValue);
                this.nRecordedSamples++;
            }
        } // for (i ...
    }

    /**
     * Create audioGainNode & scriptProcessorNode
     * @returns void
     */
    private createNodes(): void {
        console.log('createNodes()');
        // create the gainNode
        this.audioGainNode = AUDIO_CONTEXT.createGain();
        // create and configure the scriptProcessorNode
        this.scriptProcessorNode = AUDIO_CONTEXT.createScriptProcessor(PROCESSING_BUFFER_LENGTH, 1, 1);
        this.scriptProcessorNode.onaudioprocess = (processingEvent: AudioProcessingEvent): any => {
            this.onAudioProcess(processingEvent);
        };
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
    private connectNodes(stream: MediaStream): void {
        console.log('connectNodes()');
        // TODO: a check here that this.mediaStream is valid

        // create a source node out of the audio media stream
        // (the other nodes, which do not require a stream for their
        // initialization, are created in this.createNodes())
        this.sourceNode = AUDIO_CONTEXT.createMediaStreamSource(stream);

        // create a destination node (need something to connect the
        // scriptProcessorNode with or else it won't process audio)
        // let dest: MediaStreamAudioDestinationNode =
        //     AUDIO_CONTEXT.createMediaStreamDestination();

        // sourceNode (microphone) -> gainNode
        this.sourceNode.connect(this.audioGainNode);

        // gainNode -> scriptProcessorNode
        this.audioGainNode.connect(this.scriptProcessorNode);

        // scriptProcessorNode -> destination
        // this.scriptProcessorNode.connect(dest);
        this.scriptProcessorNode.connect(AUDIO_CONTEXT.destination);

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
        this.nRecordedSamples = 0;
        this.isRecording = true;
        this.isInactive = false;
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
    }

    /**
     * Returns recording time, in seconds.
     * @returns number
     */
    private getTime(): number {
        return this.isInactive ? 0 : this.nRecordedSamples / SAMPLE_RATE;
    }

}
