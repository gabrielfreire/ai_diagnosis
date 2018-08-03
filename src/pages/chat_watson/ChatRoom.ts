import { ChatUser } from './ChatUser';
import { ChatMessage } from './ChatMessage';
export class ChatRoom {
    users: any;
    messages: ChatMessage[];
    constructor() {
        this.users = {};
        this.messages = [];
    }
    addUser (user: ChatUser) {
        this.users[user.name] = user;
    }
    addMessage (userName: string, message: string): void {
        if(!this.users[userName]) throw "Invalid User";
        this.users[userName].messages.push(message);
        this.messages.push({userName: userName, message: message, time: new Date() });
    }
}