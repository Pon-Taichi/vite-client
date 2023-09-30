import { User, onAuthStateChanged } from "@firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";
import { Spinner } from "@chakra-ui/spinner";
import { Container, Text, VStack } from "@chakra-ui/layout";
import { api } from "../utils/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currnetUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      const token = await user?.getIdToken();
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        delete api.defaults.headers.common["Authorization"];
      }

      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: currnetUser, isLoading: isLoading }}>
      {isLoading ? (
        <Container pt={5}>
          <VStack>
            <Text fontWeight={"bold"} py={3}>
              Loading...
            </Text>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </VStack>
        </Container>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
