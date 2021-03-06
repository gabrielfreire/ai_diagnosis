import { ViewChild, NgZone, Component, OnInit, ElementRef } from "@angular/core";
import { Content, NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { ChatUser } from './ChatUser';
import { ChatRoom } from './ChatRoom';
@Component({
    selector: 'app-chat',
    templateUrl: 'chat.html',
    styles: ['./chat.scss']
})
export class ChatPage implements OnInit{
    @ViewChild('content') content: Content;
    @ViewChild('chat_input') messageInput: ElementRef;
    chatRoom: ChatRoom = new ChatRoom();
    zone: NgZone;
    chatBox: string;
    constructor(private socket: Socket, private navController:NavController) { }

    ngOnInit(){
        //start watson chat
        this.chatRoom.addUser(new ChatUser('bot'));
        this.chatRoom.addUser(new ChatUser('user'));
        this.zone = new NgZone({enableLongStackTrace: false});
        this.socket.connect();
        this.chatBox = "";
        this.socket.on("chat_message", (msg) => {
            this.zone.run(() => {
                this.chatRoom.addMessage('bot', `${msg}`);
                this.focus();
                setTimeout(() => {
                    if(this.content._scroll){
                        this.content.scrollToBottom();
                    }
                },300);
            });
        });
        this.socket.on('disconnect', () => {
            // TODO SOMETHING
            console.warn('Disconnected from socket');
            setTimeout(() => this.navController.pop(), 1300);
        });
    }

    ionViewDidLeave(): void {
        this.socket.disconnect();
    }
    
    send(): void {
        if(this.chatBox == '') return;
        let message = this.chatBox.trim();
        this.zone.run(() => {
            this.chatRoom.addMessage('user', `${message}`);
            setTimeout(() => {
                if(this.content._scroll){
                    this.content.scrollToBottom();
                }
            },300);
        });
        this.socket.emit("chat_message", message);
        
        this.chatBox = "";
    }
    onFocus(): void {
        this.content.resize();
        this.content.scrollToBottom();
    }
    private focus(): void {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    }
    
}