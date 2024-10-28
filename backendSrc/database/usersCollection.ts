import { MongoClient, Db, Collection, WithId } from "mongodb";
import { Users } from "../models/Users";

// Obs! CONNECTION_STRING hämtas från .env
const con: string | undefined = process.env.CONNECTION_STRING

async function getUsers(): Promise<WithId<Users>[]> {
	if( !con ) {
		console.log('No connection string, check your .env file!')
		throw new Error('No connection string')
	}

	const client: MongoClient = await MongoClient.connect(con)
	const db: Db = await client.db('users')
	const col: Collection<Users> = db.collection<Users>('users')

	const result: WithId<Users>[] = await col.find({}).toArray()
	return result
}
export { getUsers };