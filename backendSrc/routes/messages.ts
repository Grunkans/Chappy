import { ObjectId } from "mongodb";
import express, { Router, Request, Response } from 'express'
import { Messages, NewMessageRequest } from '../models/Messages.js'
import { getAllMessages } from '../database/Messages/getAllMessages.js'
import { saveMessage } from '../database/Messages/saveMessage.js'
import { getMessagesCollection } from "../database/Messages/messagesCollection.js";

export const router: Router = express.Router()



router.get("/", async (req: Request, res: Response): Promise<void> => {
	try {
	  const chatroomId = req.query.chatroomId as string;
	  let messages;
	  if (chatroomId) {
		
		const messagesCollection = await getMessagesCollection();
		messages = await messagesCollection
		  .find({ chatroomId: new ObjectId(chatroomId) })
		  .toArray();
	  } else {
		messages = await getAllMessages();
	  }
	  if (!messages || messages.length === 0) {
		res.sendStatus(404);
	  } else {
		res.json(messages);
	  }
	} catch (error) {
	  console.error("Fel vid hämtning av meddelanden:", error);
	  res.sendStatus(500);
	}
  });

  router.get("/chatrooms/:chatroomId/messages", async (req: Request, res: Response) => {
	try {
	  const { chatroomId } = req.params;
	  const messagesCollection = await getMessagesCollection();
	  const messages = await messagesCollection
		.find({ chatroomId: new ObjectId(chatroomId) })
		.toArray();
	  res.json(messages);
	} catch (error) {
	  console.error("Fel vid hämtning av meddelanden för chattrum:", error);
	  res.sendStatus(500);
	}
  });

  router.post(
	"/",
	async (req: Request<{}, {}, NewMessageRequest>, res: Response): Promise<void> => {
	  try {
		const { messageContent, userId, chatroomId } = req.body;
  
		if (!messageContent || !userId || !chatroomId) {
		  res.status(400).json({ error: "Alla fält måste fyllas i." });
		  return;
		}
  
		const chatroomObjectId = new ObjectId(chatroomId);
  
		const newMessage: Messages = {
		  messageContent,
		  userId, 
		  chatroomId: chatroomObjectId,
		  _id: new ObjectId(), 
		};
  
		const savedMessage = await saveMessage(newMessage);
		res.status(201).json(savedMessage);
		return;
	  } catch (error) {
		console.error("Fel vid skickande av meddelande:", error);
		res.sendStatus(500);
		return;
	  }
	}
  );