import { useState, useEffect } from 'react'
import { Users } from '../data/Users' 

const Userlist = () => {
	const [users, setUsers] = useState<Users[]>([])

	const fetchUsers = async () => {
		try {
			const response: Response = await fetch('/api/users')
			const data = await response.json()
			setUsers(data as Users[])
		} catch (error) {
			console.error("Failed to fetch chatrooms:", error)
		}
	}

	useEffect(() => {
		fetchUsers() 
	}, [])

	return (
		<>

		{users.map(users => (
			<div key={users._id.toString()} className="users">
				<strong> {users.name} </strong>
			</div>
		))}
		</>
	)
}

export default Userlist