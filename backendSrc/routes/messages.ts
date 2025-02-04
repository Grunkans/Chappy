import express, { Router, Response } from 'express'
import { WithId } from 'mongodb'
import { Messages } from '../models/Messages.js'
import { getAllMessages } from '../database/Messages/getAllMessages.js'

export const router: Router = express.Router()


// Använd "_" som variabelnamn om e
router.get("/", async (_, res: Response<WithId<Messages>[]>) => {
	try {
		const allMessages: WithId<Messages>[] = await getAllMessages()
		console.log("all chatrooms från GET: ",allMessages);
		
		
	if (allMessages.length === 0) {
		res.sendStatus(404);
	  }else {
		  res.send(allMessages)

	  }
	//   res.status(200).json();
	} catch (error) {
	  res.sendStatus(500);
	}
  });