import { ViewChild, NgZone, Component, OnInit } from "@angular/core";
import { Socket } from 'ng-socket-io';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.html',
    styles: ['./chat.scss']
})
export class ChatPage implements OnInit{
    @ViewChild('content') content:any;
    messages;
    zone;
    chatBox;
    constructor(private socket: Socket) { }

    ngOnInit(){
        //start watson chat
        this.messages = [];
        this.zone = new NgZone({enableLongStackTrace: false});
        this.socket.connect();
        this.chatBox = "";
        this.socket.on("chat_message", (msg) => {
            this.zone.run(() => {
                this.messages.push('<strong>Dr. Watson:</strong><br> ' + msg);
                setTimeout(() => {
                    if(this.content._scroll){
                        this.content.scrollToBottom();
                    }
                },300);
            });
        });
        this.socket.on('disconnect', () => {
            // TODO SOMETHING
        });
    }

    ionViewDidLeave(){
        this.socket.disconnect();
    }
    
    send(message) {
        if(message && message != "") {
            this.zone.run(() => {
                this.messages.push('<strong>You: </strong><br>' + message);
                setTimeout(() => {
                    if(this.content._scroll){
                        this.content.scrollToBottom();
                    }
                },300);
            });
            this.socket.emit("chat_message", message);
        }
        this.chatBox = "";
    }
    
}