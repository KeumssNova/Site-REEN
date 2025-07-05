import { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import HeaderConnexion from "../components/HeaderConnexion";
import Footer from "../components/Footer";
import { LuUser } from "react-icons/lu";
import { IoMailSharp } from "react-icons/io5";

export default function Profil() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  //  Charger le profil utilisateur
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

  //  Gérer l'aperçu de la photo sélectionnée
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

  //  Supprimer la photo de profil
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
      <div className="h-screen flex items-center justify-center">
        <div className="card bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl">
          <form onSubmit={handleSubmit}>
            <div className="top flex items-center gap-5">
              <div className="Photo ">
                <img
                  // src="http://localhost:5000/uploads/profile_pictures/photo-1744105704228-428274157.jpg"
                  src={
                    preview ||
                    (photoUrl
                      ? `${`http://localhost:5000${photoUrl}`}`
                      : "/default.jpg")
                  }
                  alt="Photo de profil"
                  className="w-32 h-32 rounded-lg object-cover mb-4 overflow-hidden flex jusrify-center items-center"
                />
              </div>
              <div className="Btn flex items-center gap-5">
                <div className="px-4 bg-[#C3E8BD] p-2 rounded-full flex flex-col items-center gap-2 hover:bg-[#8EB897] transition-colors duration-300 ease-in-out cursor-pointer">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewPhoto(e.target.files[0])}
                    className="hidden "
                  />
                  <label
                    htmlFor="photo"
                    className="changePhotoBtn text-white cursor-pointer"
                  >
                    Changer la photo
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleDeletePhoto}
                  className=" px-4 text-white bg-[#C3E8BD] p-2 rounded-full flex flex-col items-center gap-2 hover:bg-[#8EB897] transition-colors duration-300 ease-in-out cursor-pointer"
                >
                  Supprimer la Photo
                </button>
              </div>
            </div>
            <div className="bottom flex flex-col gap-5">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-4 h-6 ">
                  <LuUser size={24} />
                </div>

                <input
                  className="pseudo pl-11 w-80 bg-[#d9d9d9] rounded-lg p-2  outline-[#8EB897]"
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  placeholder="Pseudo"
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-4 h-6 ">
                  <IoMailSharp size={24} />
                </div>
                <input
                  className="mail pl-11 w-80 bg-[#d9d9d9] rounded-lg p-2 outline-[#8EB897] "
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <button
                type="submit"
                className=" text-white bg-[#C3E8BD] p-2 rounded-full flex flex-col items-center hover:bg-[#8EB897] transition-colors duration-300 ease-in-out cursor-pointer"
              >
                Sauvegarder les changements
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
