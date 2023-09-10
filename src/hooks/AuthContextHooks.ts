import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
