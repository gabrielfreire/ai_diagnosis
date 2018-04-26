// Copyright (c) 2017 Tracktunes Inc

import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { formatUnixTimestamp, DoubleBufferSetter, WavFile } from '../../models';
import { WebAudioRecorder } from './recorder';

// make this a multiple of PROCESSING_BUFFER_LENGTH (from record.ts)
export const WAV_CHUNK_LENGTH: number = 131072;

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
    constructor() {
        super();
        console.log('constructor()');
        this.filePath = null;
        this.setter = new DoubleBufferSetter(WAV_CHUNK1, WAV_CHUNK2, () => {
            this.saveWavFileChunk(this.setter.activeBuffer).subscribe(null, (err: any) => {
                // alert('Error in RecordWav.setter(): ' + err);
                console.log('Error in RecordWav.setter(): ' + err);
            });
        });
        this.nChunksSaved = 0;
    }

    /**
     * Precondition: Pcm is clipped (?)
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
     * @return {Observable<void>}
     */
    private saveWavFileChunk(arr: Int16Array): Observable<void> {
        console.log('saveWavFileChunk(arr.size=' + arr.length + ', nSamples: ' + this.nRecordedSamples + ')');
        let src: Observable<void> = Observable.create((observer) => {
            if (this.nChunksSaved === 0) {
                WavFile.createWavFile(this.filePath, arr).subscribe((dataURL) => {
                    this.nChunksSaved = 1;
                    observer.next(dataURL);
                    observer.complete();
                },(err1: any) => {
                    observer.error(err1);
                });
            }
            else {
                WavFile.appendToWavFile(this.filePath, arr, this.nRecordedSamples - arr.length).subscribe(() => {
                    this.nChunksSaved++;
                    observer.next();
                    observer.complete();
                }, (err1: any) => {
                    observer.error(err1);
                });
            }
        });
        return src;
    }

    /**
     * Start recording
     */
    public start(): void {
        super.start();
        const dateCreated: number = Date.now();
        const displayDateCreated: string = formatUnixTimestamp(dateCreated);
        const filePath: string = '/Unfiled/' + displayDateCreated;
        console.log('start() - ' + filePath);
        this.filePath = filePath;
    }

    /**
     * Stop recording and save the last chunk.
     * Precondition: called start() already
     * @return {Observable<void>}
     */
    public stop(): Observable<void> {
        console.log('WavRecorder:stop() @ ' + this.setter.bufferIndex + ', len: ' + this.setter.activeBuffer.subarray(0, this.setter.bufferIndex).length);
        this.reset();
        let src: Observable<void> = Observable.create((observer) => {
            this.saveWavFileChunk(this.setter.activeBuffer.subarray(0, this.setter.bufferIndex)).subscribe((dataURL) => {
                console.log("WavFile:saveWavFileChunk() @ Saved");
                console.log(dataURL);
                this.nChunksSaved = 0;
                this.setter.reset();
                observer.next(dataURL);
                observer.complete();
            },(err: any) => {
                observer.error(err);
            });
        });

        return src;
    }
}
