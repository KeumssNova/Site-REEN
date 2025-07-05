import { Link } from "react-router-dom";
export default function Conversation() {
  return (
    <div>
        <h2 className="text-bold text-lg mb-10">Conversations</h2>
      <div className="Conversation h-full flex flex-col items-start gap-3">
        <h4 className="opacity-70">Aujourd&apos;hui</h4>
        <ul className="today">
          <li className="transition duration-300 ease-in-out hover:bg-[#8EB897] p-3 rounded-full">
            <Link to="Conversation">Bonjour !</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
