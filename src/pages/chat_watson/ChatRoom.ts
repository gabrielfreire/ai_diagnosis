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
    getUserByName (userName: string): ChatUser {
        for(var key in this.users) {
            if(this.users[key] && this.users[key].name == userName) {
                return this.users[key];
            }
        }
        return null;
    }
    addMessage (userName: string, message: string): void {
        if(!this.users[userName]) throw "Invalid User";
        this.users[userName].messages.push(message);
        this.messages.push({userName: userName, message: message, time: new Date() });
    }
}