import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate, useNavigate } from "react-router";
import { useAuthContext } from "../hooks/AuthContextHooks";
import { schema } from "../utils/schema";

export const Signup = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
    useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const resetPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.value = "";
    }
    if (confirmPasswordRef.current) {
      confirmPasswordRef.current.value = "";
    }
  };

  const onSignupClick = async () => {
    setIsEmailInvalid(false);
    setIsPasswordInvalid(false);
    setIsConfirmPasswordInvalid(false);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = passwordRef.current?.value;

    const validateEmail = schema.email.safeParse(email);
    const validatePassword = schema.password.safeParse(password);

    if (!email || !validateEmail.success) {
      setIsEmailInvalid(true);
      resetPassword();
      return;
    }
    if (!password || !validatePassword.success) {
      setIsPasswordInvalid(true);
      resetPassword();
      return;
    }
    if (!confirmPassword || password !== confirmPassword) {
      setIsConfirmPasswordInvalid(true);
      resetPassword();
      return;
    }

    setIsLoading(true);

    setIsEmailInvalid(false);
    setIsPasswordInvalid(false);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/signin");
      })
      .catch(() => {
        alert("登録に失敗しました");
        resetPassword();
      });
    setIsLoading(false);
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
            <FormControl isRequired isInvalid={isEmailInvalid} my={3} w={"sm"}>
              <FormLabel>メールアドレス</FormLabel>
              <Input type="email" ref={emailRef} />
              <FormErrorMessage>不正なメールアドレスです</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={isPasswordInvalid}
              my={3}
              w={"sm"}
            >
              <FormLabel>パスワード</FormLabel>
              <Input type="password" ref={passwordRef} />
              <FormErrorMessage>
                パスワードは8文字以上32文字以下で設定してください
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={isConfirmPasswordInvalid}
              my={3}
              w={"sm"}
            >
              <FormLabel>パスワード再確認</FormLabel>
              <Input type="password" ref={confirmPasswordRef} />
              <FormErrorMessage>パスワードが一致しません</FormErrorMessage>
            </FormControl>
            <Button
              spinner={<Spinner />}
              isLoading={isLoading}
              my={3}
              colorScheme="blue"
              onClick={onSignupClick}
            >
              サインアップ
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};
