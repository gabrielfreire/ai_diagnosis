// Copyright (c) 2017 Tracktunes Inc

import { Observable } from 'rxjs/Rx';
import { Filesystem, downloadBlob } from '../';
import { AUDIO_CONTEXT, SAMPLE_RATE } from '../../providers';

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

/**
 *
 */
function makeWavBlobHeaderView(
    nSamples: number,
    sampleRate: number
): DataView {
    'use strict';
    // see: http://soundfile.sapp.org/doc/WaveFormat/
    const arrayByteLength: number = 2 * nSamples,
          arrayBuffer: ArrayBuffer = new ArrayBuffer(N_HEADER_BYTES),
          headerView: DataView = new DataView(arrayBuffer),
          writeAscii:
          (dataView: DataView, offset: number, text: string) => void =
          (dataView: DataView, offset: number, text: string) => {
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

/**
 *
 */
export class WavFile {

    /**
     *
     */
    public static readWavFileInfo(
        filePath: string,
        bIncludeMetadata: boolean = false
    ): Observable<WavInfo> {
        console.log('readWavFileInfo(' + filePath + ')');
        const src: Observable<WavInfo> = Observable.create((observer) => {
            Filesystem.getFileSystem(true).subscribe(
                (fileSystem: FileSystem) => {
                    Filesystem.readFromFile(fileSystem, filePath, SAMPLE_RATE_START_BYTE, SAMPLE_RATE_END_BYTE).subscribe((data1: any) => {
                            const view1: DataView = new DataView(data1),
                                  sampleRate: number = view1.getUint32(0, true);
                            Filesystem.readFromFile(
                                fileSystem,
                                filePath,
                                SUBCHUNK2SIZE_START_BYTE,
                                SUBCHUNK2SIZE_END_BYTE
                            ).subscribe(
                                (data2: any) => {
                                    const view2: DataView = new DataView(data2),
                                          subchunk2Size: number =
                                          view2.getUint32(0, true),
                                          nSamples: number = subchunk2Size / 2;
                                    if (bIncludeMetadata) {
                                        // yes metadata
                                        Filesystem.getMetadata(
                                            fileSystem,
                                            filePath
                                        ).subscribe(
                                            (metadata: Metadata) => {
                                                observer.next({
                                                    nSamples: nSamples,
                                                    sampleRate: sampleRate,
                                                    metadata: metadata
                                                });
                                                observer.complete();
                                            },
                                            (err0: any) => {
                                                observer.error(err0);
                                            }
                                        );
                                    }
                                    else {
                                        // no metadata
                                        observer.next({
                                            nSamples: nSamples,
                                            sampleRate: sampleRate,
                                            metadata: null
                                        });
                                        observer.complete();
                                    }
                                },
                                (err1: any) => {
                                    observer.error(err1);
                                }
                            );
                        },
                        (err2: any) => {
                            observer.error(err2);
                        }
                    );
                },
                (err3: any) => {
                    observer.error(err3);
                });
        });
        return src;
    } // public static readWavFileInfo(

    /**
     *
     */
    public static readWavFileAudio(
        filePath: string,
        startSample: number = undefined,
        endSample: number = undefined
    ): Observable<AudioBuffer> {
        console.log('readWavFileAudio(' + filePath + ', startSample: ' +
                    startSample + ', endSample: ' + endSample + ')');
        const startByte: number = sampleToByte(startSample),
              endByte: number = sampleToByte(endSample);
        const src: Observable<AudioBuffer> = Observable.create((obs) => {
            Filesystem.getFileSystem(true).subscribe(
                (fileSystem: FileSystem) => {
                    Filesystem.readFromFile( fileSystem, filePath, startByte, endByte ).subscribe(
                        (arrayBuffer: ArrayBuffer) => {
                            if (!arrayBuffer.byteLength) {
                                // could not read anything - this is where we
                                // are failing currently.
                                obs.error('!arrayBuffer.byteLength');
                            }
                            // console.log('array buffer: ' + arrayBuffer);
                            // console.log(arrayBuffer.byteLength);
                            // console.dir(arrayBuffer);
                            if (startByte) {
                                // this is a chunk that does not
                                // contain a header we have to create
                                // a blob with a wav header, read the
                                // blob with filereader, then decode
                                // the result console.log('array
                                // buffer: ' + arrayBuffer + ', byte
                                // length: ' + arrayBuffer.byteLength
                                // + ', startByte: ' + startByte + ',
                                // endByte: ' + endByte);
                                // console.log(arrayBuffer.byteLength);
                                // console.dir(arrayBuffer);

                                const fileReader: FileReader = new FileReader();

                                fileReader.onerror = (err1: any) => {
                                    obs.error(err1);
                                };

                                fileReader.onload = () => {
                                    console.log('onload: ' +
                                                fileReader.result.byteLength);

                                    // For decodeAudioData errs on
                                    // arrayBuffer, see
                                    // https://stackoverflow.com/questions..
                                    // ../10365335..
                                    // ../decodeaudiodata-returning-a-null-error
                                    AUDIO_CONTEXT.decodeAudioData(
                                        fileReader.result
                                    ).then(
                                        (audioBuffer: AudioBuffer) => {
                                            console.log('AUDIO DATA DECODED!');
                                            obs.next(audioBuffer);
                                            obs.complete(audioBuffer);
                                        }).catch((err2: any) => {
                                            obs.error(err2);
                                        });
                                };

                                fileReader.readAsArrayBuffer(
                                    new Blob(
                                        [
                                            makeWavBlobHeaderView(
                                                arrayBuffer.byteLength / 2,
                                                SAMPLE_RATE
                                            ),
                                            arrayBuffer
                                        ],
                                        { type: WAV_MIME_TYPE }
                                    )
                                ); // fileReader.readAsArrayBuffer(
                            }
                            else {
                                // this is the entire file, so it has a header,
                                // just decode it
                                AUDIO_CONTEXT.decodeAudioData(arrayBuffer).then(
                                    (audioBuffer: AudioBuffer) => {
                                        obs.next(audioBuffer);
                                        obs.complete(audioBuffer);
                                    }).catch((err1: any) => {
                                        obs.error(err1);
                                    });
                            }
                        },
                        (err2: any) => {
                            obs.error(err2);
                        }
                    );
                },
                (err3: any) => {
                    obs.error(err3);
                });
        });
        return src;
    } // public static readWavFileInfo(

    /**
     *
     */
    public static createWavFile(filePath: string, wavData: Int16Array
    ): Observable<void> {
        console.log('createWavFile(' + filePath + ') - nSamples=' + wavData.length);
        const src: Observable<void> = Observable.create((observer) => {
            // Filesystem.getFileSystem(true).subscribe((fileSystem: FileSystem) => {
            console.log('GOT IT');
            const nSamples: number = wavData.length;
            const headerView: DataView = makeWavBlobHeaderView(nSamples, SAMPLE_RATE);
            const blob: Blob = new Blob([ headerView, wavData ], { type: WAV_MIME_TYPE });
            const dataFile = new FormData();
            dataFile.append("file", blob, "wavfile")
            // downloadBlob(blob, "somewav.wav");
            observer.next(dataFile);
            observer.complete();
                // Filesystem.writeToFile(fileSystem, filePath, blob, 0, true).subscribe(() => {
                //     console.log('appended cata len: ' + wavData.length);
                //     observer.next();
                //     observer.complete();
                // },(err1: any) => {
                //     observer.error(err1);
                // });
            // }, (err3: any) => {
            //     observer.error('* err3 * ' + err3);
            // });
        });
        return src;
    } // public static readWavFileInfo(

    /**
     *
     */
    public static appendToWavFile(
        filePath: string,
        wavData: Int16Array,
        nPreAppendSamples: number
    ): Observable<void> {
        console.log('appendToWavFile(' + filePath + '), nPre: '
                    + nPreAppendSamples);
        const src: Observable<void> = Observable.create((observer) => {
            Filesystem.getFileSystem(true).subscribe(
                (fileSystem: FileSystem) => {
                    // see http://soundfile.sapp.org/doc/WaveFormat/
                    // for definitions of subchunk2size and chunkSize
                    const nSamples: number = nPreAppendSamples + wavData.length,
                          subchunk2size: number = 2 * nSamples,
                          chunkSize: number = 36 + subchunk2size;
                    console.log('nSamples: ' + nSamples);
                    let view: DataView = new DataView(new ArrayBuffer(4));
                    view.setUint32(0, chunkSize, true);
                    Filesystem.writeToFile(
                        fileSystem,
                        filePath,
                        new Blob([ view ], { type: NUMBER_MIME_TYPE }),
                        CHUNKSIZE_START_BYTE,
                        false
                    ).subscribe(
                        () => {
                            view.setUint32(0, subchunk2size, true);
                            Filesystem.writeToFile(
                                fileSystem,
                                filePath,
                                new Blob([ view ], { type: NUMBER_MIME_TYPE }),
                                SUBCHUNK2SIZE_START_BYTE,
                                false
                            ).subscribe(
                                () => {
                                    Filesystem.appendToFile(
                                        fileSystem,
                                        filePath,
                                        new Blob(
                                            [ wavData ],
                                            { type: WAV_MIME_TYPE }
                                        )
                                    ).subscribe(
                                        () => {
                                            console.log('appended data len: ' +
                                                        wavData.length);
                                            observer.next();
                                            observer.complete();
                                        },
                                        (err1: any) => {
                                            observer.error('* err1 * ' +
                                                           wavData.length +
                                                           ' - ' + err1);
                                        }
                                    );
                                },
                                (err2: any) => {
                                    observer.error('err2 ' + err2);
                                }
                            ); // .writeToFile(fs, path, blob, 40, false) ..
                        },
                        (err3: any) => {
                            observer.error('err3 ' + err3);
                        }
                    ); // .writeToFile(fs, path, blob, 4, false).subscribe(
                },
                (err4: any) => {
                    observer.error(err4);
                }
            );
        });
        return src;
    } // public static appendToWavFile(
}
