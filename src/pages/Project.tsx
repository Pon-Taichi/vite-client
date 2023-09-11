import { Box, Container, Heading, Text } from "@chakra-ui/layout";
import { useAuthContext } from "../hooks/AuthContextHooks";

export const Project = () => {
  const { user } = useAuthContext();

  return (
    <Container mt={5}>
      <Heading size={"lg"}>ホーム</Heading>
      <Box my={3}>
        <Text>ログイン中のユーザー: {user?.email}</Text>
      </Box>
    </Container>
  );
};
