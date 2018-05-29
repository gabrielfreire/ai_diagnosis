import { Observable } from 'rxjs/Rx';
import { Filesystem, downloadBlob } from '../';

/**
 *
 */
export interface WavInfo {
    nSamples: number;
    sampleRate: number;
    metadata: Metadata;
}

/** @const {string} Mime type of wav file */
export const WAV_MIME_TYPE: string = 'audio/wav';

// internal constants and functions
const NUMBER_MIME_TYPE: string = 'application/octet-stream';
const CHUNKSIZE_START_BYTE: number = 4;
const SAMPLE_RATE_START_BYTE: number = 24;
const SAMPLE_RATE_END_BYTE: number = SAMPLE_RATE_START_BYTE + 4;
const SUBCHUNK2SIZE_START_BYTE: number = 40;
const SUBCHUNK2SIZE_END_BYTE: number = SUBCHUNK2SIZE_START_BYTE + 4;
const N_HEADER_BYTES: number = 44;

/**
 *
 */
function sampleToByte(iSample: number): number {
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
    parts: any[];
    blob: Blob;
    constructor(){
        this.parts = [];
    }
    append (part): void {
        this.parts.push(part);
        this.blob = undefined;
    }
    getBlob(): Blob {
        if(!this.blob) {
            this.blob = new Blob(this.parts, {type: WAV_MIME_TYPE });
        }
        return this.blob;
    }
    clear(): void {
        this.parts = [];
        this.blob = undefined;
    }
}


const blobFactory: BlobFactory = new BlobFactory();
/**
 *
 */
function makeWavBlobHeaderView(nSamples: number, sampleRate: number): DataView {
    'use strict';
    // see: http://soundfile.sapp.org/doc/WaveFormat/
    const arrayByteLength: number = 2 * nSamples,
          arrayBuffer: ArrayBuffer = new ArrayBuffer(N_HEADER_BYTES),
          headerView: DataView = new DataView(arrayBuffer),
          writeAscii: (dataView: DataView, offset: number, text: string) => void = (dataView: DataView, offset: number, text: string) => {
              const len: number = text.length;
              for (let i: number = 0; i < len; i++) {
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

let AUDIO_CONTEXT: AudioContext;
let SAMPLE_RATE: number = 0;
let HEADER_VIEW: DataView;
/**
 *
 */
export class WavFile {
    /**
     *
     */
    public static createWavFile(filePath: string, wavData: Int16Array, audioContext: AudioContext): Observable<Blob> {
        console.log('createWavFile(' + filePath + ') - nSamples=' + wavData.length);
        if(!AUDIO_CONTEXT) {
            AUDIO_CONTEXT = audioContext;
            SAMPLE_RATE = AUDIO_CONTEXT.sampleRate;
        }
        const src: Observable<Blob> = Observable.create((observer) => {
            const nSamples: number = wavData.length;
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

    public static appendToWavFile(wavData: Int16Array, nPreAppendSample: number): Observable<Blob> {
        const src: Observable<Blob> = Observable.create((observer) => {
            const nSamples: number = nPreAppendSample + wavData.length;
            const subchunk2size: number = 2 * nSamples;
            const chunkSize: number = 36 + subchunk2size;
            let view: DataView = new DataView(new ArrayBuffer(4));
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

    public static clearBlob(): void {
        blobFactory.clear();
    }
}
