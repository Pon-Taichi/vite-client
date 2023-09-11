import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate, useNavigate } from "react-router";
import { useAuthContext } from "../hooks/AuthContextHooks";

export const Signup = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSignupClick = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) return;

    if (password.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/signin");
      })
      .catch(() => {
        alert("登録に失敗しました");
      });
  };

  return user ? (
    <Navigate to={"/project"} />
  ) : (
    <>
      <Container mt={5}>
        <Heading size={"lg"}>サインアップ</Heading>

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
              サインアップ
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};
