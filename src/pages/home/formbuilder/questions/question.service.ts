import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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

    constructor(public http: Http, public questionMapper: QuestionMapper){
        // load('./../../assets/neural_network/output').then(runner => {
        //     console.log('loaded');
        //     console.log(runner.backendName);
        //     console.log(runner.inputs);
        //     console.log(runner.outputs);
        // });
        // traditional JavaScript version
        // WebDNN.load('./../../assets/neural_network/output')
        // .then(function(runner){
        //     console.log('loaded');
        //     console.log(runner.backendName);
        //     console.log(runner.inputs);
        //     console.log(runner.outputs);
        //     // add your code here.
        // });
        
        // WebDNN.Image.getImageArray('./../../assets/imgs/logo.png').then((value) => {
        //   console.log(value);
        // }); // Load image RGB data as Float32Array
        // // runner.inputs[0].set(imageArray); // Write data
    }

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
     * Get flu form questions metadata
     * 
     * TODO separate question mapping logic from http request
     */
    private getFluQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/flu').map((res) => this.questionMapper.map(res));
    }

    /**
     * Get Heart Disease form questions metadata
     * 
     * TODO separate question mapping logic from http request
     */
    private getHeartDiseaseQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/heartdisease').map((res) => this.questionMapper.map(res));
    }
    /**
     * Get Heart Disease form questions metadata
     * 
     * TODO separate question mapping logic from http request
     */
    private getMentalHealthQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/mentalhealth').map((res) => this.questionMapper.map(res));
    }

    /**
     * Get Watson form questions metadata
     * 
     * TODO separate question mapping logic from http request
     */
    private getWatsonQuestions(): Observable<QuestionBody> {
        return this.http.get(SERVER_URL + '/questions/askwatson').map((res) => this.questionMapper.map(res));
    }
}