import express, { Router, Response, Request } from 'express'
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


  router.get("/:id", async (req: Request, res: Response) => {
	try {
	  const { id } = req.params
	  const allUsers: WithId<Users>[] = await getAllUsers()
	  const user = allUsers.find(u => u._id.toString() === id)
	  if (!user) {
		res.sendStatus(404)
		return
	  }
	  res.json(user)
	} catch (error) {
	  console.error("Fel vid hämtning av användare:", error)
	  res.sendStatus(500)
	}
  })


  router.post("/login", async (req: Request, res: Response): Promise<void> => {
	console.log("🔍 Request Body:", req.body);
	const { name, password } = req.body
	

	try {
		const allUsers: WithId<Users>[] = await getAllUsers()
		console.log("🔍 Alla användare:", allUsers);

		const user = allUsers.find(u => u.name === name && u.password === password)

		if (user || name.toLowerCase() === "gäst") {
			console.log("✅ Inloggning lyckades:", name); 
			res.json({ name });
			return;

			
		}

		
		res.status(401).json({ message: "Fel användarnamn eller lösenord" });
		return;
	} catch (error) {
		console.error("Fel vid inloggning:", error)
		res.status(500).json({ message: "Serverfel" });
		return;
	}
})



