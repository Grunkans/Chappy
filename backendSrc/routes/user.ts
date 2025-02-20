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

  router.post("/login", async (req: Request, res: Response): Promise<void> => {
	console.log("🔍 Request Body:", req.body);
	const { name, password } = req.body
	

	try {
		// Hämta alla användare från databasen
		const allUsers: WithId<Users>[] = await getAllUsers()
		console.log("🔍 Alla användare:", allUsers);

		// Kolla om användaren finns i databasen
		const user = allUsers.find(u => u.name === name && u.password === password)

		// Låter användare logga in som "gäst" utan lösenord
		if (user || name.toLowerCase() === "gäst") {
			console.log("✅ Inloggning lyckades:", name); 
			res.json({ name });
			return;

			
		}

		// Om ingen användare hittades → returnera 401
		res.status(401).json({ message: "Fel användarnamn eller lösenord" });
		return;
	} catch (error) {
		console.error("Fel vid inloggning:", error)
		res.status(500).json({ message: "Serverfel" });
		return;
	}
})



