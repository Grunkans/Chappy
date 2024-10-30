import { useState } from 'react'
import { Users } from '../data/Users' 

const FactList = () => {
	const [users, setUsers] = useState<Users[]>([])

	const handleGetAll = async () => {
		const response: Response = await fetch('/api/users')
		const data = await response.json()
		
		setUsers(data as Users[])
	}

	return (
		<>
		<button onClick={handleGetAll}> Show users </button>

		{users.map(users => (
			<div key={users._id.toString()} className="users">
				<strong> {users.name} </strong>
			</div>
		))}
		</>
	)
}

export default FactList