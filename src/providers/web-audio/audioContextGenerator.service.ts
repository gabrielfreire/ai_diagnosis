import { Injectable } from '@angular/core';

@Injectable()
export class AudioContextGenerator {
    context: AudioContext;
    sampleRate: number;
    constructor() {}

    createAudioContext(): AudioContext {
        let context: AudioContext = null;
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

    setAudioContext(context: AudioContext): void {
        this.context = context;
    }
}