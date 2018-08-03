export interface ChatMessage {
    message?: string;
    userId?: string;
    userName?: string;
    toUserId?: string;
    time?: Date;
    status?: string;
}