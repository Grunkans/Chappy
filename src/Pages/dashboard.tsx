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
    </div>
  );
}

export default Dashboard;
