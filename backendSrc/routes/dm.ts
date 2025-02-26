import express, { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { DirectMessage, NewDirectMessageRequest } from "../models/DMs.js";
import { saveDirectMessage } from "../database/DMs/saveDM.js";
import { getDirectMessagesBetween } from "../database/DMs/getDM.js";

export const router: Router = express.Router();


router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { user1, user2 } = req.query;
    if (!user1 || !user2) {
      res.status(400).json({ error: "Båda användarid krävs (user1 och user2)" });
	  return;
    }
    const messages = await getDirectMessagesBetween(user1 as string, user2 as string);
    res.json(messages);
  } catch (error) {
    console.error("Fel vid hämtning av direktmeddelanden:", error);
    res.sendStatus(500);
  }
});


router.post(
  "/",
  async (req: Request<{}, {}, NewDirectMessageRequest>, res: Response): Promise<void> => {
    try {
      const { messageContent, senderId, receiverId } = req.body;
      if (!messageContent || !senderId || !receiverId) {
        res.status(400).json({ error: "Alla fält måste fyllas i" });
		return;
      }
      const newMessage: DirectMessage = {
        messageContent,
        senderId,
        receiverId,
        _id: new ObjectId(),
      };
      const savedMessage = await saveDirectMessage(newMessage);
      res.status(201).json(savedMessage);
    } catch (error) {
      console.error("Fel vid skickande av direktmeddelande:", error);
      res.sendStatus(500);
    }
  }
);
