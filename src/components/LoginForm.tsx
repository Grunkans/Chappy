import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChatroomList from "./ChatroomList";

function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

	  if (!response.ok) {
        throw new Error("Inloggning misslyckades");
      }

	  
  

      if (response.ok) {
		console.log("🔄 Uppdaterar auth state med:", data.name);
        login(data.name); 
		navigate("/dashboard");
      } else {
        alert(data.message || "Fel användarnamn eller lösenord!");
      }
    } catch (error) {
      alert("Något gick fel! Försök igen senare.");
    }
    setLoading(false);
  };

  const handleGuestLogin = () => {
    login("Gäst");
	navigate("/dashboard");
  };

  return (
    <div>
      <h2>Logga in</h2>
      <input
        type="text"
        placeholder="Användarnamn"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Loggar in..." : "Logga in"}
      </button>
      <button onClick={handleGuestLogin}>Logga in som Gäst</button>

	  <div>
		<h3>Välkommen in och hitta nya kompisar!</h3>
		<ChatroomList/>
	  </div>
    </div>
  );
}

export default LoginForm;
