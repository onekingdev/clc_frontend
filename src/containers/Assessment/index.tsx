import React, { useState, useEffect } from "react";
// @ts-ignore
import { connect } from "react-redux";
import "./styles.css";
// @ts-ignore
import { useHistory } from "react-router-dom";
import ScreenTemplate from "../ScreenTemplate";
import Button from "../../components/Button";
import BodyText from "../../components/BodyText";
import TitleText from "../../components/TitleText";
import InfoCard from "../../components/InfoCard";
import * as RESULT_ACTIONS from "../Results/store/actions";
import assessmentBG from "../../assets/images/assessment-start.png";

function Assessment(props: any) {
  const history = useHistory();

  useEffect(() => {
    props.fetchQuestionProgressbar("assessment", props.myTopics);
  }, [props.myTopics]);

  return (
    <ScreenTemplate
      type="assessment-screen"
      progressData={props.progressData}
      totalQuestions={props.totalQuestions}
      index={props.progressIndex}
      tooltip={props.progressIndex === 0 ? "Start" : "Continue"}
    >
      <div className="libraryImageWrapper">
        <img src={assessmentBG} width="100%" />
      </div>
      <div>
        <BodyText color="var(--primary)">THE TOURNAMENT ASSESSMENT</BodyText>
      </div>
      <div className="assessmentTitleWrapper">
        <div>
          <TitleText bold>Welcome to the Ultimate</TitleText>
        </div>
        <div>
          <TitleText bold>Tournament Assessment</TitleText>
        </div>
      </div>
      <div>
        <BodyText>
          The AI power tool will take you through a series of questions based on
          actual NLH tournament hands. Once completed you will receive a full
          breakdown of your strengths and weaknesses in addition to customized
          content for your game.
        </BodyText>
      </div>
      <div className="assessmentInfoCardWrapper">
        <InfoCard
          title="TAKE IT SERIOUSLY"
          text="Make sure you read think through each answer. This is an assessment of your ability to make decisions at the table. It only works if you actually consider your answers."
          image="timer"
        />
        <InfoCard
          title="FULL BREAKDOWN AFTER"
          text="Once you finish the assessment we will send you a full report of your strengths and weaknesses. We will also send you customized content specifically for your game."
          image="timer"
        />
        <InfoCard
          title="ALL REAL SPOTS"
          text="This assessment was created from real spots from Chance and Alex`s NLH hand archive. All hands are situations you can actually be when playing a live  or online tournament."
          image="timer"
        />
      </div>
      <div className="assessmentContainer">
        <Button
          onClick={() => {}}
          width={200}
          height={47}
          glow
          text="START ASSESSMENT"
        />
      </div>
    </ScreenTemplate>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.authState.user,
    myTopics: state.screenTemplateState.myTopics,
    progressIndex: state.resultState.progressIndex,
    totalQuestions: state.resultState.totalQuestions,
    progressData: state.resultState.progressData,
  };
};

const bindActions = (dispatch: any) => {
  return {
    fetchQuestionProgressbar: (type: string, myTopics: any) =>
      dispatch(RESULT_ACTIONS.fetchQuestionProgressbar(type, myTopics)),
  };
};

export default connect(mapStateToProps, bindActions)(Assessment);
