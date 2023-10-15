import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useRef, useState } from "react";
import { Navigate, Link as Router, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthContext } from "../hooks/AuthContextHooks";
import { schema } from "../utils/schema";

export const Signin = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSigninClick = async () => {
    setIsEmailInvalid(false);
    setIsPasswordInvalid(false);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const validateEmail = schema.email.safeParse(email);

    if (!email || !validateEmail.success) {
      setIsEmailInvalid(true);
      return;
    }
    if (!password) {
      setIsPasswordInvalid(true);
      return;
    }

    setIsLoading(true);
    setIsEmailInvalid(false);
    setIsPasswordInvalid(false);

    try {
      await signInWithEmailAndPassword(auth, email!, password!);
      navigate("/project");
    } catch (error) {
      alert("サインインに失敗しました");
    }

    setIsLoading(false);
  };

  return user ? (
    <Navigate to={"/project"} />
  ) : (
    <>
      {/* <LoadingWithOverlay message={messages.login} isLoading={isLoading} /> */}
      <Container mt={5}>
        <Heading size={"lg"}>ログイン</Heading>

        {/* エラーの時に表示 */}
        {/* <div className="col-6" th:if="${errMsg != null}">
          <p className="alert alert-danger" th:text="${errMsg}"></p>
        </div> */}

        <Box my={3}>
          <form>
            <FormControl isInvalid={isEmailInvalid} my={3} w={"sm"}>
              <FormLabel>Email</FormLabel>
              <Input type="email" ref={emailRef} />
              <FormErrorMessage>不正なメールアドレスです</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={isPasswordInvalid} my={3} w={"sm"}>
              <FormLabel>Password</FormLabel>
              <Input type="password" ref={passwordRef} />
              <FormErrorMessage>パスワードを入力してください</FormErrorMessage>
            </FormControl>
            <Button
              spinner={<Spinner />}
              isLoading={isLoading}
              my={3}
              colorScheme="blue"
              onClick={onSigninClick}
            >
              ログイン
            </Button>
          </form>
        </Box>
        <Link as={Router} to="/signup">
          <Text>ユーザー登録はこちらから</Text>
        </Link>
      </Container>
    </>
  );
};
