import { MongoClient, Db, Collection } from "mongodb";
import { DirectMessage } from "../../models/DMs.js";

const con: string | undefined = process.env.CONNECTION_STRING;
if (!con) {
  console.error("No connection string, check your .env file!");
  throw new Error("No connection string");
}

async function connectToDatabase(): Promise<Db> {
  const client = await MongoClient.connect(con as string);
  return client.db("chappy");
}

async function getDirectMessagesCollection(): Promise<Collection<DirectMessage>> {
  const db = await connectToDatabase();
  return db.collection<DirectMessage>("directMessages");
}

export { getDirectMessagesCollection }