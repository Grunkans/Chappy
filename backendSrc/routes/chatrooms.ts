import express, { Router, Response } from 'express'
import { WithId } from 'mongodb'
import { Chatrooms } from '../models/Chatrooms.js' 
import { getAllChatrooms } from '../database/chatrooms/getAllChatrooms.js'

export const router: Router = express.Router()


// Använd "_" som variabelnamn om e
router.get("/", async (_, res: Response<WithId<Chatrooms>[]>) => {
	try {
		const allChatrooms: WithId<Chatrooms>[] = await getAllChatrooms()
		console.log("all chatrooms från GET: ",allChatrooms);
		
		
	if (allChatrooms.length === 0) {
		res.sendStatus(404);
	  }else {
		  res.send(allChatrooms)

	  }
	//   res.status(200).json();
	} catch (error) {
	  res.sendStatus(500);
	}
  });