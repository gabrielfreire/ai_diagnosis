import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { server } from './../../app/server.connection';

const SERVER_URL = server.url;

@Injectable()
export class DiagnosticsService {

    constructor(public http: Http){}
    
    getDiagnostic(input): Observable<any> {
        // HEART DISEASE
        if(input.chol) {
            return this.http.post(SERVER_URL + '/questions/heartdisease/diagnostic', input).map((res: Response) => res.json());
        }
        // WATSON DISCOVERY
        if(input.text) {
            return this.http.post(SERVER_URL + '/questions/discoverwatson', input).map((res: Response) => res.json());
        }
        // MENTAL HEALTH
        if(input.question1) {
            return this.http.post(SERVER_URL + '/questions/mentalhealth/diagnostic', input).map((res: Response) => res.json());
        }
        // FLU 
        return this.http.post(SERVER_URL + '/questions/flu/diagnostic', input).map((res: Response) => res.json());
    }
}