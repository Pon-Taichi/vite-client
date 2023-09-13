import { Box, Container, Text, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export const LoadingWithOverlay = ({ isLoading, message }: LoadingProps) => {
  return (
    <>
      <Box
        visibility={isLoading ? "visible" : "hidden"}
        position={"absolute"}
        left={0}
        top={0}
        w={"100%"}
        minH={"100vh"}
        bgColor={"gray.100"}
        opacity={0.5}
        zIndex={1000}
      >
        <Container pt={5}>
          <VStack>
            <Text fontWeight={"bold"} py={3}>
              {message}
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
      </Box>
    </>
  );
};

type LoadingProps = {
  isLoading: boolean;
  message: string;
};
