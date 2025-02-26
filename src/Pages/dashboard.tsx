import ChatroomList from "../components/ChatroomList";
import Userlist from "../components/UserList";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";




function Dashboard() {
  const { user, logout } = useAuth();
  const displayName = user === "000000000000000000000000" ? "Gäst" : user;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  const dmText =
    user === "000000000000000000000000" ? "Inloggade personer" : "Skicka direktmeddelande";


  return (
    <div>
		
		<h2>Välkommen, {displayName}!</h2>
		<button onClick={handleLogout}>Logga ut</button>
		<h3>Vilket chattrum vill du hänga i idag?</h3>
		<ChatroomList/>

		<h3>{dmText}</h3>
		<Userlist/>
    </div>

	
  );
}

export default Dashboard;
