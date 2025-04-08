import { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import HeaderConnexion from "../components/HeaderConnexion";
import Footer from "../components/Footer";
import "../assets/css/Profil.css";

export default function Profil() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  // 🟢 Charger le profil utilisateur
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/user/profile");
        console.log("Données récupérées du profil:", res.data);
        setPseudo(res.data.pseudo || "");
        setEmail(res.data.email || "");
        setPhotoUrl(res.data.photo || "");
      } catch (err) {
        console.error("Erreur chargement profil :", err);
      }
    };

    fetchProfile();
  }, []);

  // 🟢 Gérer l'aperçu de la photo sélectionnée
  useEffect(() => {
    if (newPhoto) {
      const objectUrl = URL.createObjectURL(newPhoto);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // nettoyage
    }
  }, [newPhoto]);

  // 🔵 Gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pseudo", pseudo);
    formData.append("email", email);
    if (newPhoto) formData.append("photo", newPhoto);

    try {
      const res = await axiosInstance.post("/user/profile", formData);
      alert("Profil mis à jour");
      setPhotoUrl(res.data.user.photo); // met à jour l'affichage si la photo change
      setNewPhoto(null);
    } catch (err) {
      console.error("Erreur mise à jour profil :", err);
    }
  };

  // 🔴 Supprimer la photo de profil
  const handleDeletePhoto = async () => {
    try {
      await axiosInstance.delete("/user/profile/photo");
      setPhotoUrl("");
      alert("Photo supprimée");
    } catch (err) {
      console.error("Erreur suppression photo :", err);
    }
  };

  return (
    <div>
      <HeaderConnexion />
      <div className="container">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="top">
              <div className="Photo">
                <img
                  // src="http://localhost:5000/uploads/profile_pictures/photo-1744105704228-428274157.jpg"
                  src={
                    preview ||
                    (photoUrl
                      ? `${`http://localhost:5000${photoUrl}`}`
                      : "/default.jpg")
                  }
                  alt="Photo de profil"
                />
              </div>
              <div className="Btn">
                <div className="changePhotoContainer">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewPhoto(e.target.files[0])}
                  />
                  <label htmlFor="photo" className="changePhotoBtn">
                    Changer la photo
                  </label>
                </div>
                <button type="button" onClick={handleDeletePhoto}>
                  Supprimer la Photo
                </button>
              </div>
            </div>
            <div className="bottom">
              <input
                className="pseudo"
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                placeholder="Pseudo"
              />
              <input
                className="mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <button type="submit">Sauvegarder les changements</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
