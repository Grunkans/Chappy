// Importera och konfigurera
import express, { Express } from 'express'
import { router as chatUsersRouter } from './routes/user.js'

const app: Express = express()
const port: number = 3334

// Middleware
app.use('/', express.static('dist/'))

// Router middleware
app.use('/api/users', chatUsersRouter)



// Starta servern
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})
