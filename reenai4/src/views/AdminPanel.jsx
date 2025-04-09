import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import axios from "axios";
import HeaderConnexion from "../components/HeaderConnexion";
import Footer from "../components/Footer";
import "../assets/css/admin.css";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

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
      <div className="main-admin">
        {error && <p className="error">{error}</p>}
        <div className="Container">
          <h2>Gestion des utilisateurs</h2>
          <div>
            <h3 className="ListeName">Liste d'utilisateurs</h3>
          </div>
          <div className="Card-User">
            {users.map((user) => (
              <div className="User-info" key={user._id}>
                <div className="card-title">
                  <h3>
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
                    />
                  </div>
                  <div className="user-mail">
                    <h4>{user.email}</h4> <p>{user.roles}</p>
                  </div>
                </div>
                <div className="card-role">
                  <caption>Role ?</caption>
                  <select
                    value={user.roles[0]}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="BOT_MANAGER">BOT_MANAGER</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="delete-btn"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="Bot-container">
          <h2>Gestion du bot</h2>
          <button
            onClick={handleStartBot}
            disabled={isBotRunning}
            className="bot-btn start-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="lucide lucide-play-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 8l-6 4V4z" />
            </svg>
            Démarrer le bot
          </button>
          <button
            onClick={handleStopBot}
            disabled={!isBotRunning}
            className="bot-btn stop-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="lucide lucide-stop-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            </svg>
            Arrêter le bot
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
