import { getDirectMessagesCollection } from "./DMCollection.js";
import { DirectMessage } from "../../models/DMs.js";

async function saveDirectMessage (message: DirectMessage): Promise<DirectMessage> {
  const col = await getDirectMessagesCollection();
  const result = await col.insertOne(message);
  return { ...message, _id: result.insertedId };
}


export { saveDirectMessage }