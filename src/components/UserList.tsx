import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users } from '../data/Users';
import { useAuth } from '../context/AuthContext';

const Userlist = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();

  const fetchUsers = async () => {
    try {
      const response: Response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data as Users[]);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {users.map((userItem) => (
        <div key={userItem._id.toString()} className="users">
          {user === "000000000000000000000000" ? (
            <span><strong>{userItem.name}</strong></span>
          ) :  
		  (
            <Link to={`/dm/${userItem._id.toString()}`}>
              <strong>{userItem.name}</strong>
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default Userlist;