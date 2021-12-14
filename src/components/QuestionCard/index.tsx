import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import SmallText from "../SmallText";
import SubtitleText from "../SubtitleText";
import BodyText from "../BodyText";
import TitleText from "../TitleText";
import Button from "../Button";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseResponse } from "../../helpers/formatter";
import parse from "html-react-parser";
import ReactTooltip from "react-tooltip";
import { PulseLoader } from "react-spinners";

interface IQuestionCard {
  showQuestionNumber: boolean;
  rerender: boolean;
  loading: boolean;
  headerText: string;
  questionNumber: number;
  description: string;
  options: any[];
  myTopics: any;
  topicData: any;
  callback: (correct: boolean) => void;
  buttonText: string;
  next: () => void;
}

const QuestionCard: React.FC<IQuestionCard> = ({
  showQuestionNumber,
  rerender,
  loading,
  headerText,
  questionNumber,
  description,
  options,
  myTopics,
  topicData,
  callback,
  buttonText,
  next,
}) => {
  const pathname = new URL(window.location.href).pathname;
  const [status, setStatus] = useState(0); // 0 = not answered, 1 = correct, 2 = wrong,
  const [explanation, setExplanation] = useState("");
  const [mastered, setMastered] = useState(false);
  const [pressed, setPressed] = useState({ index: 0, pressed: false });
  const descriptionRef = useRef(null);
  const [randomized_options, set_randomized_options] = useState(options)

  useEffect(() => {
    setStatus(0);
    setExplanation("");
    const computed_options = options
      .filter(elem => elem.text)
      .sort(() => (Math.random() > 0.5 ? 1 : -1))

    set_randomized_options(computed_options)

    if (pathname !== "/assessment") {
      const topic = topicData
        ? topicData
        : JSON.parse(sessionStorage.getItem("selectedTopic") as string);
      const myTopicsIndex = myTopics.findIndex((t: any) => t.UID === topic.UID);
      if (myTopicsIndex > -1) {
        const lessonIndex = myTopics[myTopicsIndex].lessons.findIndex(
          (t: any) => t.UID === topic.lessonUID
        );
        if (
          lessonIndex > -1 &&
          myTopics[myTopicsIndex].lessons[lessonIndex].mastered
        ) {
          setMastered(true);
        } else {
          setMastered(false);
        }
      }
    }
  }, [questionNumber]);

  const scrollToBottom = () => {
    if (descriptionRef.current !== null) {
      // @ts-ignore
      descriptionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom);

  return (
    <div className="questionCardContainer">
      {!rerender ? (
        <div
          className="questionCardTextWrapper"
          style={{
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <SmallText>{headerText}</SmallText>
          {mastered ? (
            <div>
              <SmallText bold color="#759A47">
                Mastered
              </SmallText>
              <FontAwesomeIcon
                color="#759A47"
                size="1x"
                icon={Icon["faCheck"]}
                transform={{ rotate: 0 }}
                style={{ marginLeft: 5 }}
              />
            </div>
          ) : null}
        </div>
      ) : null}
      {!rerender && showQuestionNumber ? (
        <div className="questionCardTextWrapper" style={{ marginBottom: 16 }}>
          <TitleText>{`Question #${questionNumber}`}</TitleText>
        </div>
      ) : null}
      {!rerender ? (
        <div className="questionCardTextWrapper" style={{ marginBottom: 24 }}>
          <BodyText>
            {description && description !== ""
              ? parse(parseResponse(description))
              : null}
            
          </BodyText>
        </div>
      ) : null}
      {!rerender && randomized_options.length > 0 ? (
        randomized_options.map((item, index) => (

          <div key={index} style={{ marginBottom: 16 }}>
            {console.log(item, pressed.pressed, item.correct && pressed.pressed)}
            {item.text ? (
              <Button
                selected={pressed.index === index && pressed.pressed}
                disabled={status !== 0 || loading}
                onClick={() => {
                  callback(item.correct);
                  setStatus(item.correct ? 1 : 2);
                  setExplanation(item.explanation);
                  setPressed({ index: index, pressed: true });
               
                }}
                width={343}
                height={47}
                text={`${item.text}`}
                bgGreen={item.correct && pressed.pressed}
                answer={
                  index === 0
                    ? "A."
                    : index === 1
                    ? "B."
                    : index === 2
                    ? "C."
                    : index === 3
                    ? "D."
                    : "E."
                }
              />
            ) : null}
          </div>
        ))
      ) : (
        <div className="questionCardLoaderWrapper">
          <PulseLoader loading={true} color="#FFF" />
        </div>
      )}
      {!rerender && status !== 0 ? (
        <div className="questionCardFooterWrapper">
          {pathname !== "/assessment" && status === 1 ? (
            <div className="questionCardFooterHeaderWrapper">
              <div
                className="questionCardIconWrapper"
                style={{ backgroundColor: "#759A47", marginRight: 12 }}
              >
                <FontAwesomeIcon
                  color="#FFF"
                  size="1x"
                  icon={Icon["faCheck"]}
                  transform={{ rotate: 0 }}
                />
              </div>
              <SubtitleText bold>Reason</SubtitleText>
            </div>
          ) : pathname !== "/assessment" ? (
            <div className="questionCardFooterHeaderWrapper">
              <div
                className="questionCardIconWrapper"
                style={{ backgroundColor: "#C75350", marginRight: 12 }}
              >
                <FontAwesomeIcon
                  color="#FFF"
                  size="1x"
                  icon={Icon["faPlus"]}
                  transform={{ rotate: 45 }}
                />
              </div>
              <SubtitleText bold>Reason</SubtitleText>
            </div>
          ) : null}
          <div ref={descriptionRef}>
            {pathname !== "/assessment" ? (
              <BodyText>
                {explanation && explanation !== ""
                  ? parse(parseResponse(explanation))
                  : null}
               
              </BodyText>
            ) : null}
            <div style={{ marginTop: 50 }}>
              <Button
                onClick={() => {
                  next();
                  setPressed({ index: 0, pressed: false });
                }}
                width={343}
                height={47}
                text={buttonText}
                selected
                glow
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionCard;
