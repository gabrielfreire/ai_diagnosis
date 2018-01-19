import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Question } from './question.model';
import 'rxjs/add/operator/map';
import { QuestionMapper } from './../../../../app/mappers/question-mapper.service';
import { server } from './../../../../app/server.connection';
import { QuestionBody } from './../../../../app/models/questionbody.model';

const SERVER_URL = server.url;
/**
 * Connect to REST API
 */
@Injectable()
export class QuestionService {

    constructor(public http: Http, public questionMapper: QuestionMapper){}

    /**
     * Get flu form questions metadata
     * 
     * TODO separate question mapping logic from http request
     */
    getFluQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/flu').map((res) => this.questionMapper.map(res));
    }

    /**
     * Get Heart Disease form questions metadata
     * 
     * TODO separate question mapping logic from http request
     */
    getHeartDiseaseQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/heartdisease').map((res) => this.questionMapper.map(res));
    }
    /**
     * Get Heart Disease form questions metadata
     * 
     * TODO separate question mapping logic from http request
     */
    getMentalHealthQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/mentalhealth').map((res) => this.questionMapper.map(res));
    }

    /**
     * Get Watson form questions metadata
     * 
     * TODO separate question mapping logic from http request
     */
    getWatsonQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/askwatson').map((res) => this.questionMapper.map(res));
    }
}