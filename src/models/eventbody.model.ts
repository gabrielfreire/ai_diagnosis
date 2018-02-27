import { EventEmitter } from '@angular/core';
import { Question } from './../pages/home/formbuilder/questions/question.model';

export interface EventBody {
    event? : EventEmitter<any>;
    question?: Question;
}