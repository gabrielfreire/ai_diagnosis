import { Question } from './../pages/home/formbuilder/questions/question.model';

export interface ActionOptions {
    event: string;
    action: string;
    target: Question;
}