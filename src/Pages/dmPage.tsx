import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './dmPage.css'

interface DirectMessage {
  _id: string;
  messageContent: string;
  senderId: string;
  receiverId: string;
}

interface User {
	_id: string;
	name: string;
}

const DMPage = () => {
	const { receiverId } = useParams<{ receiverId: string }>();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [messages, setMessages] = useState<DirectMessage[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [receiver, setReceiver] = useState<User | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);


useEffect(() => {
	const fetchReceiver = async () => {
	if (!receiverId) return;
	try {
		const response = await fetch(`/api/users/${receiverId}`);
		const data = await response.json();
			setReceiver(data);
	} catch (error) {
		console.error("Misslyckades att hämta mottagarens uppgifter:", error);
	}
	};
	fetchReceiver();
	}, [receiverId]);


  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !receiverId) return;
      try {
        const response = await fetch(`/api/dms?user1=${user}&user2=${receiverId}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Misslyckades att hämta direktmeddelanden:", error);
      }
    };

    fetchMessages();
  }, [user, receiverId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || !receiverId) return;
    try {
      const response = await fetch(`/api/dms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageContent: newMessage,
          senderId: user,
          receiverId: receiverId,
        }),
      });
      if (response.ok) {
        const savedMessage = await response.json();
        setMessages((prev) => [...prev, savedMessage]);
        setNewMessage("");
      } else {
        console.error("Fel vid skickande av dm.");
      }
    } catch (error) {
      console.error("Misslyckades att skicka dm:", error);
    }
  };

  return (
    <div className="chatroom-page-div">
		<button onClick={() => navigate("/dashboard")}>Tillbaka</button>
      <h2>Direktmeddelanden med {receiver ? receiver.name : receiverId}</h2>
      <div className="chatbox-div">
        {messages.map((msg) => (
          <p key={msg._id}>
            <strong>{msg.senderId === user ? "Du" : msg.senderId}:</strong> {msg.messageContent}
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

export default DMPage;
