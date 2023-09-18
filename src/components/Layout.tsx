import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/layout";
import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../hooks/AuthContextHooks";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";
import { Link as Router } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const Header = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const onSigninClick = () => {
    navigate("/signin");
  };

  const onSignupClick = () => {
    navigate("/signup");
  };

  const onSignoutClick = () => {
    signOut(auth).then(() => {
      navigate("/signin");
    });
  };

  return (
    <Box as="nav" bg="bg-surface" p={4} boxShadow="sm">
      <Flex>
        <HStack px={5}>
          <Link as={Router} to={"/project"} _hover={{ textDecoration: "none" }}>
            <Heading as={"h2"} size={"lg"}>
              Project Board
            </Heading>
          </Link>
        </HStack>
        <Spacer />
        {user ? (
          <HStack>
            <Text>{user.email}</Text>
            <Button variant="ghost" onClick={onSignoutClick}>
              Sign out
            </Button>
          </HStack>
        ) : (
          <HStack>
            <Button variant="ghost" onClick={onSigninClick}>
              Sign in
            </Button>
            <Button variant="ghost" onClick={onSignupClick}>
              Sign up
            </Button>
          </HStack>
        )}
      </Flex>
    </Box>
  );
};
