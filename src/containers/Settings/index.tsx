import React, { useState, useEffect, useRef } from "react";
// @ts-ignore
import { connect } from "react-redux";
import "./styles.css";
import * as ACTIONS from "../Settings/store/actions";
import * as AUTH_ACTIONS from "../Authentication/store/actions";
import * as PAYMENT_ACTIONS from "../Payment/store/actions";
// @ts-ignore
import { useHistory } from "react-router-dom";
import XLSX from "xlsx";
import FilePicker from "../../components/FilePicker";
import Button from "../../components/Button";
import DotLoader from "react-spinners/DotLoader";
import TitleText from "../../components/TitleText";
import Avatar from "../../components/Avatar";
import BodyText from "../../components/BodyText";
import ErrorDisplay from "../../components/ErrorDisplay";
import {
  libraryUploadError,
  questionsUploadError,
  glossaryUploadError,
  eventsUploadError,
  emptyEmailString,
  invalidEmailString,
  emptyPasswordString,
} from "../../helpers/constants";
import Banner from "../../components/Banner";
import TextInput from "../../components/TextInput";
import { validateEmail } from "../../helpers/validations";
import ScreenTemplate from "../ScreenTemplate";
import { IUpdateUserData } from "./interfaces";
import moment from "moment";
import { PulseLoader } from "react-spinners";
import CheckoutForm from "../../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// @ts-ignore
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { getStripeKey } from "../../services/stripe";
import { useIntercom } from "react-use-intercom";

const promise = loadStripe(
  getStripeKey.stripe_publishable_key(process.env.NODE_ENV)
);
const host = new URL(window.location.href).host;

function Settings(props: any) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [emailObj, setEmailObj] = useState({
    email: props.user.email,
    error: false,
  });
  const [passwordObj, setPasswordObj] = useState({
    password: "",
    error: false,
  });
  const [oldPasswordObj, setOldPasswordObj] = useState({
    oldPassword: "",
    error: false,
  });
  const [showErrorMsg, setShowErrorMsg] = useState("");
  const [selected, setSelected] = useState(props.user.avatar);
  const [cancelSub, setCancelSub] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const { trackEvent} = useIntercom();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!emailObj.error && !passwordObj.error && !oldPasswordObj.error) {
      setShowErrorMsg("");
      props.settingsErrorMessage("");
    }
  }, [emailObj, passwordObj, oldPasswordObj]);

  useEffect(() => {
    if (props.errorMessage !== "") {
      setShowErrorMsg(props.errorMessage);
    }
  }, [props.errorMessage]);
  const handleCancel = () => {
    setCancelSub(true)
    trackEvent('Cancel membership')
  }
  const handleSubmit = () => {
    if (emailObj.email === "") {
      setEmailObj({ email: emailObj.email, error: true });
      setShowErrorMsg(emptyEmailString);
    } else if (!validateEmail(emailObj.email)) {
      setEmailObj({ email: emailObj.email, error: true });
      setShowErrorMsg(invalidEmailString);
    } else if (oldPasswordObj.oldPassword === "") {
      setOldPasswordObj({
        oldPassword: oldPasswordObj.oldPassword,
        error: true,
      });
      setShowErrorMsg(emptyPasswordString);
    } else {
      const request = {
        email: emailObj.email,
        password: passwordObj.password,
        oldPassword: oldPasswordObj.oldPassword,
        avatar: selected,
      };

      props.updateUserData(request);
    }
  };

  function chooseFile() {
    const current = inputRef.current;
    (
      current || {
        click: () => {},
      }
    ).click();
  }

  const onFileOpen = (data: any) => {
    const wb = XLSX.read(data, { type: "binary" });
    var sheets: { [email: string]: Array<Object> | Object } = {};

    for (var i = 0; i < wb.SheetNames.length; i++) {
      /* Get first worksheet */
      const wsname = wb.SheetNames[i];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      sheets[wsname] = data;
    }
    return sheets;
  };

  const importLibrary = (data: any) => {
    setErrorMessage("");
    const sheets = onFileOpen(data);
    bulkImportLibrary(sheets);
  };

  const importQuestions = (data: any) => {
    setErrorMessage("");
    const sheets = onFileOpen(data);
    bulkImportQuestions(sheets);
  };

  const importGlossary = (data: any) => {
    setErrorMessage("");
    const sheets = onFileOpen(data);
    bulkImportGlossary(sheets);
  };

  const importEvents = (data: any) => {
    setErrorMessage("");
    const sheets = onFileOpen(data);
    bulkImportEvents(sheets);
  };

  const bulkImportLibrary = (sheets: { [email: string]: Object }) => {
    let library = ((sheets["LIBRARIES"] as Array<Object>) || []).map(
      (value: any) => {
        return {
          image: value["IMAGE"],
          duration: value["DURATION"],
          title: value["TITLE"],
          description: value["DESCRIPTION"],
          url: value["URL"],
          type: value["TYPE"],
          handBreakdown: value["HAND_BREAKDOWN"],
        };
      }
    );
    if (library.length > 0) {
      props.uploadLibrary({ library });
    } else {
      setErrorMessage(libraryUploadError);
    }
  };

  const bulkImportQuestions = (sheets: { [email: string]: Object }) => {
    let lessons = ((sheets["LESSONS"] as Array<Object>) || []).map(
      (value: any) => {
        return {
          UID: value["UID"],
          topicUID: value["TOPIC_UID"],
          name: value["NAME"],
          description: value["DESCRIPTION"],
          rule: value["RULE"].toString(),
          order: parseInt(value["ORDER"]),
        };
      }
    );

    let topics = ((sheets["TOPICS"] as Array<Object>) || []).map(
      (value: any) => {
        return {
          UID: value["UID"],
          name: value["NAME"],
          masteredLevel: value["MASTERED_LEVEL"],
          chips: value["CHIPS"],
          tickets: value["TICKETS"],
        };
      }
    );

    let questions = ((sheets["QUESTIONS"] as Array<Object>) || []).map(
      (value: any) => {
        return {
          lessonUID: value["LESSON_UID"],
          handNumber: value["HAND_NO"],
          questionText: value["QUESTION_TEXT"],
          answers: {
            correct: value["ANSWER_CORRECT"],
            wrong1: value["ANSWER_WRONG1"],
            wrong2: value["ANSWER_WRONG2"],
            wrong3: value["ANSWER_WRONG3"],
            wrong4: value["ANSWER_WRONG4"],
          },
          explanation: {
            correct: value["EXPLANATION_CORRECT"],
            wrong: value["EXPLANATION_WRONG"],
          },
          handHistory: value["HAND_HISTORY"] ? value["HAND_HISTORY"] : "",
          reward: {
            chips: value["REWARD_CHIPS"],
            tickets: value["REWARD_TICKETS"],
          },
          assessment: value["ASSESSMENT"],
        };
      }
    );

    if (lessons.length > 0 && questions.length > 0 && topics.length > 0) {
      props.uploadQuestions({ lessons, questions, topics });
    } else {
      setErrorMessage(questionsUploadError);
    }
  };

  const bulkImportGlossary = (sheets: { [email: string]: Object }) => {
    let glossary = ((sheets["GLOSSARY"] as Array<Object>) || []).map(
      (value: any) => {
        return {
          word: value["WORD"] ? value["WORD"] : "",
          definition: value["DEFINITION"],
        };
      }
    );
    if (glossary.length > 0) {
      props.uploadGlossary({ glossary });
    } else {
      setErrorMessage(glossaryUploadError);
    }
  };

  const bulkImportEvents = (sheets: { [email: string]: Object }) => {
    let events = ((sheets["EVENTS"] as Array<Object>) || []).map(
      (value: any) => {
        return {
          title: value["TITLE"],
          date: value["DATE"],
          body: value["BODY"],
          link: value["LINK"],
          spotlight: value["SPOTLIGHT"],
        };
      }
    );
    if (events.length > 0) {
      props.uploadEvents({ events });
    } else {
      setErrorMessage(eventsUploadError);
    }
  };

  const renderBrand = (brand: string) => {
    switch (brand) {
      case "visa":
        return 4;
      case "mastercard":
        return 5;
      case "discover":
        return 6;
      default:
        return 3;
    }
  };

  const renderNumber = (number: string) => {
    if (parseInt(number) < 9) {
      return "0" + number;
    }

    return number;
  };

  return (
    <ScreenTemplate>
      <div className="settingsContainer">
        {props.user.avatar === undefined || props.isUploadingLibraryData ? (
          <div className="centerLoader">
            <div style={{ marginBottom: 200 }}>
              <div style={{ marginLeft: 45, marginBottom: 10 }}>
                <DotLoader color="#FFF" loading={true} />
              </div>
              <TitleText>Uploading</TitleText>
            </div>
          </div>
        ) : (
          <div>
            <div className="main-settingsAvatarWrapper">
              <div>
                <Banner topText="Settings" title={props.user.userName} />
                <div style={{ marginBottom: 35 }}>
                  <BodyText color="#FFF">AVATAR</BodyText>
                </div>
                <div className="settingsAvatarWrapper">
                  <Avatar
                    size="large"
                    image="S"
                    text=""
                    selected={selected === "S"}
                    onClick={() => setSelected("S")}
                  />
                  <Avatar
                    size="large"
                    image="C"
                    text=""
                    selected={selected === "C"}
                    onClick={() => setSelected("C")}
                  />
                  <Avatar
                    size="large"
                    image="H"
                    text=""
                    selected={selected === "H"}
                    onClick={() => setSelected("H")}
                  />
                  <Avatar
                    size="large"
                    image="D"
                    text=""
                    selected={selected === "D"}
                    onClick={() => setSelected("D")}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                marginBottom: 35,
                marginTop: 48,
                marginRight: 50,
                marginLeft: 50,
              }}
            >
              <BodyText color="#FFF">MAIN INFO</BodyText>
              <div style={{ padding: 20 }}>
                <TextInput
                  value={emailObj.email}
                  placeholder="Email"
                  onChange={(event) =>
                    setEmailObj({ email: event.target.value, error: false })
                  }
                  email={true}
                  error={emailObj.error}
                  readonly={true}
                />
                <TextInput
                  value={passwordObj.password}
                  placeholder="New Password"
                  onChange={(event) =>
                    setPasswordObj({
                      password: event.target.value,
                      error: false,
                    })
                  }
                  password={true}
                  error={passwordObj.error}
                />
                <TextInput
                  value={oldPasswordObj.oldPassword}
                  placeholder="Old Password"
                  onChange={(event) =>
                    setOldPasswordObj({
                      oldPassword: event.target.value,
                      error: false,
                    })
                  }
                  password={true}
                  error={oldPasswordObj.error}
                />
                <div className="settingsButtonWrapper">
                  <Button
                    loading={props.isFetchingAuthentication}
                    onClick={handleSubmit}
                    width={300}
                    height={44}
                    text="Save"
                    glow
                  />
                </div>

                <ErrorDisplay
                  message={showErrorMsg}
                  show={showErrorMsg !== ""}
                />
              </div>
            </div>
            <div style={{ marginBottom: 35 }}>
              <BodyText color="#FFF">BILLING INFO</BodyText>
              {props.user &&
              props.user.payment &&
              props.user.payment.canceled ? (
                <ErrorDisplay
                  message={`Your subscription ends in ${moment(
                    props.user.payment.subscription
                  ).diff(moment(), "days")} days`}
                  show
                />
              ) : props.isFetchingAuthentication ? (
                <div className="settingsButtonWrapper">
                  <PulseLoader loading color="#FFF" />
                </div>
              ) : (
                <div>
                  <div className="cardContainer">
                    <div className="selfCard">
                      <Cards
                        cvc={"***"}
                        expiry={`${renderNumber(
                          props.user.payment.paymentMethod.expMonth
                        )}/${props.user.payment.paymentMethod.expYear}`}
                        focused={""}
                        name={"Card"}
                        number={`${renderBrand(
                          props.user.payment.paymentMethod.brand
                        )}***********${props.user.payment.paymentMethod.last4}`}
                      />
                    </div>
                    <div className="upgradeCardForm"></div>
                  </div>
                  
                  <div className="settingsButtonWrapper">
                    <Elements stripe={promise}>
                      <CheckoutForm
                        setProcessing={(value: boolean) => setProcessing(value)}
                        processing={processing}
                        email={props.user.email}
                        succeeded={succeeded}
                        setSucceeded={(value: boolean) => {
                          setTimeout(() => {
                            props.fetchUpdatedUserData(props.user.email);
                            setSucceeded(value);
                          }, 5000);
                        }}
                        updatePaymentDetails={props.updatePaymentDetails}
                        user={props.user}
                      />
                    </Elements>
                  </div>
                  {cancelSub ? (
                    <div className="settingsButtonWrapper">
                      <Button
                        onClick={() => props.cancelSubscription()}
                        width={80}
                        height={44}
                        text="Yes"
                      />
                      <div style={{ marginRight: 25, marginLeft: 25 }}>
                        <BodyText color="#FFF">Are you sure?</BodyText>
                      </div>
                      <Button
                        onClick={() => setCancelSub(false)}
                        width={80}
                        height={44}
                        text="No"
                      />
                    </div>
                  ) : (
                    <div className="settingsButtonWrapper">
                      <Button
                        onClick={handleCancel}
                        width={300}
                        height={44}
                        text="Cancel Subscription"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {props.user.type === "admin" ? (
              <div>
                <div style={{ marginBottom: 35 }}>
                  <BodyText color="#FFF">CONTENT CONTROL</BodyText>
                </div>
                <div style={{ padding: 20 }}>
                  <div
                    className="settingsUploadButtonsWrapper"
                    style={{ marginBottom: 0 }}
                  >
                    <FilePicker
                      title={"Import Library"}
                      onFileOpen={importLibrary}
                    />
                    <div style={{ marginRight: 20, marginBottom: 20 }} />
                    <FilePicker
                      title={"Import Questions"}
                      onFileOpen={importQuestions}
                    />
                  </div>
                  <div className="settingsUploadButtonsWrapper">
                    <FilePicker
                      title={"Import Glossary"}
                      onFileOpen={importGlossary}
                    />
                    <div style={{ marginRight: 20, marginBottom: 20 }} />
                    <FilePicker
                      title={"Import Events"}
                      onFileOpen={importEvents}
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="settingsButtonWrapper">
              <Button
                loading={props.isFetchingAuthentication}
                width={300}
                height={44}
                text="Logout"
                glow
                onClick={() => {
                  props.logout((success: boolean) => {
                    if (success) {
                      history.push(`/`);
                    }
                  });
                }}
              />
            </div>
            <ErrorDisplay message={errorMessage} show={errorMessage !== ""} />
          </div>
        )}
      </div>
    </ScreenTemplate>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.authState.user,
    isUploadingLibraryData: state.settingsState.isUploadingLibraryData,
    isFetchingAuthentication: state.authState.isFetchingAuthentication,
    errorMessage: state.settingsState.errorMessage,
  };
};

const bindActions = (dispatch: any) => {
  return {
    uploadGlossary: (glossary: any) =>
      dispatch(ACTIONS.uploadGlossary(glossary)),
    uploadLibrary: (library: any) => dispatch(ACTIONS.uploadLibrary(library)),
    uploadQuestions: (questions: any) =>
      dispatch(ACTIONS.uploadQuestions(questions)),
    uploadEvents: (events: any) => dispatch(ACTIONS.uploadEvents(events)),
    logout: (callback: (success: boolean) => void) =>
      dispatch(AUTH_ACTIONS.logout(callback)),
    fetchUpdatedUserData: (email: string) =>
      dispatch(AUTH_ACTIONS.fetchUpdatedUserData(email)),
    updateUserData: (userData: IUpdateUserData) =>
      dispatch(ACTIONS.updateUserData(userData)),
    settingsErrorMessage: (msg: string) =>
      dispatch(ACTIONS.setSettingsErrorMessage(msg)),
    cancelSubscription: () => dispatch(PAYMENT_ACTIONS.cancelSubscription()),
    updatePaymentDetails: (paymentMethod: any) =>
      dispatch(PAYMENT_ACTIONS.updatePaymentDetails(paymentMethod)),
  };
};

export default connect(mapStateToProps, bindActions)(Settings);
