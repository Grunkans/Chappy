import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginForm from "./components/LoginForm";
import Dashboard from "./Pages/dashboard";
import ChatroomPage from "./Pages/chatroomPage";  
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <header>
          <h1>Chappy</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chatroom/:id" element={<ChatroomPage />} />  
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
