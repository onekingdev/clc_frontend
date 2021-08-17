import React, {useState, useEffect} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
// @ts-ignore
import {useHistory} from 'react-router-dom';
import ScreenTemplate from "../ScreenTemplate";
import Banner from "../../components/Banner";
import TabNavigation from "../../components/TabNavigation";
import PerformanceCard from "../../components/PerformanceCard";
import performanceBg from "../../assets/images/performanceBg.png";
import ProgressCard from "../../components/ProgressCard";
import * as RESULT_ACTIONS from "./store/actions";
import {getPercentage} from "../../helpers/formatter";

function Results(props: any) {
    const history = useHistory();
    const [tab, setTab] = useState(0);

    useEffect(() => {// 0-25 = red; 26-75 = yellow; 76-100 = green
        props.fetchQuestionProgressbar('assessment', props.myTopics);
    }, [props.myTopics])

    return (
        <ScreenTemplate type="results" loading={props.totalQuestions === 0} progressData={props.progressData} totalQuestions={props.totalQuestions} index={props.progressIndex} tooltip={'Good job!'}>
            <Banner type="results" topText="THE TOURNAMENT ASSESSMENT" title="Assessment Results" footerValues={[`${props.correctQuestions}/${props.totalQuestions}`, `${getPercentage(props.correctQuestions, props.totalQuestions)}`]}/>
            <div className="pathsImageWrapper">
                <img src={performanceBg} width="100%"/>
            </div>
            <br/>
            <br/>
            <div className="assessmentResultsPerformanceCardWrapper">
                <PerformanceCard
                    topText="YOUR PERSONAL TRAINING PROGRAM"
                    title="“Pre-Flop Strategies”"
                    bodyText="Mauris varius felis at commodo imperdiet. Cras faucibus egestas urna, sed cursus massa cursus in. apien interdum quis. Fusce id arcu eget nisl porta blandit. Etiam mollis massa et ipsum tincidunt, at luctus velit ultrices. Aliquam posuere mi ac risus scelerisque, in aliquam nunc molestie. Ut aliquam lobortis arcu, non "
                    questions="4 / 5"
                    percentage="78"/>
            </div>
            <TabNavigation selectedIndex={tab} tabs={['Your Stats']} callback={(index) => setTab(index)} />
            <div className="assessmentResultsPerformanceCardWrapper">
                {props.myTopics && props.myTopics.length > 0 ?
                    props.myTopics.map((topic: any, index: number) =>
                        <div className="assessmentResultsProgressGroupWrapper">
                            {index !== 0 && props.myTopics[index].lessons.map((lesson: any) =>
                                <div className="assessmentResultsProgressCardWrapper">
                                    <ProgressCard
                                        values={[0, getPercentage(lesson.correct, lesson.questions.length)]}
                                        progressText={`${lesson.correct}/${lesson.questions.length}`}
                                        upperText={props.myTopics[index].name}
                                        title={lesson.lessonName}
                                        text={lesson.description}
                                    />
                                </div>
                            )}
                        </div>
                        )
                    : null}
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
        correctQuestions: state.resultState.correctQuestions,
        progressData: state.resultState.progressData
    };
}

const bindActions = (dispatch: any) => {
    return {
        fetchQuestionProgressbar: (type: string, myTopics: any) => dispatch(RESULT_ACTIONS.fetchQuestionProgressbar(type, myTopics))
    };
};

export default connect(mapStateToProps, bindActions)(Results);