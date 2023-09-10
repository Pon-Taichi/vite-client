import { User, onAuthStateChanged } from "@firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";
import { Spinner } from "@chakra-ui/spinner";
import { Container, Text } from "@chakra-ui/layout";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currnetUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  });

  return (
    <AuthContext.Provider value={{ user: currnetUser, isLoading: isLoading }}>
      {isLoading ? (
        <Container pt={5} justifyContent={"center"}>
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
        </Container>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
