import { Component, OnInit, Output, EventEmitter }  from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoadingController, ViewController } from 'ionic-angular';

import { QuestionService } from '../../../providers/form/question.service'

import { Question } from '../../../models/form/questions/question.model'
import { EventBody } from '../../../models/eventbody.model';
import { QuestionBody } from '../../../models/form/questions/questionbody.model'
import { ActionOptions } from '../../../models/actionoptions.model'

import { QuestionControlService } from '../../../providers/form/question-control.service'
import { DiagnosticsService } from '../../../providers/diagnostics/diagnostic.service'

import { LoaderConfigs } from './../../loaders/loaders';
import { QuestionEventMapper } from '../../../mappers/event-mapper.service'

const ERROR_NO_EVENT_TO_TRIGGER = "No event was passed to the trigger";
const UNTITLED_QUESTIONNAIRE = 'Untitled Questionnaire';
/**
 * FORM COMPONENT
 */
@Component({
    selector: 'app-form',
    templateUrl: 'FormBuilder.component.html',
    styles: ['./FormBuilder.component.scss']
  })
export class FormBuilder implements OnInit{
    @Output() changeEvent: EventEmitter<any> = new EventEmitter();
    questions: Question[] = [];    
    form: FormGroup;
    payLoad = '';
    title = '';
    hasSubmit: boolean = true;

    constructor(private questionControlService: QuestionControlService, 
        public questionService: QuestionService, 
        public diagnosticsService: DiagnosticsService, 
        public loadingCtrl: LoadingController, 
        public eventMapper: QuestionEventMapper,
        public viewCtrl : ViewController){}

    ngOnInit() {
        this.listenToQuestionEvents();
        let params = this.viewCtrl.getNavParams();
        if(params && params.data) {
            this.getForm(params.data.form);
        }
    }
    
    /**
     * Submit data to get action back from server, in this case: Diagnostic
     */
    onSubmit(): void {
        let loading = this.loadingCtrl.create(LoaderConfigs.submit);
        this.hasSubmit = false;
        this.questions=[];
        loading.present();
        
        this.diagnosticsService.getDiagnostic(this.form.value).subscribe((res) => {
            if(res && res.data) this.payLoad = res;
            loading.dismiss();
        });
    }

    /**
     * Listener for the change event of a df-question
     */
    listenToQuestionEvents(): void {
        //listen for the event from df-question
        this.changeEvent.subscribe((eventBody: EventBody) => {

            if(!eventBody) throw ERROR_NO_EVENT_TO_TRIGGER;
            let eventTarget = eventBody.question.event.target;
            let targetQuestion = this.getQuestion(eventTarget);
            let options: ActionOptions = {
                event: eventBody.question.event.type || "visibility",
                action: eventBody.question.event.action || "visible",
                target: targetQuestion
            }
            let newQuestion = this.eventMapper.applyAction(options);
            this.updateQuestion(targetQuestion.key, newQuestion);
        })
    }

    /**
     * Get a specific form by name
     * 
     * Questionnaire names -> 'flu', 'hd', 'mh' and 'watson'
     * @param option A questionnaire name
     */
    getForm(option: string): void {
        let loading = this.loadingCtrl.create(LoaderConfigs.loading);
        loading.present();
        this.questionService.makeForm(option).subscribe((questionnaire: QuestionBody) => {
            this.title = questionnaire.additional_information.title ? questionnaire.additional_information.title : UNTITLED_QUESTIONNAIRE;
            this.form = this.questionControlService.toFormGroup(questionnaire.questions);
            this.questions = questionnaire.questions;
            this.hasSubmit = true;
            this.payLoad = '';
            loading.dismiss();
        }, (error) => {
            loading.dismiss();
            console.log(error);
        });
    }

    /**
     * *****************
     * QUESTIONS UTILITY METHODS 
     * *****************
     */

    /**
     * Returns a question by key
    * @param key question key
    * @return A Question
    */
    getQuestion(key: string|number): Question {
        for(var i = 0; i < this.questions.length; i++) {
            if(this.questions[i].key === key){
                return this.questions[i];
            }
        }
        return null;
    }

    /**
     * Update a specific question
    * @param key question key
    */
    updateQuestion(key: string|number, newQuestion: Question): void {
        for(var i = 0; i < this.questions.length; i++) {
            if(this.questions[i].key === key){
                this.questions[i] = newQuestion;
            }
        }
    }

    /**
     * Clear the form
     */
    clear(): void {
        this.questions = [];
        this.hasSubmit = false;
        this.payLoad = '';
    }
}