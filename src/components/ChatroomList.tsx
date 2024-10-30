import { useState } from 'react'
import { Chatrooms } from '../data/Chatrooms' 

const ChatroomList = () => {
	const [chatrooms, setChatrooms] = useState<Chatrooms[]>([])

	const handleGetAll = async () => {
		const response: Response = await fetch('/api/chatrooms')
		const data = await response.json()
		
		setChatrooms(data as Chatrooms[])
	}

	return (
		<>
		<button onClick={handleGetAll}> Show chatrooms </button>

		{chatrooms.map(chatrooms => (
			<div key={chatrooms._id.toString()} className="chatrooms">
				<strong> {chatrooms.room} </strong>
			</div>
		))}
		</>
	)
}

export default ChatroomList