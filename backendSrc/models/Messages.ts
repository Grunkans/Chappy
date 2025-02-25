import { ObjectId } from "mongodb";

export interface Messages {
	messageContent: string;
	userId: ObjectId;
	chatroomId: ObjectId;
	_id: ObjectId;

}

export interface NewMessageRequest {
	messageContent: string;
	userId: string; 
	chatroomId: string; 
  }
  