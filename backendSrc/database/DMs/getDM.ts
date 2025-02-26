import { getDirectMessagesCollection } from "./DMCollection.js"; 
import { DirectMessage } from "../../models/DMs.js"; 

async function getDirectMessagesBetween(user1: string, 		
	user2: string): Promise<DirectMessage[]> {
  const col = await getDirectMessagesCollection();
  
  return await col.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 }
    ]
  }).toArray();
}

export { getDirectMessagesBetween }