import ChatroomList from "../components/ChatroomList";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <div>
		
      <h2>Välkommen, {user}!</h2>
      <button onClick={handleLogout}>Logga ut</button>
	  <h3>Vilket chattrum vill du hänga i idag?</h3>
	  <ChatroomList/>
    </div>

	
  );
}

export default Dashboard;
