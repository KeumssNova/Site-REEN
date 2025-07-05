import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import axios from "axios";
import HeaderConnexion from "../components/HeaderConnexion";
import Footer from "../components/Footer";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [rssFeed, setRssFeed] = useState("");
  const [keyword, setKeyword] = useState("");
  const [link] = useState("");

  // Ajouter un flux RSS
  const handleAddRssFeed = async () => {
    try {
      await axios.post("/api/botConfig/addRssFeed", { rssFeed });
      alert("Flux RSS ajouté");
    } catch (error) {
      alert("Erreur lors de l'ajout du flux RSS");
    }
  };

  // Ajouter un mot-clé
  const handleAddKeyword = async () => {
    try {
      await axios.post("/api/botConfig/addKeyword", { keyword, link });
      alert("Mot-clé ajouté");
    } catch (error) {
      alert("Erreur lors de l'ajout du mot-clé");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors du chargement des utilisateurs"
      );
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la suppression de l'utilisateur"
      );
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await axiosInstance.put(`/admin/users/${userId}/role`, { role });
      fetchUsers(); // Rafraîchissement de la liste après modification
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors du changement de rôle"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [isBotRunning, setIsBotRunning] = useState(false);

  // Fonction pour démarrer le bot
  const handleStartBot = async () => {
    try {
      await axios.post("http://localhost:5000/api/bot/start-bot");
      setIsBotRunning(true); // Indique que le bot est en cours d'exécution
      alert("Bot demarré");
    } catch (error) {
      console.error("Erreur lors du démarrage du bot:", error);
    }
  };

  // Fonction pour arrêter le bot
  const handleStopBot = async () => {
    try {
      await axios.post("http://localhost:5000/api/bot/stop-bot");
      setIsBotRunning(false); // Indique que le bot n'est plus en cours d'exécution
      alert("Bot arrêté");
    } catch (error) {
      console.error("Erreur lors de l'arrêt du bot:", error);
    }
  };

  return (
    <div className="admin-panel">
      <HeaderConnexion />
      <div className="main-admin p-5 m-5">
        {error && <p className="error">{error}</p>}
        <div className="Container p-5 m-[25px auto]">
          <h2 className="text-4xl">Gestion des utilisateurs</h2>
          <div>
            <h3 className="ListeName text-xl font-bold text-[#333] mb-5 text-center">Liste d&apos;utilisateurs</h3>
          </div>
          <div className="Card-User grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-5 mt-5  ">
            {users.map((user) => (
              <div className="User-info bg-white rounded-lg p-5 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]" key={user._id}>
                <div className="card-title flex flex-col items-center mb-4">
                  <h3 className="text-lg font-semibold text-[#333]">
                    {user.pseudo
                      ? user.pseudo
                      : `Utilisateur ${user._id.slice(-4)}`}
                  </h3>
                  <div className="user-photo-admin">
                    <img
                      src={
                        user.photo
                          ? `http://localhost:5000${user.photo}`
                          : "../assets/icons/no-photo.jpg"
                      }
                      alt="Photo de profil"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#8EB897]"
                    />
                  </div>
                  <div className="user-mail flex flex-col items-center mt-2">
                    <h4 className="text-sm text-black">{user.email}</h4> <p>{user.roles}</p>
                  </div>
                </div>
                <div className="card-role mb-2">
                  <p>
                    <caption className="w-15 text-sm mb-1">Role ?</caption>
                  </p>
                  <select
                    value={user.roles[0]}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 text-sm rounded-md border border-[#ddd] bg-[#F4F7FA] w-full  text-black transition-all duration-300 ease-in-out focus:border-[#C3E8BD] outline-0"
                  >
                    <option value="user">user</option>
                    <option value="BOT_MANAGER">BOT_MANAGER</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="delete-btn bg-[#8EB897] text-white rounded-full px-5 py-2 mt-3 hover:bg-[#7CBF7A] transition-colors duration-300 w-full cursor-pointer"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
        <h1 className="bot-part-title text-4xl p-5">Bot</h1>
        <div className="Bot-container flex flex-col items-center p-5 rounded-lg shadow-lg bg-white max-w-[300px] mx-auto">
          <h2 className="text-2xl mb-5 text-center">Gestion du bot</h2>
          <button
            onClick={handleStartBot}
            disabled={isBotRunning}
            className="bot-btn start-btn flex items-center justify-center bg-[#8EB897] text-white rounded-full px-5 py-2 mb-3 hover:bg-[#7CBF7A] transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="lucide lucide-play-circle mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M11 8l-6 4V4z" />
            </svg>
            Démarrer le bot
          </button>
          <button
            onClick={handleStopBot}
            disabled={!isBotRunning}
            className="bot-btn stop-btn flex items-center justify-center  bg-gray-500 text-white rounded-full px-5 py-2 mb-3 hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="lucide lucide-stop-circle mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            </svg>
            Arrêter le bot
          </button>
          <div className="Manager-bot">
          <form className=" p-6 rounded-lg">
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-xl mb-3 text-center">Ajouter un Flux RSS</h2>
              <input
                type="text"
                value={rssFeed}
                onChange={(e) => setRssFeed(e.target.value)}
                placeholder="URL du Flux RSS"
                className="w-full p-3 mx-5 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8EB897] transition duration-300"
              />
              <button className="w-full p-3 bg-[#8EB897] text-white border-none rounded-md cursor-pointer  hover:bg-[#7CBF7A] transition-color duration-300 ease-in-out active:bg-[#388e3c]" onClick={handleAddRssFeed}>Ajouter</button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <h2 className="text-xl mb-3 text-center">Ajouter un Mot-clé</h2>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Mot-clé"
                className="w-full p-3 mx-5 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8EB897] transition duration-300"
              />
              <button className="w-full p-3 bg-[#8EB897] text-white border-none rounded-md cursor-pointer  hover:bg-[#7CBF7A] transition-color duration-300 ease-in-out active:bg-[#388e3c]" onClick={handleAddKeyword}>Ajouter</button>
            </div>
          </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
