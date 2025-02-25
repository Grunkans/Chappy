import { getMessagesCollection } from "../Messages/messagesCollection.js";
import { Messages } from "../../models/Messages.js";

export async function saveMessage(message: Messages): Promise<Messages> {
  const col = await getMessagesCollection();
  const result = await col.insertOne(message);
  return { ...message, _id: result.insertedId };
}