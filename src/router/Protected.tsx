import { ReactNode } from "react";
import { useAuthContext } from "../hooks/AuthContextHooks";
import { Navigate } from "react-router";

export const Protected = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/signin" />;
};
