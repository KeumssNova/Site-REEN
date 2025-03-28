import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Connexion from './views/Connexion';
import Profil from './views/Profil';
import Actualites from './views/Actualites';
import Inscription from './views/Inscription';
import Contact from './views/Contact';
import About from './views/About';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/entreprise" element={<About />} />
      </Routes>
    </Router>
  );
}