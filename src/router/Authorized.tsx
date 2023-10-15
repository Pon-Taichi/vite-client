import { useAuthContext } from "../hooks/AuthContextHooks";
import { Navigate, Outlet } from "react-router";

export const Authorized = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/signin" />;
};
