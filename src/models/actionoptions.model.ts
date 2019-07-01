import { Question } from './form/questions/question.model';

export interface ActionOptions {
    event: string;
    action: string;
    target: Question;
}