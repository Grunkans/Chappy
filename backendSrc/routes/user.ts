import express, { Router, Response } from 'express'
import { WithId } from 'mongodb'
import { Users } from '../models/Users.js'
import { getAllUsers } from '../database/users/getAllUsers.js'

export const router: Router = express.Router()


// Använd "_" som variabelnamn om e
router.get("/", async (_, res: Response<WithId<Users>[]>) => {
	try {
		const allUsers: WithId<Users>[] = await getAllUsers()
		console.log("all users från GET: ",allUsers);
		
	if (allUsers.length === 0) {
		res.sendStatus(404);
	  }else {
		  res.send(allUsers)

	  }
	//   res.status(200).json();
	} catch (error) {
	  res.sendStatus(500);
	}
  });



