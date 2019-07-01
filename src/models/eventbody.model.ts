import { EventEmitter } from '@angular/core';
import { Question } from './form/questions/question.model';

export interface EventBody {
    event? : EventEmitter<any>;
    question?: Question;
}