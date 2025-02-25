import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Chatrooms {
  _id: string;
  room: string;
  isLocked: boolean;
}

const ChatroomList = () => {
  const [chatrooms, setChatrooms] = useState<Chatrooms[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        const response = await fetch("/api/chatrooms");
        const data = await response.json();
        setChatrooms(data);
      } catch (error) {
        console.error("Failed to fetch chatrooms:", error);
      }
    };

    fetchChatrooms();
  }, []);

  
  const visibleChatrooms = chatrooms.filter((chatroom) => {
	
	if (!user || user === "000000000000000000000000") {
	  return !chatroom.isLocked;
	}
	return true;

	
  });
  return (
    <div>
      <h2>Chattrum</h2>
      {visibleChatrooms.map((chatroom) => (
        <div key={chatroom._id} className="chatroom">
          <Link to={`/chatroom/${chatroom._id}`}>
            <strong>{chatroom.room}</strong> {chatroom.isLocked ? "🔒" : "🟢"}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChatroomList;