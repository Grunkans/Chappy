import { WithId } from "mongodb";
import { Messages } from "../../models/Messages.js";
import { getMessagesCollection } from "../Messages/messagesCollection.js"

async function getAllMessages(): Promise<WithId<Messages>[]> {
	const col = await getMessagesCollection();
	
	return await col.find({}).toArray();
	
}

export {getAllMessages}