import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({role = "user"}) => {
  const { user } = useAuth();


    console.log('Utilisateur connecté:', user); // Vérification de l'utilisateur
    console.log('Rôles de l\'utilisateur:', user ? user.roles : 'Aucun utilisateur');
  
    // Si l'utilisateur n'est pas connecté ou n'a pas le bon rôle, redirige
    if (!user) {
      return <Navigate to="/connexion" replace />;
    }
  
    // Si l'utilisateur n'a pas le rôle admin (ou BOT_MANAGER), redirige
    if (role && !user.roles.includes(role)) {
      return <Navigate to="/Ia" replace />;
    }
  
    return <Outlet />;
  
  };
