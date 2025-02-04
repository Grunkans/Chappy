import { useState, useEffect } from 'react'
import { Chatrooms } from '../data/Chatrooms' 

const ChatroomList = () => {
	const [chatrooms, setChatrooms] = useState<Chatrooms[]>([])

	const fetchChatrooms = async () => {
		try {
			const response: Response = await fetch('/api/chatrooms')
			const data = await response.json()
			setChatrooms(data as Chatrooms[])
		} catch (error) {
			console.error("Failed to fetch chatrooms:", error)
		}
	}

	useEffect(() => {
		fetchChatrooms()  
	}, [])

	return (
		<>
		

		{chatrooms.map(chatrooms => (
			<div key={chatrooms._id.toString()} className="chatrooms">
				<strong> {chatrooms.room} </strong>
			</div>
		))}
		</>
	)
}

export default ChatroomList