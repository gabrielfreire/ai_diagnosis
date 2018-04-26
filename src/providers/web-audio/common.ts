// Copyright (c) 2017 Tracktunes Inc

/** @constant {AudioContext} AUDIO_CONTEXT */
export const AUDIO_CONTEXT: AudioContext =
    ((): AudioContext => {
        let context: AudioContext = null;
        window['AudioContext'] =
            window['AudioContext'] || window['webkitAudioContext'];
        try {
            // context = new AudioContext({ latencyHint: 'playback' });
            context = new AudioContext();
        }
        catch (err) {
            alert('Web Audio API is not supported in this browser');
        }
        return context;
    })();

/** @constant {number} SAMPLE_RATE */
export const SAMPLE_RATE: number = AUDIO_CONTEXT.sampleRate;
