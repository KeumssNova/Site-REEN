import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, login, error, loading } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/Ia"); // Si l'utilisateur est connecté, rediriger vers la page d'accueil ou une autre page protégée
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success(success.message);
      setTimeout(() => navigate("/IA"), 2000);
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="connexion min-h-screen">
      <Header />
      <div className="connexion-container flex items-center justify-center h-screen">
        <div className="connexion-main w-100 p-3 ">
          <h2 className="text-center mb-10 text-2xl">Connexion</h2>
          <form className="flex flex-col gap-6 items-center" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={loading}
              className="p-3 mb-3 rounded-lg w-full bg-gray-200"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
              disabled={loading}
              className="p-3 mb-3 rounded-lg w-full bg-gray-200"
            />
            {/* {error && <div className="error-message">{error}</div>} */}
            <button type="submit" disabled={loading}   className="p-3 mb-3 rounded-lg w-full bg-[#8EB897] text-white cursor-pointer hover:bg-[#7CBF7A] transition-colors duration-300 ease-in-out active:bg-[#388e3c]">
              {loading ? "Chargement..." : "Se connecter"}
            </button>
            <div className="text-connexion">
              <p>
                Vous n&apos;avez pas de compte ?{" "}
                <Link className="transition-all duration-300 hover:text-[#8EB897]" to="/inscription">Inscription</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}
