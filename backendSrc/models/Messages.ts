import { ObjectId } from "mongodb";

export interface Messages {
	messageContent: string;
	userId: string;
	chatroomId: ObjectId;
	_id: ObjectId;

}

export interface NewMessageRequest {
	messageContent: string;
	userId: string; 
	chatroomId: string; 
  }
  