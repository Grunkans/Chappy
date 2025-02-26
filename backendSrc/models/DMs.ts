import { ObjectId } from "mongodb";

export interface DirectMessage {
  _id: ObjectId;
  messageContent: string;
  senderId: string;
  receiverId: string;
}


export interface NewDirectMessageRequest {
  messageContent: string;
  senderId: string;
  receiverId: string;
}
