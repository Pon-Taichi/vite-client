import { useAuthContext } from "../hooks/AuthContextHooks";
import { Navigate, Outlet } from "react-router";

export const Protected = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/signin" />;
};
