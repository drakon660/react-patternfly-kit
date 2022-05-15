import { useAuth, useUserNamePassword } from "@app/hooks/useAuth";
import { Alert, LoginForm, LoginPage, PageSection } from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { authUser } from "./authSlice";
import { useAppDispatch } from "@app/store";

const images = {
  lg: 'images/pfbg_2000.jpg',
  sm: 'images/pfbg_768.jpg',
  sm2x: 'images/pfbg_768@2x.jpg',
  xs: 'images/pfbg_576.jpg',
  xs2x: 'images/pfbg_576@2x.jpg'
};

type LoginProps = {
  usernameValue: string,
  passwordValue: string,
  handleUsernameChange: (value: string, event: React.FormEvent<HTMLInputElement>) => void,
  handleLoginButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onChangePassword: (value: string, event: React.FormEvent<HTMLInputElement>) => void,
  isValidPassword: boolean,
  isValidUsername: boolean,
}

const LoginFormExtended = (props: LoginProps) => (
  <LoginForm
    helperTextIcon={<ExclamationCircleIcon />}
    usernameLabel="Username"
    usernameValue={props.usernameValue}
    onChangeUsername={props.handleUsernameChange}
    onLoginButtonClick={props.handleLoginButtonClick}
    passwordValue={props.passwordValue}
    isValidUsername={props.isValidUsername}
    isValidPassword={props.isValidPassword}
    onChangePassword={props.onChangePassword}
    passwordLabel="Password"
    isShowPasswordEnabled
    rememberMeLabel="Keep me logged in for 30 days."
    loginButtonLabel="Log in"
  />
);

const Login = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const userNamePasswordValid = useUserNamePassword();
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isValidPassword, setIsValidPassword] = React.useState<boolean>(true);
  const [isValidUsername, setIsValidUsername] = React.useState<boolean>(true);

  const userNameChange = (value: string) => {
    setName(value);
  }

  const changePassword = (value: string) => {
    setPassword(value);
  }

  function isEmpty(value: string, fn: React.Dispatch<React.SetStateAction<boolean>>): boolean {
    let isValid = value.length > 0;
    fn(isValid);

    return isValid;
  }

  const loginButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event?.preventDefault();

    let isValid = isEmpty(name, setIsValidUsername) && isEmpty(password, setIsValidPassword)

    if (isValid) {
      dispatch(authUser({ UserName: name, Password: password })).then(() => {
        history.push("/support");
      });
    }
  }
  return (
    <>
      <LoginPage
        noValidate={true}
        brandImgAlt="PatternFly logo"
        backgroundImgSrc={images}
        autoComplete="false"
        backgroundImgAlt="Images"
        textContent="This is placeholder text only. Use this area to place any information or introductory message about your application that may be relevant to users."
        loginTitle="Log in to vindu"
        loginSubtitle="Enter your single sign-on LDAP credentials."
      >
        {userNamePasswordValid === false && <Alert variant="danger" title="Wrong user or password" timeout={3000} />}

        <LoginFormExtended isValidPassword={isValidPassword} isValidUsername={isValidUsername} usernameValue={name} handleUsernameChange={userNameChange} handleLoginButtonClick={loginButtonClick} onChangePassword={changePassword} passwordValue={password} />

      </LoginPage>
    </>
  );
}

export { Login };

