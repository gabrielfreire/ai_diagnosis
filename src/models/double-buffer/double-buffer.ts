// Copyright (c) 2017 Tracktunes Inc
export abstract class DoubleBuffer {
    private buffer1: any;
    private buffer2: any;
    private preSwapCB: () => void;
    protected bufferLength: number;
    public bufferIndex: number;
    public cumulativeIndex: number;
    public activeBuffer: any;

    constructor(buffer1: any, buffer2: any, preSwapCB: () => void = null) {
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

    public reset(): void {
        this.bufferIndex = 0;
        this.cumulativeIndex = 0;
        this.activeBuffer = this.buffer1;
    }

    protected swap(): void {
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

export class DoubleBufferGetter extends DoubleBuffer {

    constructor(buffer1: any, buffer2: any, preSwapCB: () => void = null) {
        super(buffer1, buffer2, preSwapCB);
    }

    public getNext(): any {
        if (this.bufferIndex === this.bufferLength) {
            this.swap();
        }
        let value: any = this.activeBuffer[this.bufferIndex];
        this.cumulativeIndex++;
        this.bufferIndex++;
        return value;
    }
}

export class DoubleBufferSetter extends DoubleBuffer {

    constructor(buffer1: any, buffer2: any, preSwapCB: () => void = null) {
        super(buffer1, buffer2, preSwapCB);
    }

    public setNext(value: any): void {
        if (this.bufferIndex === this.bufferLength) {
            this.swap();
        }
        this.activeBuffer[this.bufferIndex] = value;
        // this.activeBuffer = this._downSample(this.activeBuffer, SAMPLE_RATE, 1000 * 16);
        this.cumulativeIndex++;
        this.bufferIndex++;
    }

    private _downSample(data, oldSampleRate, newSampleRate) {
        let fitCount = Math.round(data.length * ( newSampleRate / oldSampleRate ));
        let newData = [];
        let springFactor = (data.length - 1) / (fitCount - 1);
        newData[0] = data[0]; // for new allocation
        for ( var i = 1; i < fitCount - 1; i++) {
            let tmp = i * springFactor;
            let before = new Number(Math.floor(tmp)).toFixed();
            let after = new Number(Math.ceil(tmp)).toFixed();
            let atPoint = tmp - parseFloat(before);
            newData[i] = this._linearInterpolate(data[before], data[after], atPoint);
        }
        newData[fitCount - 1] = data[data.length - 1]; // for new allocation
        return newData;
    }
    private _linearInterpolate(before, after, atPoint) {
        return before + (after - before) * atPoint;
    }
}
