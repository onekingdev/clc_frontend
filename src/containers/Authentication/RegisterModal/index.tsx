import React, { useEffect, useState } from "react";
// @ts-ignore
import { connect } from "react-redux";
import "./styles.css";
import { validateEmail } from "../../../helpers/validations";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import ErrorDisplay from "../../../components/ErrorDisplay";
import SubtitleText from "../../../components/SubtitleText";
import {Role} from "../../../helpers/constants";

import {
  emptyEmailString,
  invalidEmailString,
  notFoundEmailString,
  emptyPasswordString,
  emptyActivationCode,
  emptyUserName,
  passwordsDoNotMatch,
  // @ts-ignore
} from "../../../helpers/constants";
import { Simulate } from "react-dom/test-utils";
import SmallText from "../../../components/SmallText";
import { IUser } from "../interfaces";
import * as ACTIONS from "../store/actions";
import { formatMessageCode } from "../../../helpers/formatter";
// @ts-ignore
import { useHistory } from "react-router-dom";

interface IRegisterModal {
  reset: boolean;
  register: (data: IUser, callback: (success: boolean) => void) => void;
  clearAuthenticationData: () => void;
  messageCode: number | string;
  isFetchingAuthentication: boolean;
}

const RegisterModal: React.FC<IRegisterModal> = ({
  reset,
  register,
  clearAuthenticationData,
  messageCode,
  isFetchingAuthentication,
}) => {
  const history = useHistory();
  const [activationCodeObj, setActivationCodeObj] = useState({
    activationCode: "",
    error: false,
  });
  const [usernameObj, setUsernameObj] = useState({
    username: "",
    error: false,
  });
  const [passwordObj, setPasswordObj] = useState({
    password: "",
    error: false,
  });
  const [verifyPasswordObj, setVerifyPasswordObj] = useState({
    verifyPassword: "",
    error: false,
  });
  const [emailObj, setEmailObj] = useState({ email: "", error: false });
  const [showErrorMsg, setShowErrorMsg] = useState("");

  useEffect(() => {
    setActivationCodeObj({ activationCode: "", error: false });
    setUsernameObj({ username: "", error: false });
    setPasswordObj({ password: "", error: false });
    setVerifyPasswordObj({ verifyPassword: "", error: false });
    setEmailObj({ email: "", error: false });
    setShowErrorMsg("");
    clearAuthenticationData();
  }, [reset]);

  useEffect(() => {
    if (
      !emailObj.error &&
      // !activationCodeObj.error &&
      !usernameObj.username &&
      !passwordObj.error &&
      !verifyPasswordObj.error
    ) {
      setShowErrorMsg("");
    }
  }, [
    emailObj.error,
    activationCodeObj.error,
    usernameObj.error,
    passwordObj.error,
    verifyPasswordObj.error,
  ]);

  useEffect(() => {
    if (messageCode) {
      setShowErrorMsg(formatMessageCode(messageCode));
    }
  }, [messageCode]);

  const handleSubmit = () => {
    // if (activationCodeObj.activationCode === "") {
    //   setActivationCodeObj({
    //     activationCode: activationCodeObj.activationCode,
    //     error: false,
    //   });
    //   setShowErrorMsg(emptyActivationCode);
    if (usernameObj.username === "") {
      setUsernameObj({ username: usernameObj.username, error: true });
      setShowErrorMsg(emptyUserName);
    } else if (passwordObj.password === "") {
      setPasswordObj({ password: passwordObj.password, error: true });
      setShowErrorMsg(emptyPasswordString);
    } else if (
      verifyPasswordObj.verifyPassword === "" ||
      passwordObj.password !== verifyPasswordObj.verifyPassword
    ) {
      setPasswordObj({ password: passwordObj.password, error: true });
      setVerifyPasswordObj({
        verifyPassword: verifyPasswordObj.verifyPassword,
        error: true,
      });
      setShowErrorMsg(passwordsDoNotMatch);
    } else if (emailObj.email === "") {
      setEmailObj({ email: emailObj.email, error: true });
      setShowErrorMsg(emptyEmailString);
    } else if (!validateEmail(emailObj.email)) {
      setEmailObj({ email: emailObj.email, error: true });
      setShowErrorMsg(invalidEmailString);
    } else {
      // setShowErrorMsg(notFoundEmailString);

      const request = {
        activationCode: activationCodeObj.activationCode || Role.Free,
        userName: usernameObj.username,
        password: passwordObj.password,
        email: emailObj.email,
      };

      register(request, (success) => {
        if (success) {
          history.push("assessment-screen");
        }
      });
    }
  };

  return (
    <div className="registerModalContainer">
      <div>
        <SubtitleText bold={true}>Register</SubtitleText>
        <div style={{ marginTop: 5 }}>
          <TextInput
            value={usernameObj.username}
            placeholder="Username"
            onChange={(event) => {
              setShowErrorMsg("");
              setUsernameObj({ username: event.target.value, error: false });
            }}
            error={usernameObj.error}
          />
        </div>
        <div style={{ marginTop: 5 }}>
          <TextInput
            value={passwordObj.password}
            placeholder="Password"
            onChange={(event) => {
              setShowErrorMsg("");
              setPasswordObj({ password: event.target.value, error: false });
            }}
            password={true}
            error={passwordObj.error}
          />
        </div>
        <div style={{ marginTop: 5 }}>
          <TextInput
            value={verifyPasswordObj.verifyPassword}
            placeholder="Verify Password"
            onChange={(event) => {
              setShowErrorMsg("");
              setVerifyPasswordObj({
                verifyPassword: event.target.value,
                error: false,
              });
            }}
            password={true}
            error={verifyPasswordObj.error}
          />
        </div>
        <div style={{ marginTop: 5 }}>
          <TextInput
            value={emailObj.email}
            placeholder="Email"
            onChange={(event) => {
              setShowErrorMsg("");
              setEmailObj({ email: event.target.value, error: false });
            }}
            email={true}
            error={emailObj.error}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <TextInput
            value={activationCodeObj.activationCode}
            placeholder="Coupon Code" // coupon esta bien o como le pongo?
            onChange={(event) => {
              setShowErrorMsg("");
              setActivationCodeObj({
                activationCode: event.target.value,
                error: false,
              });
            }}
            error={activationCodeObj.error}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            loading={isFetchingAuthentication}
            onClick={() => handleSubmit()}
            width="100%"
            height={45}
            glow={true}
            text="Sign up"
          />
        </div>
        <div
          style={{ marginTop: 16, cursor: "pointer", textAlign: "left" }}
          onClick={() => {}}
        >
          <SmallText color="#FFF" textDecoration="underline">
            By signing up you agree to our End User License Agreement
          </SmallText>
        </div>

        <ErrorDisplay message={showErrorMsg} show={showErrorMsg !== ""} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isFetchingAuthentication: state.authState.isFetchingAuthentication,
    messageCode: state.authState.messageCode,
  };
};

const bindActions = (dispatch: any) => {
  return {
    register: (data: IUser, callback: (success: boolean) => void) =>
      dispatch(ACTIONS.register(data, callback)),
    clearAuthenticationData: () => dispatch(ACTIONS.clearAuthenticationData()),
  };
};

export default connect(mapStateToProps, bindActions)(RegisterModal);
