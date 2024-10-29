import { MongoClient, Db, Collection } from "mongodb";
import { Chatrooms } from "../../models/Chatrooms";

const con: string | undefined = process.env.CONNECTION_STRING;

if (!con) {
  console.log("No connection string, check your .env file!");
  throw new Error("No connection string");
}

async function connectToDatabase(): Promise<Db> {
  const client: MongoClient = await MongoClient.connect(con as string);
  return client.db("chappy");
}

async function getChatroomsCollection(): Promise<Collection<Chatrooms>> {
  const db = await connectToDatabase();
  return db.collection<Chatrooms>("chatrooms");
}

export { getChatroomsCollection };