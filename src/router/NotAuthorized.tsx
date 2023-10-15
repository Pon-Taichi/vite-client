import { useAuthContext } from "../hooks/AuthContextHooks";
import { Navigate, Outlet } from "react-router";

export const NotAuthorized = () => {
  const { user } = useAuthContext();
  return user ? <Navigate to="/project" /> : <Outlet />;
};
