// Importera och konfigurera
import express, { Express } from 'express'
import { router as chatUsersRouter } from './routes/chatUsers'


const app: Express = express()
const port: number = 3333

// Middleware
app.use('/', express.static('dist/'))

// Router middleware
app.use('/api/users', chatUsersRouter)

// Eventuella routes


// Starta servern
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})
