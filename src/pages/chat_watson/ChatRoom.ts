import { ChatUser } from './ChatUser';
export class ChatRoom {
    users: any = {};
    messages: UserMessage[] = [];
    constructor() {}
    addUser (user: ChatUser) {
        this.users[user.name] = user;
    }
    addMessage (userName: string, message: string): void {
        this.users[userName].messages.push(message);
        this.messages.push({user: userName, message: message });
    }
}
interface UserMessage {
    user?: string;
    message?: string;
}