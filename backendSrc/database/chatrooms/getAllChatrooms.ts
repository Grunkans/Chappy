import { WithId } from "mongodb";
import { Chatrooms } from "../../models/Chatrooms.js"; 
import { getChatroomsCollection } from "./chatroomsCollection.js";

async function getAllChatrooms(): Promise<WithId<Chatrooms>[]> {
	const col = await getChatroomsCollection();
	
	return await col.find({}).toArray();
	
}

export {getAllChatrooms}