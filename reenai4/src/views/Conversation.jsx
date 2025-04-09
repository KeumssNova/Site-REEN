import { useState } from "react";
import "../assets/css/Conversation.css";
import HeaderConnexion from "../components/HeaderConnexion";
import Footer from "../components/Footer";
import HistoriqueIa from "../components/HistoriqueIa";
import { Plus, ArrowUp } from "lucide-react";
const Conversation = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Ajout du message de l'utilisateur
    setMessages([...messages, { sender: "user", text: userInput }]);

    // Réponse du bot après un délai
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Merci pour votre question ! Voici ce que je sais à ce sujet...",
        },
      ]);
    }, 1000);

    setUserInput("");
  };

  return (
    <div className="conversation-container">
      <HeaderConnexion />
      <div className="main">
        <div className="BarreLateral">
          <HistoriqueIa />
        </div>
            <div className="chat-container">
              <div className="chat-box">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    <div className="message-content">{msg.text}</div>
                  </div>
                ))}
              </div>
              <div className="input-area">
                  <textarea
                    className="Chat-input"
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Tapez votre message..."
                  />
                  <div className="form-btn">  
                  <button className="plus-btn">
                    <Plus size={25} />
                  </button>
                  <button onClick={handleSendMessage} className="valider-btn">
                    <ArrowUp size={25} />
                  </button>
                  </div>
              </div>
              {/* <div className="input-area">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Tapez votre message..."
                />
                <button onClick={handleSendMessage}>Envoyer</button>
              </div> */}
            </div>
      </div>
      <Footer />
    </div>
  );
};

export default Conversation;
