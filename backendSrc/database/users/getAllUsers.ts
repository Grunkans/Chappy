import { WithId } from "mongodb";
import { Users } from "../../models/Users.js";
import { getUsersCollection } from "../usersCollection.js";

async function getAllUsers(): Promise<WithId<Users>[]> {
	const col = await getUsersCollection();
	
	return await col.find({}).toArray();
	
}

export {getAllUsers}