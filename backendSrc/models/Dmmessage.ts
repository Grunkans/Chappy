import { ObjectId } from "mongodb";

export interface Dmmessage {
	message: string;
	fromId: ObjectId;
	toId: ObjectId;

}

//todo, kan lägga till datum, tid