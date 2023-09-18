import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Spinner,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { createProject } from "../../services/project";
import { useNavigate } from "react-router-dom";

export const ProjectNew = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isDescriptionInvalid, setIsDescriptionInvalid] = useState(false);

  const onCreateProjectClick = async () => {
    setIsNameInvalid(false);
    setIsDescriptionInvalid(false);
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!name) {
      setIsNameInvalid(true);
      return;
    }

    if (!description) {
      setIsDescriptionInvalid(true);
      return;
    }

    setIsLoading(true);

    // POST
    await createProject({
      name: name,
      description: description,
    }).catch(() => {
      setIsNameInvalid(false);
      return;
    });
    // catchでsetIsNameInvalidの検証
    setIsLoading(false);
    navigate("/project");
  };

  return (
    <>
      <Container mt={5}>
        <Heading size={"lg"}>New Project</Heading>

        <Box my={3}>
          <form>
            <FormControl isRequired isInvalid={isNameInvalid} my={3} w={"sm"}>
              <FormLabel>プロジェクト名</FormLabel>
              <Input type="text" ref={nameRef} />
              {/* 既に存在する名前はNG */}
              <FormErrorMessage>
                適切なプロジェクト名を入力してください
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={isDescriptionInvalid}
              my={3}
              w={"sm"}
            >
              <FormLabel>プロジェクト概要</FormLabel>
              <Textarea ref={descriptionRef} size={"md"} resize={"none"} />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <Button
              spinner={<Spinner />}
              isLoading={isLoading}
              my={3}
              colorScheme="blue"
              onClick={onCreateProjectClick}
            >
              Create
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};
