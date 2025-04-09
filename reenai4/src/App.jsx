import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Connexion from './views/Connexion'
import Profil from './views/Profil'
import Inscription from './views/Inscription'
import Contact from './views/Contact'
import About from './views/About'
import { PrivateRoute } from './routes/PrivateRoute'
import Ia from './views/Ia'
import AdminPanel from './views/AdminPanel'
import NewsList from './views/NewsList'
import PC from './views/PC'
import MentionLegale from './views/MentionLegale'
import Conversation from './views/Conversation'

export default function App() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/entreprise" element={<About />} />
      <Route path="/News" element={<NewsList />} />
      <Route path="/Privacy" element={<PC />} />
      <Route path='/MentionLegale' element={<MentionLegale/>} />

      {/* Routes protégées */}
      <Route element={<PrivateRoute />}>
        <Route path="/profil" element={<Profil />} />
        <Route path="/Ia" element={<Ia />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="Ia/Conversation" element={<Conversation />} />
      </Route>
    </Routes>
  )
}