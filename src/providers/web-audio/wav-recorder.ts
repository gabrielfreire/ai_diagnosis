// Copyright (c) 2017 Tracktunes Inc

import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { formatUnixTimestamp, DoubleBufferSetter, WavFile, downloadBlob, Filesystem } from '../../models';
import { WebAudioRecorder } from './recorder';
import { AudioContextGenerator } from '../';
import { Platform } from 'ionic-angular';

// make this a multiple of PROCESSING_BUFFER_LENGTH (from record.ts)
// export const WAV_CHUNK_LENGTH: number = 4096;
export const WAV_CHUNK_LENGTH: number = 262144;
// export const WAV_CHUNK_LENGTH: number = 131072;

// pre-allocate the double chunk buffers used for saving to DB
const WAV_CHUNK1: Int16Array = new Int16Array(WAV_CHUNK_LENGTH);
const WAV_CHUNK2: Int16Array = new Int16Array(WAV_CHUNK_LENGTH);

/**
 * Audio Record functions based on WebAudio.
 * @class WebAudioRecorder
 */
@Injectable()
export class WavRecorder extends WebAudioRecorder {
    private setter: DoubleBufferSetter;
    private nChunksSaved: number;
    private filePath: string;

    // this is how we signal
    constructor(public audioContextGenerator: AudioContextGenerator,public platform: Platform) {
        super(audioContextGenerator, platform);
        console.log('constructor()');
        this.filePath = null;
        this.setter = new DoubleBufferSetter(WAV_CHUNK1, WAV_CHUNK2, () => {
            // THIS CALLBACK IS CALLED MULTIPLE TIMES WHILE THE AUDIO IS BEING RECORDED
            // TODO remove saveWavFileChunk from this callback and maybe replace for a debugging log to see activeBuffer change
            // this.saveWavFileChunk(this.setter.activeBuffer).subscribe(null, (err: any) => {
            //     // alert('Error in RecordWav.setter(): ' + err);
            //     console.log('Error in RecordWav.setter(): ' + err);
            // });
            console.log('Recording: ' + this.setter.bufferIndex);
        });
        this.nChunksSaved = 0;
    }

    /**
     * Precondition: Pcm is clipped (?)
     * valueCB receives the inputBuffer value clipped (-1, 1) from onAudioProcess
     * and setter.setNext calls saveWavFileChunk through swap() method
     */
    protected valueCB(pcm: number): void {
        this.setter.setNext(pcm < 0 ? pcm * 0x8000 : pcm * 0x7fff);
    }

    /**
     *
     */
    public getFilePath(): string {
        return this.filePath;
    }

    /**
     *
     */
    public unloadRecordedFile(): void {
        this.filePath = null;
    }

    /**
     * Save the next wav file chunk
     * TODO change this method in a way i don't save chunks, but the whole file in the end of recording from buffer data
     * @return {Observable<void>}
     */
    private saveWav(arr: Int16Array): Observable<File | Blob> {
        console.log('saveWav(arr.size=' + arr.length + ', nSamples: ' + this.nRecordedSamples + ')');
        let src: Observable<File | Blob> = Observable.create((observer) => {
            WavFile.createWavFile(this.filePath, arr, this.audioContext).subscribe((blob: Blob) => {
                this.nChunksSaved = 1;
                observer.next(blob);
                observer.complete();
            },(err1: any) => {
                observer.error(err1);
            });
        });
        return src;
    }

    /**
     * Start recording
     */
    public start(): Promise<void> {
        return new Promise((resolve, reject) => {
            super.start().then(() => {
                const dateCreated: number = Date.now();
                const displayDateCreated: string = formatUnixTimestamp(dateCreated);
                const filePath: string = '/' + displayDateCreated;
                console.log('start() - ' + filePath);
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
    public stop(): Observable<File | Blob> {
        console.log('WavRecorder:stop() @ ' + this.setter.bufferIndex + ', len: ' + this.setter.activeBuffer.subarray(0, this.setter.bufferIndex).length);
        this.reset();
        let src: Observable<File | Blob> = Observable.create((observer) => {
          this.saveWav(this.setter.activeBuffer.subarray(0, this.setter.bufferIndex)).subscribe((formDataFile: File | Blob) => {
                console.log("WavFile:saveWav() @ Saved");
                console.log('form data ' + JSON.stringify(formDataFile));
                this.nChunksSaved = 0;
                this.setter.reset();
                //downloadBlob(formDataFile, "somewav.wav");
                if(this.audioContext.close) {
                  this.audioContext.close().then(() => {
                    console.log('AUDIO CONTEXT CLOSED');
                  });
                } else if(this.audioContext.state == "running") {
                  this.audioContext.suspend().then(() => {
                    console.log('AUDIO CONTEXT SUSPENDED');
                  });
                }
                observer.next(formDataFile);
                observer.complete();

            },(err: any) => {
                observer.error(err);
            });
        });

        return src;
    }
}
