import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  const userRoles = user.roles || [];
  const isAuthorized =
    allowedRoles.length === 0 ||
    userRoles.some((role) => allowedRoles.includes(role));

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
