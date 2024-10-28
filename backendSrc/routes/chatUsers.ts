import express, { Router, Response } from 'express'
import { getUsers } from '../database/usersCollection.js'
import { WithId } from 'mongodb'
import { Users } from '../models/Users.js'

const router: Router = express.Router()


// Använd "_" som variabelnamn om e
router.get('/', async (_, res: Response) => {
	const Users: WithId<Users>[] = await getUsers()
	// Om ett Error kastas kommer Express fånga det och svara med statuskod 500
	res.send(Users)
})

export { router }