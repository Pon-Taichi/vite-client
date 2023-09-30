import { api } from "../utils/api";

export const createUser = async (userId: string, userName: string) => {
  await api.post("/users", { userId: userId, userName: userName });
};
