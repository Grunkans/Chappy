import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


interface Messages {
  _id: string;
  messageContent: string;
  userId: string;
  chatroomId: string;
}

const ChatroomPage = () => {
  const { id } = useParams();
  const { user } = useAuth(); 
  const [messages, setMessages] = useState<Messages[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages?chatroomId=${id}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Misslyckades att hämta meddelanden:", error);
      }
    };

    fetchMessages();
  }, [id]);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
	if (!newMessage.trim()) return;
  
	try {
	  const response = await fetch(`/api/messages`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ 
		  messageContent: newMessage, 
		  userId: user, 
		  chatroomId: id 
		}),
	  });
  
	  if (response.ok) {
		const savedMessage = await response.json();
		setMessages((prevMessages) => [...prevMessages, savedMessage]);
		setNewMessage("");
	  } else {
		console.error("Fel vid skickande av meddelande.");
	  }
	} catch (error) {
	  console.error("Misslyckades att skicka meddelande:", error);
	}
  };

  return (
    <div>
      <h2>Chatt</h2>
      <div>
        {messages.map((msg) => (
          <p key={msg._id}>
            <strong>{msg.userId === user ? "Du" : msg.userId}:</strong> {msg.messageContent}
          </p>
        ))}
      </div>
      <div ref={messagesEndRef} /> 

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Skriv ett meddelande..."
      />
      <button onClick={sendMessage}>Skicka</button>
    </div>
  );
};

export default ChatroomPage;