import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Connexion from './views/Connexion';
import Profil from './views/Profil';
import Actualites from './views/Actualites';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/actualites" element={<Actualites />} />
      </Routes>
    </Router>
  );
}