import React, { useState, useEffect } from "react";
import * as ACTIONS from "./store/actions";
// @ts-ignore
import { connect } from "react-redux";
import "./styles.css";
// @ts-ignore
import Modal from "react-awesome-modal";
import { validateEmail } from "../../helpers/validations";
import { formatMessageCode } from "../../helpers/formatter";
import { Fade } from "react-awesome-reveal";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import ErrorDisplay from "../../components/ErrorDisplay";
import EmailResetModal from "./EmailResetModal";
import RegisterModal from "./RegisterModal";
import {
  emptyEmailString,
  invalidEmailString,
  emptyPasswordString,
  // @ts-ignore
} from "../../helpers/constants";
import SmallText from "../../components/SmallText";
import SubtitleText from "../../components/SubtitleText";
import Logo from "../../assets/images/clai-logo.png";
import { IUser } from "./interfaces";
// @ts-ignore
import { useHistory, useParams } from "react-router-dom";
import loopImg from "../../assets/images/chip-leader-loop.gif";
import moment from "moment";

function Login(props: any) {
  //@ts-ignore
  const { code } = useParams();
  const history = useHistory();
  const [width, setWidth] = useState(window.innerWidth);
  const [emailObj, setEmailObj] = useState({ email: "", error: false });
  const [passwordObj, setPasswordObj] = useState({
    password: "",
    error: false,
  });
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState("");
  
  /*--------------------------- Clear token -S----------------------------*
  useEffect(()=> {
    props.clearAuthenticationData();
    history.replace("/")

  }, [])
  /*--------------------------- Clear token -E----------------------------*/

  // adjust dimensions
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [width]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (
      (!emailObj.error && !passwordObj.error) ||
      showEmailModal ||
      showRegisterModal
    ) {
      setShowErrorMsg("");
      props.setAuthenticationCode("");
    }
  }, [emailObj, passwordObj, showEmailModal, showRegisterModal]);
  useEffect(() => {
    if (code !== undefined) {
      setShowRegisterModal(true);
    }
  }, [code]);
  useEffect(() => {
    if (props.messageCode) {
      setShowErrorMsg(formatMessageCode(props.messageCode));
    } else {
      setShowErrorMsg("");
      props.setAuthenticationCode("");
    }
  }, [props.messageCode]);

  const handleSubmit = () => {
    if (emailObj.email === "") {
      setEmailObj({ email: emailObj.email, error: true });
      setShowErrorMsg(emptyEmailString);
    } else if (!validateEmail(emailObj.email)) {
      setEmailObj({ email: emailObj.email, error: true });
      setShowErrorMsg(invalidEmailString);
    } else if (passwordObj.password === "") {
      setPasswordObj({ password: passwordObj.password, error: true });
      setShowErrorMsg(emptyPasswordString);
    } else {
      const request = {
        email: emailObj.email,
        password: passwordObj.password,
      };
      props.login(request, (success: boolean, user: IUser) => {
        if (success) {
          if (user.assessment) history.push(`assessment-screen`);
          else if (
            user.payment &&
            user.payment.customerID &&
            moment(user.payment.subscription).diff(moment(), "days") > -parseInt(process.env.REACT_APP_PAY_CHECK_CACHE_PERIOD ? process.env.REACT_APP_PAY_CHECK_CACHE_PERIOD : '0')
          ) history.push(`home`);
          else history.push(`payment`);
          

        }
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const handleRegister = () => {
    //history.push("/code=xd");
    setShowRegisterModal(true);
  };
  return (
    <div className="loginContainer" onKeyDown={handleKeyDown}>
      {width > 900 ? (
        <div className="loginVideoContainer">
          <Fade duration={3000}>
            <img src={loopImg} width="500vh" height="500vh" />
          </Fade>
        </div>
      ) : null}
      <div className="formContainer">
        <div>
          <Fade duration={3000}>
            <div className="loginAvatarWrapper">
              <img src={Logo} width={210} height={58} />
            </div>
            <div style={{ marginBottom: 8, textAlign: "left" }}>
              <SmallText>Welcome!</SmallText>
            </div>
            <div style={{ marginBottom: 32, textAlign: "left" }}>
              <SubtitleText bold={true}>Log in to Chip Leader AI</SubtitleText>
            </div>
            <form className="loginInputWrapper">
              <TextInput
                value={emailObj.email}
                placeholder="Email"
                onChange={(event) =>
                  setEmailObj({ email: event.target.value, error: false })
                }
                email={true}
                error={emailObj.error}
              />
              <TextInput
                value={passwordObj.password}
                placeholder="Password"
                onChange={(event) =>
                  setPasswordObj({ password: event.target.value, error: false })
                }
                password={true}
                error={passwordObj.error}
              />
              <div style={{ marginTop: 20 }}>
                <Button
                  loading={props.isFetchingAuthentication}
                  onClick={() => handleSubmit()}
                  width={342}
                  height={55}
                  text="Login"
                  glow
                />
              </div>
            </form>
            <div
              style={{ marginTop: 64, cursor: "pointer", textAlign: "left" }}
              onClick={() => setShowEmailModal(true)}
            >
              <SmallText color="#FFF" textDecoration="underline">
                Forgot your password?
              </SmallText>
            </div>
            <div
              style={{ marginTop: 16, cursor: "pointer", textAlign: "left" }}
              onClick={handleRegister}
            >
              <SmallText color="#FFF" textDecoration="underline">
                Don't have an account? Learn more here
              </SmallText>
            </div>
            <ErrorDisplay message={showErrorMsg} show={showErrorMsg !== ""} />
          </Fade>
        </div>
        <Modal
          visible={showEmailModal}
          width="420px"
          height="100%"
          effect="fadeInUp"
          onClickAway={() => setShowEmailModal(false)}
        >
          <EmailResetModal reset={!showEmailModal} />
        </Modal>
        <Modal
          visible={showRegisterModal}
          width="420px"
          height="100%"
          effect="fadeInUp"
          onClickAway={() => setShowRegisterModal(false)}
        >
          <RegisterModal reset={!showRegisterModal} />
        </Modal>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isFetchingAuthentication: state.authState.isFetchingAuthentication,
    messageCode: state.authState.messageCode,
  };
};

const bindActions = (dispatch: any) => {
  return {
    login: (data: IUser, callback: (success: boolean, data: IUser) => void) =>
      dispatch(ACTIONS.login(data, callback)),
    setAuthenticationCode: (code: string) =>
      dispatch(ACTIONS.setAuthenticationCode(code)),
    clearAuthenticationData: () =>
      dispatch(ACTIONS.clearAuthenticationData()),
  };
};

export default connect(mapStateToProps, bindActions)(Login);
