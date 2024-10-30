import { ObjectId } from "mongodb";

export interface Users {
	name: string;
	areLoggedIn: boolean;
	_id: ObjectId;
}