import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useRef } from "react";
import { Navigate, Link as Router, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthContext } from "../hooks/AuthContextHooks";

export const Signin = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSignupClick = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password)
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/home");
        })
        .catch(() => {
          alert("サインインに失敗しました");
        });
  };

  return user ? (
    <Navigate to={"/home"} />
  ) : (
    <>
      <Container mt={5}>
        <Heading size={"lg"}>ログイン</Heading>

        {/* エラーの時に表示 */}
        {/* <div className="col-6" th:if="${errMsg != null}">
          <p className="alert alert-danger" th:text="${errMsg}"></p>
        </div> */}

        <Box my={3}>
          <form>
            <FormControl my={3} w={"sm"}>
              <FormLabel>Email</FormLabel>
              <Input type="email" ref={emailRef} />
            </FormControl>
            <FormControl my={3} w={"sm"}>
              <FormLabel>Password</FormLabel>
              <Input type="password" ref={passwordRef} />
            </FormControl>
            <Button my={3} colorScheme="blue" onClick={onSignupClick}>
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
