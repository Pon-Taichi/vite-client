import { User } from "@firebase/auth";
import { createContext } from "react";

export const AuthContext = createContext<AppContext>({
  user: null,
  isLoading: false,
});

type AppContext = {
  user: User | null;
  isLoading: boolean;
};
