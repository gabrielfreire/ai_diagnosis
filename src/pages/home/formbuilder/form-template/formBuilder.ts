import { Component, OnInit, Output, EventEmitter }  from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionService } from '../questions/question.service';
import { Question } from '../questions/question.model';
import { QuestionControlService } from '../questions/question-control.service';
import { DiagnosticsService } from '../../../../app/diagnostics/diagnostic.service';
import { LoadingController, ViewController } from 'ionic-angular';
import { LoaderConfigs } from './loaders/loaders';
import { QuestionEventMapper } from './../../../../app/mappers/event-mapper.service';
import { EventBody } from './../../../../app/models/eventbody.model';
import { QuestionBody } from './../../../../app/models/questionbody.model';

const ERROR_NO_EVENT_TO_TRIGGER = "No event was passed to the trigger";
const UNTITLED_QUESTIONNAIRE = 'Untitled Questionnaire';
/**
 * FORM COMPONENT
 */
@Component({
    selector: 'app-form',
    templateUrl: 'formBuilder.html',
    styles: ['./formBuilder.scss']
  })
export class FormBuilderCustom implements OnInit{
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
     * submit data to get action back from server, in this case: Diagnostic
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
        this.changeEvent.subscribe((action: EventBody) => {

            if(!action) throw ERROR_NO_EVENT_TO_TRIGGER;
            let eventAction = action.question.event.action || "visible";
            let eventType = action.question.event.type || "visibility";
            let eventTarget = action.question.event.target;

            let targetQuestion = this.getQuestion(eventTarget);
            
            let newQuestion = this.eventMapper.applyAction(eventType, eventAction, targetQuestion);
            this.updateQuestion(targetQuestion.key, newQuestion);
        })
    }

    /**
     * Get a specific form
     * @param option type of form ['flu','hd','watson']   hd == Heart Disease form
     */
    getForm(option: string): void {
        let loading = this.loadingCtrl.create(LoaderConfigs.loading);
        loading.present();
        this.questionService.makeForm(option).subscribe((questionnaire: QuestionBody) => {
            this.title = questionnaire.additional_information.title ? questionnaire.additional_information.title : UNTITLED_QUESTIONNAIRE;
            this.hasSubmit = true;
            this.payLoad = '';
            this.form = this.questionControlService.toFormGroup(questionnaire.questions);
            this.questions = questionnaire.questions;
            loading.dismiss();
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
    */
    getQuestion(key): Question {
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
    updateQuestion(key, newQuestion): void {
        for(var i = 0; i < this.questions.length; i++) {
            if(this.questions[i].key === key){
                this.questions[i] = newQuestion;
            }
        }
    }

    /**
     * Clear/reset the form
     */
    clear(): void {
        this.questions = [];
        this.hasSubmit = false;
        this.payLoad = '';
    }
}