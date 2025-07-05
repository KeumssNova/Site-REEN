import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import HeaderConnexion from "../components/HeaderConnexion";
const Contact = () => {
  const {user} = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
    // Ici vous ajouteriez l'envoi à votre backend
    alert("Message envoyé! Nous vous répondrons bientôt.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>

      {user ? <HeaderConnexion /> : <Header />}
      <div className="contact min-h-screen py-15 px-5 flex flex-col justify-center items-center">
        <div className="contact-container max-w-[37.5rem] w-full p-10 bg-white rounded-lg shadow-lg">

          <h2 className="text-center text-[2rem] mb-10">Contactez-nous</h2>

          <form onSubmit={handleSubmit} className="contact-form flex flex-col items-center w-full">
            <div className="form-group mb-[25px] flex flex-col w-full">
              <label className="mb-2 text-[0.95rem]">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-[#d9d9d9] rounded-md p-2 outline-[#C3E8BD]"
              />
            </div>

            <div className="form-group mb-[25px] flex flex-col w-full">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-[#d9d9d9] rounded-md p-2 outline-[#C3E8BD]"
              />
            </div>

            <div className="form-group mb-[25px] flex flex-col w-full">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="bg-[#d9d9d9] rounded-md p-2 outline-[#C3E8BD]"
              />
            </div>

            <button type="submit" className="submit-btn w-full text-white bg-[#C3E8BD] p-2 rounded-md mb-6  hover:bg-[#8EB897] transition-colors duration-300 ease-in-out cursor-pointer ">
              Envoyer
            </button>
          </form>

          <div className="contact-info text-center">
            <p>Email: novacorporation77@gmail.com</p>
            <p>Téléphone: 01 23 45 67 89</p>
          </div>
        </div>
      </div>
        <Footer/>
    </div>
  );
};

export default Contact;
