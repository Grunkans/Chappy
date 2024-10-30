import { ObjectId } from "mongodb";

export interface Chatrooms {
	room: string;
	isLocked: boolean;
	_id: ObjectId;
}