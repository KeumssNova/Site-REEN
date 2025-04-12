import { useState } from "react";
import "../assets/css/Contact.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
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

        <Header />
      <div className="contact">
        <div className="contact-container">

          <h2>Contactez-nous</h2>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              />
            </div>

            <button type="submit" className="submit-btn">
              Envoyer
            </button>
          </form>

          <div className="contact-info">
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
