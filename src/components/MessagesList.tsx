import { useState, useEffect } from 'react'
import { Messages } from '../data/Messages' 

const MessagesList = () => {
	const [messages, setMessages] = useState<Messages[]>([])

	const fetchMessages = async () => {
		try {
			const response: Response = await fetch('/api/messages')
			const data = await response.json()
			setMessages(data as Messages[])
		} catch (error) {
			console.error("Failed to fetch messages:", error)
		}
	}

	useEffect(() => {
		fetchMessages()  
	}, [])

	return (
		<>
		<h1>WHATTSUP</h1>

		{messages.map(messages => (
			<div key={messages._id.toString()} className="messages">
				<strong> {messages.messageContent} </strong>
			</div>
		))}
		</>
	)
}

export default MessagesList