import { Button } from "@chakra-ui/button";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/layout";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/AuthContextHooks";

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const onSignoutClick = () => {
    signOut(auth).then(() => {
      navigate("/signin");
    });
  };

  return (
    <Container mt={5}>
      <Heading size={"lg"}>ホーム</Heading>
      <Box my={3}>
        <Text>ログイン中のユーザー: {user?.email}</Text>
        <Stack>
          <Button colorScheme="blue" onClick={onSignoutClick}>
            サインアウト
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
