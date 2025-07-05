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
      <Route path="/Politique de Confidentialité" element={<PC />} />
      <Route path="/MentionLegale" element={<MentionLegale />} />

      {/* Route profil accessible à tous les utilisateurs connectés */}
      <Route element={<PrivateRoute allowedRoles={['user', 'admin', 'BOT_MANAGER']} />}>
        <Route path="/profil" element={<Profil />} />
      </Route>

      {/* Routes Ia accessibles à tous les utilisateurs connectés */}
      <Route element={<PrivateRoute allowedRoles={['user', 'admin', 'BOT_MANAGER']} />}>
        <Route path="/Ia" element={<Ia />} />
        <Route path="Ia/Conversation" element={<Conversation />} />
      </Route>

      {/* Route Admin accessible uniquement aux admins et BOT_MANAGER */}
      <Route element={<PrivateRoute allowedRoles={['admin', 'BOT_MANAGER']} />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      {/* Route page accès refusé */}
      {/* <Route path="/unauthorized" element={
        <div className="text-center mt-20 text-red-600 font-semibold text-xl">
          Accès refusé. Vous n'avez pas les permissions nécessaires.
        </div>
      } /> */}
    </Routes>
  )
}