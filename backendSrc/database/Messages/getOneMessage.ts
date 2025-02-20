import { WithId, ObjectId, FindCursor } from "mongodb";
import { Messages } from "../../models/Messages";
import { getMessagesCollection } from "../Messages/messagesCollection"

async function getOneMessage(id: ObjectId): Promise<WithId<Messages>[]> {
	try {
	  const col = await getMessagesCollection();
	  const filter = { _id: id };
	  const cursor: FindCursor<WithId<Messages>> = col.find(filter);
	  const found: WithId<Messages>[] = await cursor.toArray();
	  if (found.length < 1) {
		console.log("Message found");
	  }
	  return found;
	} catch (error) {
	  console.error("Error fetching user", error);
	  throw error;
	}
  }
  export { getOneMessage };