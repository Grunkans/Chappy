
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";import './App.css'
import LoginForm from "./components/LoginForm";
import Dashboard from "./Pages/dashboard";
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
			</Routes>
		  </main>
		</Router>
	  </AuthProvider>
	);
  }
  
  export default App;
