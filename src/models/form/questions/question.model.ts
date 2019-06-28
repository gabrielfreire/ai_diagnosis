import { Event } from './../../event.model';

export class Question {
    value: string;
    key: string;
    label: string;
    order: number;
    required: boolean;
    visibility: string;
    event: Event;
    controlType: string;

    constructor(options?){
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