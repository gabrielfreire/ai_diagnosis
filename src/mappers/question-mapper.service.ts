import { Injectable } from '@angular/core';
import { Question } from './../pages/home/formbuilder/questions/question.model';
import { DropdownQuestion } from './../pages/home/formbuilder/questions/question-dropdown.model';
import { ToggleQuestion } from './../pages/home/formbuilder/questions/question-toggle.model';
import { TextboxQuestion } from './../pages/home/formbuilder/questions/question-textbox.model';
import { QuestionBody } from './../models/questionbody.model';

@Injectable()
export class QuestionMapper {
    constructor(){}

    /**
     * Question Mapper
     * @param res response from http request
     */
    map(res: any): QuestionBody {
        let response = res.json();
        let questions: Question[] = [];
        let q = response.questions;
        let addInfo = response.additional_information || { title: "" };
        //traverse fields
        for(var i = 0; i < q.length; i++){
            const field = q[i];
            const controlType = q[i].controlType || "";
            //create specific question type
            let question = this.mapToQuestion(controlType, field);
            questions.push(question);
        }
        //return the components in the right order
        return {
            questions: questions.sort((a, b) => a.order - b.order),
            additional_information: addInfo
        };
    }

    /**
     * Create a Question object of some type
     * 
     * Types -> 'textbox', 'textarea', 'dropdown' and 'toggle'
     * @param controlType Type of question
     * @param question <Question> Object with meta information about the question
     * @return Question Object of some type
     */
    mapToQuestion(controlType:string, question: any): Question {
        let cQuestion: Question = null;
        switch(controlType){
            case 'textbox':
                let textBox = new TextboxQuestion(question);
                cQuestion = textBox;
                break;
            case 'textarea':
                let textArea = new TextboxQuestion(question);
                cQuestion = textArea;
                break;
            case 'dropdown':
                let dropdownField = new DropdownQuestion(question);
                cQuestion = dropdownField
                break;
            case 'toggle':
                let toggle = new ToggleQuestion(question);
                cQuestion = toggle;
                break;
            default:
                cQuestion = new Question(question);
                break;
        }
        return cQuestion;
    }
}
