import { WithId, ObjectId, FindCursor } from "mongodb";
import { Chatrooms } from "../../models/Chatrooms";
import { getChatroomsCollection } from "../chatrooms/chatroomsCollection"

async function getOneChatroom(id: ObjectId): Promise<WithId<Chatrooms>[]> {
	try {
	  const col = await getChatroomsCollection();
	  const filter = { _id: id };
	  const cursor: FindCursor<WithId<Chatrooms>> = col.find(filter);
	  const found: WithId<Chatrooms>[] = await cursor.toArray();
	  if (found.length < 1) {
		console.log("Chatroom found");
	  }
	  return found;
	} catch (error) {
	  console.error("Error fetching user", error);
	  throw error;
	}
  }
  export { getOneChatroom };