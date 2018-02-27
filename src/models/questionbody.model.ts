import { Question } from './../pages/home/formbuilder/questions/question.model';

export interface QuestionBody {
    questions?: Array<Question>;
    additional_information?: any;
}