// Importera och konfigurera
import express, { Express } from 'express'
import { router as chatUsersRouter } from './routes/user.js'
import { router as chatroomsRouter } from './routes/chatrooms.js'
import { router as messagesRouter } from './routes/messages.js'

const app: Express = express()
app.use(express.json());
const port: number = Number(process.env.PORT) || 3334

app.use((req, _res, next) => {
    console.log(`🔍 ${req.method} ${req.url}`)
    next()
})

// Middleware
app.use('/', express.static('dist/'))


//loggermiddlewere
app.use('/api/users', chatUsersRouter)
app.use('/api/chatrooms', chatroomsRouter)
app.use('/api/messages', messagesRouter)



// Starta servern
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})
