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
import { Navigate } from "react-router";
import { useAuthContext } from "../hooks/AuthContextHooks";
import { schema } from "../utils/schema";
import { createUser } from "../services/user";

export const Signup = () => {
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
    useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
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
    setIsUserNameInvalid(false);
    setIsPasswordInvalid(false);
    setIsConfirmPasswordInvalid(false);

    const email = emailRef.current?.value;
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = passwordRef.current?.value;

    const validateEmail = schema.email.safeParse(email);
    const validateUserName = schema.userName.safeParse(userName);
    const validatePassword = schema.password.safeParse(password);

    if (!email || !validateEmail.success) {
      setIsEmailInvalid(true);
      resetPassword();
      return;
    }
    if (!userName || !validateUserName.success) {
      setIsUserNameInvalid(true);
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

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUser(credential.user.uid, userName);
    } catch (error) {
      alert("登録に失敗しました");
      resetPassword();
      setIsLoading(false);
    }
  };

  return user ? (
    <Navigate to={"/project"} />
  ) : (
    <>
      <Container mt={5}>
        <Heading size={"lg"}>サインアップ</Heading>

        <Box my={3}>
          <form>
            <FormControl isRequired isInvalid={isEmailInvalid} my={3} w={"sm"}>
              <FormLabel>メールアドレス</FormLabel>
              <Input type="email" ref={emailRef} />
              <FormErrorMessage>不正なメールアドレスです</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={isUserNameInvalid}
              my={3}
              w={"sm"}
            >
              <FormLabel>ユーザー名</FormLabel>
              <Input type="text" ref={userNameRef} />
              <FormErrorMessage>
                ユーザー名を32文字以内で入力してください
              </FormErrorMessage>
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
