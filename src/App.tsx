import './App.css'
import UserList from './components/UserList'
import ChatroomList from './components/ChatroomList'
import MessagesList from './components/MessagesList'


function App() {
  

	return (
	  <div>
	  <header>
		<header/>
	  <h1> Chappy </h1>
	
	</header>
	<main>
	<nav>
		<ul>
			<li> Chattrum </li>
			<ChatroomList/>
			<li title="Direktmeddelanden"> Se vilka som är här </li>  
			
			<UserList/>
		</ul>
	</nav>
	<div className="chat-area">
		<section className="heading">
			Chattar i <span className="chat-name"> #grupp2 </span>
		</section>
	<section className="history">
		
		<section className="align-right">
		<MessagesList/>
		</section>
		
	</section>
	<section>
		<input type="text" placeholder="Ditt meddelande..." />
		<button> Skicka </button>
	</section>
	</div>	
	</main>
	  </div>
	
  )
}

export default App
