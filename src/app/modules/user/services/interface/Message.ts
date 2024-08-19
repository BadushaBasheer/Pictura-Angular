export interface Message {
    id: number;
    content: string;
    senderId: number;
    chatId: number;
    timeStamp: string | Date;
    isOutgoing: boolean;
}
