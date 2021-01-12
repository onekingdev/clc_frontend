import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import * as PERFORMANCE_ACTIONS from "../Performance/store/actions";
import * as ACTIONS from './store/actions';
import './styles.css';
import Table from '../../assets/images/table.png';
import Player from "../../components/Player";
import HouseOfCards from "../../components/HouseOfCards";
import PokerPlayer from "../../components/PokerPlayer";
import QuestionCard from "../../components/QuestionCard";
import SmallText from "../../components/SmallText";
import ScreenTemplate from "../ScreenTemplate";
import {numberWithCommas} from '../../helpers/formatter';
import TitleText from "../../components/TitleText";
// @ts-ignore
import {useHistory} from 'react-router-dom';
// @ts-ignore
import Modal from 'react-awesome-modal';
import BodyText from "../../components/BodyText";
import Button from "../../components/Button";


let interval: any;

function Game(props: any) {
    const history = useHistory();
    let [correctCounter, setCorrectCounter] = useState(0);
    let [handIndex, setHandIndex] = useState(0);
    let [questionIndex, setQuestionIndex] = useState(0);
    let [pot, setPot] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [speed, setSpeed] = useState(1200);
    const [pause, setPause] = useState(false);
    const [finished, setFinished] = useState(false);
    const [tableAction, setTableAction] = useState('');
    const [questions, setQuestions]: any = useState({array: [], render: false});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => {
            stop();
            props.clearGameData();
        }
    }, []);

    useEffect(() => {
        props.fetchGameData();
    },[])

    useEffect(() => {
        if (props.questions && props.questions.length > 0) {
            setQuestions({array: props.questions, render: !questions.render})
        }
    },[props.questions])

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    useEffect(() => {
        if (questions.array.length > 0) {
            if (pause) stop();
            else start();
        }
    }, [pause, props.isFetchingGameData])

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    const getPastPlayerIndex = (array: any[], value: any, jump: number) => {
        let n = 0;
        let index = 0;
        array.forEach((item, i) => {
            if (item.player === value && i < jump) {
                n++;
            }
        })
        for (let i = 0, len = array.length; i < len; i++) {
            if (i in array && value === array[i].player && !--n) {
                index = i;
                break;
            }
        }
        return index;
    }

    const back = () => {
        setPause(true);
        setFinished(false);
        clearInterval(interval);

        if (handIndex > 0) {
            let index = handIndex;
            index -= 1;
            pot -= questions.array[questionIndex].hands[index+1].amount
            setPot(pot);
            setHandIndex(index);
            setTableAction(questions.array[questionIndex].hands[index].tableAction);
        }
    }

    const forward = () => {
        clearInterval(interval);
        setPause(true)

        if (questions.array[questionIndex].hands.length-1 === handIndex) {
            stop();
            setFinished(true);
            return;
        }
        if (handIndex < questions.array[questionIndex].hands.length -1) {
            let index = handIndex;
            index += 1;
            pot += questions.array[questionIndex].hands[index].amount
            setPot(pot);
            setHandIndex(index);
            setTableAction(questions.array[questionIndex].hands[index].tableAction);
        }

    }

    const move = () => {
        if (questions.array[questionIndex].hands.length-1 === handIndex) {
            stop();
            setFinished(true);
            return;
        }
        if (pause) return;
        if (handIndex < questions.array[questionIndex].hands.length -1) {
            setHandIndex(handIndex += 1);
            pot += questions.array[questionIndex].hands[handIndex].amount
            setPot(pot);
            setTableAction(questions.array[questionIndex].hands[handIndex].tableAction);
        }
        else stop();
    }

    const start = () => {
        setPause(false);
        interval = setInterval(move, speed);
    }

    const stop = () => {
        setPause(true);
        clearInterval(interval);
    }

    const reset = () => {
        setPause(true);
        setHandIndex(0);
        setPot(0);
        setFinished(false);
        clearInterval(interval);
        setTimeout(() => setPause(false), 500);
    }

    const speedHandler = (s: number) => {
        stop();
        setSpeed(s);
    }

    const handleChipPos = (player: number) => {
        if (player === 1 || player === 2 || player === 3) {
            return 'bottom';
        } else if (player === 4 || player === 5) {
            return 'left';
        } else if (player === 6 || player === 7 || player === 8) {
            return 'top';
        } else {
            return 'right';
        }
    }

    const handleAnswerQuestion = (correct: boolean) => {
        if (correct) {
            const chips = questions.array[questionIndex].question.reward.chips;
            const tickets = questions.array[questionIndex].question.reward.tickets;
            props.updateDailyEarnings({chips: chips, tickets: tickets});
            props.saveEarnings({
                userID: props.user.id,
                questionID: questions.array[questionIndex].question.questionID,
                chips, tickets
            });
            setCorrectCounter(correctCounter += 1);
        }
        props.updateMyTopics(
            questions.array[questionIndex].question.questionID,
            correct,
            questions.array[questionIndex].topicData
        );
    }

    const handleSubmit = () => {
        setFinished(false);
        reset();
        if (questionIndex < questions.array.length-1) {
            setQuestionIndex(questionIndex += 1);
        } else {
            setShowModal(true);
        }
    }

    const handleSkipLesson = () => {
        const topic = JSON.parse(sessionStorage.getItem('selectedTopic') as string);
        const lessonIndex = topic.allTopicLessons.findIndex((l: any) => l.UID === topic.lessonUID);
        topic.lessonUID = topic.allTopicLessons[lessonIndex + 1].UID;
        topic.lessonName = topic.allTopicLessons[lessonIndex + 1].name;
        sessionStorage.setItem('selectedTopic', JSON.stringify(topic));
        window.location.reload();
    }

    return (
        <ScreenTemplate loading={props.isFetchingGameData}>
            {questions.array.length === 0 ?
                    <TitleText>Could not fetch data</TitleText>
                    :
                <div className="gameWrapper" style={width > 1300 ? {} : {transform: `scale(${width / 1300})`}}>
                    <div>
                        <div className="gamePokerTableContainer">
                            {questions.array[questionIndex].players.length > 0 ?
                                questions.array[questionIndex].players.map((item: any) =>
                                    <div className={`gamePokerPlayerWrapper gameP${parseInt(item.number)}`}>
                                        <PokerPlayer
                                            players={questions.array[questionIndex].tableInfo.players}
                                            player={parseInt(item.number)}
                                            me={parseInt(item.number) === questions.array[questionIndex].hands[handIndex].player ? questions.array[questionIndex].hands[handIndex].cards.length > 0 : false}
                                            cards={parseInt(item.number) === questions.array[questionIndex].hands[handIndex].player ? questions.array[questionIndex].hands[handIndex].cards : questions.array[questionIndex].hands[getPastPlayerIndex(questions.array[questionIndex].hands, parseInt(item.number), handIndex)].cards}
                                            mp={item.initAmount}
                                            chipPos={parseInt(item.number) === questions.array[questionIndex].hands[handIndex].player ? handleChipPos(questions.array[questionIndex].hands[handIndex].player) : handleChipPos(questions.array[questionIndex].hands[getPastPlayerIndex(questions.array[questionIndex].hands, parseInt(item.number), handIndex)].player)}
                                            turn={parseInt(item.number) === questions.array[questionIndex].hands[handIndex].player}
                                            dealer={questions.array[questionIndex].tableInfo.dealer === parseInt(item.number)}
                                            action={parseInt(item.number) === questions.array[questionIndex].hands[handIndex].player ? questions.array[questionIndex].hands[handIndex].action : questions.array[questionIndex].hands[getPastPlayerIndex(questions.array[questionIndex].hands, parseInt(item.number), handIndex)].action}
                                            amount={parseInt(item.number) === questions.array[questionIndex].hands[handIndex].player ? questions.array[questionIndex].hands[handIndex].amount : questions.array[questionIndex].hands[getPastPlayerIndex(questions.array[questionIndex].hands, parseInt(item.number), handIndex)].amount}
                                            pot={pot}
                                        />
                                    </div>
                                ) : null}
                            <div className="gameHouseOfCardsWrapper">
                                <HouseOfCards
                                    cards={questions.array[questionIndex].flop}
                                    tableAction={tableAction}
                                    handIndex={handIndex}
                                />
                            </div>
                            <img src={Table} width={700}/>
                            <div className="gamePotWrapper">
                                <SmallText color="#FFF">POT <SmallText color="#FFF"
                                                                       bold>{`${numberWithCommas(pot)}`}</SmallText> ({`${numberWithCommas(questions.array[questionIndex].tableInfo.bb)} `}
                                    BB)</SmallText>
                            </div>

                        </div>
                        <div className="gameFooterContainer">
                            <div className="gamePlayerWrapper">
                                <Player
                                    pause={pause}
                                    setPause={setPause}
                                    replay={reset}
                                    speed={speed}
                                    setSpeed={(s) => speedHandler(s)}
                                    volume={5}
                                    favorite={false}
                                    rewind={back}
                                    fastForward={forward}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="gameQuestionWrapper">
                        <QuestionCard
                            loading={!finished}
                            headerText={questions.array[questionIndex].question.header}
                            questionNumber={questions.array[questionIndex].question.questionNumber}
                            description={questions.array[questionIndex].question.description}
                            options={questions.array[questionIndex].question.answers}
                            myTopics={props.myTopics}
                            topicData={questions.array[questionIndex].topicData}
                            callback={handleAnswerQuestion}
                            next={handleSubmit}/>
                    </div>
                </div>
            }
            <Modal visible={showModal} width="450" effect="fadeInUp" onClickAway={() => setShowModal(false)}>
                <div style={{backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div>
                        <BodyText>{`You finished all questions in this lesson. ${correctCounter}/${questions.array.length} correct`}</BodyText>
                        <Button onClick={() =>history.push('paths')} width={300} height={42} glow text="Go to Paths"/>
                        <Button onClick={() =>handleSkipLesson()} width={300} height={42} glow text="Next Lesson"/>
                    </div>
                </div>
            </Modal>
        </ScreenTemplate>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
        questions: state.gameState.questions,
        isFetchingGameData: state.gameState.isFetchingGameData,
        myTopics: state.screenTemplateState.myTopics
    };
}

const bindActions = (dispatch: any) => {
    return {
        fetchGameData: () => dispatch(ACTIONS.fetchGameData()),
        saveEarnings: (data: {questionID: number, chips: number, tickets: number }) => dispatch(ACTIONS.saveEarnings(data)),
        updateMyTopics: (questionID: number, correct: boolean, topicData: any) => dispatch(ACTIONS.updateMyTopics(questionID, correct, topicData)),
        updateDailyEarnings: (data: { chips: number, tickets: number }) => dispatch(PERFORMANCE_ACTIONS.updateDailyEarnings(data)),
        clearGameData: () => dispatch(ACTIONS.clearGameData())
    };
};

export default connect(mapStateToProps, bindActions)(Game);