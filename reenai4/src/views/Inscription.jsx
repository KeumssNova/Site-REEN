import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext"; // Assurez-vous que c'est le bon chemin
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Récupérez bien toutes les valeurs du contexte
  const { register, error, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      // Vérifiez que register existe avant de l'appeler
      if (typeof register !== "function") {
        throw new Error("La fonction register n'est pas disponible");
      }

      const success = await register(email, password);
      if (success) {
        toast.success(success.message);
        setTimeout(() => navigate("/connexion"), 2000); // Redirection après 2s
      } else {
        toast.error(error);
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err);
    }
  };

  return (
    <div className="inscription min-h-screen">
      <Header />
      <div className="inscription-container flex items-center justify-center h-screen">
        <div className="inscription-main w-100 p-3">
          <h2 className="text-center mb-10 text-2xl">Inscription</h2>
          <form
            className="flex flex-col gap-6 items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="form-group w-full">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
                required
                disabled={loading} 
                className="p-3 mb-3 rounded-lg w-full bg-gray-200"
              />
            </div>
            <div className="form-group w-full">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
                disabled={loading}
                className="p-3 mb-3 rounded-lg w-full bg-gray-200"
              />
            </div>
            <div className="form-group w-full">
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez votre mot de passe"
                required
                disabled={loading}
                className="p-3 mb-3 rounded-lg w-full bg-gray-200"
              />
            </div>
            {/* {error && <div className="error-message">{error}</div>} */}
            <button type="submit" disabled={loading} className="p-3 mb-3 rounded-lg w-full bg-[#8EB897] text-white cursor-pointer hover:bg-[#7CBF7A] transition-colors duration-300 ease-in-out active:bg-[#388e3c]">
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </form>
          <p className="login-link text-center ">
            Déjà inscrit ? <Link className="transition-all duration-300 hover:text-[#8EB897]" to="/connexion">Connectez-vous ici</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}
