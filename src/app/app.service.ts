import { Injectable } from "@angular/core";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    listenMessage = this.emitChangeSource.asObservable();
    constructor(){
    }
    // Service message commands
    emitMessage(change: any) {
        this.emitChangeSource.next(change);
    }
}