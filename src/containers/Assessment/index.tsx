import React, {useState, useEffect} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
// @ts-ignore
import {useHistory} from 'react-router-dom';
import ScreenTemplate from "../ScreenTemplate";
import Button from "../../components/Button";
import BodyText from "../../components/BodyText";
import TitleText from "../../components/TitleText";
import InfoCard from "../../components/InfoCard";
import * as RESULT_ACTIONS from '../Results/store/actions';
import assessmentBG from "../../assets/images/assessment-start.png";

function Assessment(props: any) {
    const history = useHistory();

    useEffect(() => {
        props.fetchQuestionProgressbar('assessment', props.myTopics);
    }, [props.myTopics])

    return (
        <ScreenTemplate type="assessment-screen" progressData={props.progressData} totalQuestions={props.totalQuestions} index={props.progressIndex} tooltip={props.progressIndex === 0 ? 'Start' : 'Continue'}>
            <div className="libraryImageWrapper">
                <img src={assessmentBG} width="100%"/>
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
                <BodyText>This assessment takes an average of 20 to 5 minutes.</BodyText>
            </div>
            <div className="assessmentInfoCardWrapper">
                <InfoCard title="TAKES ~8 MINUTES" text="Mauris varius felis at commodo imperdiet. Cras faucibus egestas urna, sed cursus massa cursus in. Ut aliquam lobortis arcu, non consectetur sapien interdum quis." image="timer" />
                <InfoCard title="ARGUMENT 2" text="Mauris varius felis at commodo imperdiet. Cras faucibus egestas urna, sed cursus massa cursus in. Ut aliquam lobortis arcu, non consectetur sapien interdum quis." image="timer" />
                <InfoCard title="ARGUMENT 3" text="Mauris varius felis at commodo imperdiet. Cras faucibus egestas urna, sed cursus massa cursus in. Ut aliquam lobortis arcu, non consectetur sapien interdum quis." image="timer" />
            </div>
            <div className="assessmentContainer">
                <Button onClick={() => history.push('assessment')} width={200} height={47} glow text="START ASSESSMENT"/>
            </div>
        </ScreenTemplate>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
        myTopics: state.screenTemplateState.myTopics,
        progressIndex: state.resultState.progressIndex,
        totalQuestions: state.resultState.totalQuestions,
        progressData: state.resultState.progressData
    };
}

const bindActions = (dispatch: any) => {
    return {
        fetchQuestionProgressbar: (type: string, myTopics: any) => dispatch(RESULT_ACTIONS.fetchQuestionProgressbar(type, myTopics))
    };
};

export default connect(mapStateToProps, bindActions)(Assessment);