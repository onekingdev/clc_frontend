import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import * as PERFORMANCE_ACTIONS from '../Performance/store/actions';
import * as ACTIONS from './store/actions';
import * as RESULT_ACTIONS from '../Results/store/actions';
import './styles.css';
import Table from '../../assets/images/table.png';
import Player from "../../components/Player";
import HouseOfCards from "../../components/HouseOfCards";
import PokerPlayer from "../../components/PokerPlayer";
import QuestionCard from "../../components/QuestionCard";
import SmallText from "../../components/SmallText";
import ScreenTemplate from "../ScreenTemplate";
import {numberWithCommas, UTGLabeling} from '../../helpers/formatter';
import TitleText from "../../components/TitleText";
// @ts-ignore
import {useHistory} from 'react-router-dom';
// @ts-ignore
import Modal from 'react-awesome-modal';
import BodyText from "../../components/BodyText";
import Button from "../../components/Button";
import {setTicketsEarned} from "../Results/store/actions";

let interval: any;

function Game(props: any) {
    const history = useHistory();
    const pathname = new URL(window.location.href).pathname;
    let [correctCounter, setCorrectCounter] = useState(0);
    let [handIndex, setHandIndex] = useState(0);
    let [questionIndex, setQuestionIndex] = useState(0);
    let [pot, setPot] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [speed, setSpeed] = useState(1200);
    const [pause, setPause] = useState(true);
    const [finished, setFinished] = useState(false);
    const [tableAction, setTableAction] = useState('');
    const [questions, setQuestions]: any = useState({array: [], render: false});
    const [showModal, setShowModal] = useState(false);
    const [useStartIndex, setUseStartIndex] = useState(true);
    const [animationBlocker, setAnimationBlocker] = useState(0);
    const [initBlockPlayBtn, setInitBlockPlayBtn] = useState(true);

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
        if (initBlockPlayBtn) {
            setTimeout(() => setInitBlockPlayBtn(false), 2000);
        }
    }, [initBlockPlayBtn])

    useEffect(() => {
        if (props.questions && props.questions.length > 0) {
            setQuestions({array: props.questions, render: !questions.render})
        }
    },[props.questions])

    useEffect(() => {
        if (questions.array.length > 0) {
            calculateAllAnte();
        }
    }, [questions])

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    useEffect(() => {
        if (questions.array.length > 0) {
            if (pause) {
                stop();
            } else {
                setUseStartIndex(false);
                start();
            }
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

        if (animationBlocker < handIndex && handIndex > 0) {
            let index = handIndex;
            index -= 1;
            pot -= questions.array[questionIndex].hands[index+1].amount
            setPot(pot);
            setHandIndex(index);
            setTableAction(questions.array[questionIndex].hands[index].tableAction);
        }
    }

    const forward = () => {
        if (useStartIndex) return;
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
        setUseStartIndex(true);
        setInitBlockPlayBtn(true);
        setTimeout(() => calculateAllAnte(), 1000);
        // setTimeout(() => setPause(false), 500); //TODO: requested
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
            // saving for results
            let ticketsEarned = props.ticketsEarned;
            let chipsEarned = props.chipsEarned;
            props.setTicketsEarned(ticketsEarned += tickets);
            props.setChipsEarned(chipsEarned += chips);
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
        if (props.fetchNextAIQuestions) {
            props.fetchGameData();
            props.setFetchNextAIQuestions(false);
        } else if (questionIndex < questions.array.length-1) {
            setQuestionIndex(questionIndex += 1);
        } else if (pathname === '/assessment') {
            props.saveAssessment({
                ticketsEarned: props.ticketsEarned,
                chipsEarned: props.chipsEarned,
                correct: correctCounter + props.correctQuestions,
                totalQuestions: props.totalQuestions
            }, () => {
                history.push('results');
            })
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

    const renderSkipLessonBtn = () => {
        const topic = JSON.parse(sessionStorage.getItem('selectedTopic') as string);
        if (!topic || !topic.allTopicLessons) return null;
        if (topic.allTopicLessons.length > 0) {
            const lessonIndex = topic.allTopicLessons.findIndex((l: any) => l.UID === topic.lessonUID);
            if (topic.allTopicLessons.length - 1 === lessonIndex) return null;
        }
        return (
            <Button onClick={() =>handleSkipLesson()} width={300} height={42} glow text="Next Lesson"/>
        )
    }

    const renderSize = (width: number) => {
        const digits = width.toString();

        if (width < 600) {
            return `${0}.${parseInt(digits[0])-1}`;
        } if (width < 1000) {
            return `${0}.${parseInt(digits[0])-2}`;
        } else if (width < 1100) {
            return `${0}.${parseInt(digits[0])+7}`;
        } else if (width < 1300) {
            return `${parseInt(digits[0])}.${parseInt(digits[1])-6}`;
        } else if (width < 2000) {
            return `${parseInt(digits[0])}.${parseInt(digits[1])-3}${parseInt(digits[2])-3}`;
        } else if (width < 2700) {
            return `${parseInt(digits[0])-1}.${parseInt(digits[1])+3}`;
        } else if (width < 3000) {
            return `${parseInt(digits[0])}.${parseInt(digits[1])-6}`;
        }

        return `${parseInt(digits[0])-1}.${parseInt(digits[1])}${parseInt(digits[2])}`;
    }

    const calculateAllAnte = () => {
        let amount = 0;
        questions.array[questionIndex].hands.forEach((hand: any, index: number) => {
            if (hand.action === 'ante' || hand.action === 'posts the ante' || hand.action === 'posts ante') {
                setPot(amount += hand.amount);
                setHandIndex(index+1);
                setAnimationBlocker(index+1);
            }
        })
    }

    const share = () => {
        if (questions.array[questionIndex].topicData) {
            console.log(questions.array[questionIndex].topicData.UID)
            console.log(questions.array[questionIndex].topicData.lessonUID)
            console.log(questions.array[questionIndex].question.questionID)
        } else {
            const topic = JSON.parse(sessionStorage.getItem('selectedTopic') as string);
            console.log(topic.UID);
            console.log(topic.lessonUID);
            console.log(questions.array[questionIndex].question.questionID)
        }
    }

    return (
        <ScreenTemplate loading={props.isFetchingGameData}>
            {questions.array.length === 0 ?
                    <TitleText>You mastered all topics, go to your <a onClick={() => history.push('paths')}>paths</a> to review</TitleText>
                    :
                <div className="gameWrapper" style={{transform: `scale(${renderSize(width-100)})`}}>
                    <div>
                        <div className="gamePokerTableContainer">
                            {questions.array[questionIndex].players.length > 0 ?
                                questions.array[questionIndex].players.map((item: any, index: number) =>
                                    <div className={`gamePokerPlayerWrapper gameP${parseInt(item.number)}`}>
                                        <PokerPlayer
                                            index={index}
                                            UTGLabels={UTGLabeling(questions.array[questionIndex].tableInfo.dealer, questions.array[questionIndex].players)}
                                            players={questions.array[questionIndex].tableInfo.players}
                                            player={parseInt(item.number)}
                                            me={parseInt(item.number) === questions.array[questionIndex].hands[useStartIndex ? index :handIndex].player ? questions.array[questionIndex].hands[useStartIndex ? index :handIndex].cards.length > 0 : false}
                                            cards={parseInt(item.number) === questions.array[questionIndex].hands[useStartIndex ? index :handIndex].player ? questions.array[questionIndex].hands[useStartIndex ? index :handIndex].cards : questions.array[questionIndex].hands[getPastPlayerIndex(questions.array[questionIndex].hands, parseInt(item.number), useStartIndex ? index :handIndex)].cards}
                                            mp={item.initAmount}
                                            chipPos={parseInt(item.number) === questions.array[questionIndex].hands[useStartIndex ? index :handIndex].player ? handleChipPos(questions.array[questionIndex].hands[useStartIndex ? index :handIndex].player) : handleChipPos(questions.array[questionIndex].hands[getPastPlayerIndex(questions.array[questionIndex].hands, parseInt(item.number), useStartIndex ? index :handIndex)].player)}
                                            turn={parseInt(item.number) === questions.array[questionIndex].hands[useStartIndex ? index :handIndex].player}
                                            dealer={questions.array[questionIndex].tableInfo.dealer}
                                            action={parseInt(item.number) === questions.array[questionIndex].hands[useStartIndex ? index :handIndex].player ? questions.array[questionIndex].hands[useStartIndex ? index :handIndex].action : questions.array[questionIndex].hands[getPastPlayerIndex(questions.array[questionIndex].hands, parseInt(item.number), useStartIndex ? index :handIndex)].action}
                                            amount={parseInt(item.number) === questions.array[questionIndex].hands[useStartIndex ? index :handIndex].player ? questions.array[questionIndex].hands[useStartIndex ? index :handIndex].amount : questions.array[questionIndex].hands[getPastPlayerIndex(questions.array[questionIndex].hands, parseInt(item.number), useStartIndex ? index :handIndex)].amount}
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
                                    init={initBlockPlayBtn}
                                    pause={pause}
                                    setPause={setPause}
                                    replay={reset}
                                    speed={speed}
                                    setSpeed={(s) => speedHandler(s)}
                                    volume={5}
                                    favorite={false}
                                    rewind={back}
                                    fastForward={forward}
                                    finished={finished}
                                    share={share}
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
                        <Button onClick={() => history.push('paths')} width={300} height={42} glow text="Go to Paths"/>
                        {renderSkipLessonBtn()}
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
        fetchNextAIQuestions: state.gameState.fetchNextAIQuestions,
        isFetchingGameData: state.gameState.isFetchingGameData,
        myTopics: state.screenTemplateState.myTopics,
        ticketsEarned: state.resultState.ticketsEarned,
        chipsEarned: state.resultState.chipsEarned,
        correctQuestions: state.resultState.correctQuestions,
        totalQuestions: state.resultState.totalQuestions
    };
}

const bindActions = (dispatch: any) => {
    return {
        fetchGameData: () => dispatch(ACTIONS.fetchGameData()),
        setFetchNextAIQuestions: (fetch: boolean) => dispatch(ACTIONS.setFetchNextAIQuestions(fetch)),
        saveEarnings: (data: {questionID: number, chips: number, tickets: number }) => dispatch(ACTIONS.saveEarnings(data)),
        updateMyTopics: (questionID: number, correct: boolean, topicData: any) => dispatch(ACTIONS.updateMyTopics(questionID, correct, topicData)),
        updateDailyEarnings: (data: { chips: number, tickets: number }) => dispatch(PERFORMANCE_ACTIONS.updateDailyEarnings(data)),
        clearGameData: () => dispatch(ACTIONS.clearGameData()),
        setTicketsEarned: (tickets: number) => dispatch(RESULT_ACTIONS.setTicketsEarned(tickets)),
        setChipsEarned: (chips: number) => dispatch(RESULT_ACTIONS.setChipsEarned(chips)),
        setCorrectQuestions: (correct: number) => dispatch(RESULT_ACTIONS.setCorrectQuestions(correct)),
        setTotalQuestions: (questions: number) => dispatch(RESULT_ACTIONS.setTotalQuestions(questions)),
        saveAssessment: (assessment: { correct: number, totalQuestions: number, ticketsEarned: number, chipsEarned: number }, callback: () => void) => dispatch(RESULT_ACTIONS.saveAssessment(assessment, callback))
    };
};

export default connect(mapStateToProps, bindActions)(Game);