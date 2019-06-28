import { load } from 'webdnn';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { QuestionMapper } from './../../mappers/question-mapper.service';
import { server } from './../../app/server.connection';
import { QuestionBody } from './../../models/form/questions/questionbody.model';

const SERVER_URL = server.url;
/**
 * Connect to REST API
 */
@Injectable()
export class QuestionService {

    constructor(public http: Http, public questionMapper: QuestionMapper){
        load('./../../assets/neural_network/output').then(runner => {
            console.log('loaded');
            console.log(runner.backendName);
            console.log(runner.inputs);
            console.log(runner.outputs);
        });
    }

    /**
     * Make a Questionnaire form of a certain type
     * 
     * Types -> 'flu', 'hd', 'mh' and 'watson'
     * @param option The name of the Questionnaire
     * @return An Observable of a QuestionBody object
     */
    makeForm(option: string): Observable<QuestionBody> {
        let fn;
        switch(option) {
            case 'flu': // Flu Diagnosis
                //build the form and load the questions
                fn = this.getFluQuestions();
                break;
            case 'hd':// Heart Disease Diagnosis
                fn = this.getHeartDiseaseQuestions();
                break;
            case 'mh': // Mental Health Depression Diagnosis
                fn = this.getMentalHealthQuestions();
                break;
            case 'watson': // Watson Discovery
                fn = this.getWatsonQuestions();
                break;
            default:
                break;

        }
        return fn;
    }

    /**
     * Get flu questionnaire metadata
     * 
     * @return An Observable of QuestionBody object
     */
    private getFluQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/flu').map((res) => this.questionMapper.map(res));
    }

    /**
     * Get Heart Disease questionnaire metadata
     * 
     * @return An Observable of QuestionBody object
     */
    private getHeartDiseaseQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/heartdisease').map((res) => this.questionMapper.map(res));
    }
    /**
     * Get Heart Disease questionnaire metadata
     * 
     * @return An Observable of QuestionBody object
     */
    private getMentalHealthQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/mentalhealth').map((res) => this.questionMapper.map(res));
    }

    /**
     * Get Watson questionnaire metadata
     * 
     * @return An Observable of QuestionBody object
     */
    private getWatsonQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/askwatson').map((res) => this.questionMapper.map(res));
    }
}