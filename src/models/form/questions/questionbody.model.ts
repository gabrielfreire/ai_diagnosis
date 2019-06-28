import { Question } from './question.model';

export interface QuestionBody {
    questions?: Array<Question>;
    additional_information?: any;
}