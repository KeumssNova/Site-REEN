import { useState } from "react";
import HeaderConnexion from "../components/HeaderConnexion";
import Footer from "../components/Footer";
import HistoriqueIa from "../components/HistoriqueIa";
import { Plus, ArrowUp } from "lucide-react";
import "../assets/css/Conversation.css";

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
    <div className="conversation-container flex flex-col min-h-screen">
      <HeaderConnexion />
      <div className="main flex flex-grow">
        <div className="BarreLateral flex flex-col items-center w-50 pt-[80px] bg-[#C3E8BD] h-screen sticky top-0">
          <HistoriqueIa />
        </div>
        <div className="chat-container self-center  flex flex-col items-center justify-center w-full h-full p-10 gap-20 ">
          <div className="chat-box p-3 max-w-[600px] w-full overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message mb-2 items-start   ${msg.sender}`}
              >
                <div className="message-content ">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="input-area flex flex-col w-full max-w-[600px] gap-3 justify-between bg-black rounded-[20px] p-3">
            <textarea
              className="Chat-input rounded-[20px] p-3 border-none text-white bg-black outline-none h-full w-full resize-none col-span-2"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Posez votre question..."
            />
            <div className="form-btn flex justify-between items-center p-0 m-0">
              <button className="plus-btn flex justify-center items-center bg-black text-white rounded-full h-auto w-auto p-2 m-0 col-span-1 transition duration-300 ease-in-out hover:bg-[#8EB897]">
                <Plus size={25} />
              </button>
              <button
                onClick={handleSendMessage}
                className="valider-btn flex justify-center items-center bg-black text-white rounded-full h-auto w-auto p-2 m-0 col-span-1 transition duration-300 ease-in-out hover:bg-[#8EB897]"
              >
                <ArrowUp size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Conversation;
