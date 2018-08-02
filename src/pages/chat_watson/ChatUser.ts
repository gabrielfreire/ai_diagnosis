export class ChatUser {
    name: string;
    messages: string[];
    constructor(name) {
        this.name = name;
        this.messages = [];
    }
}