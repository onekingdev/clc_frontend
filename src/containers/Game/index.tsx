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
import Button from "../../components/Button";
import SmallText from "../../components/SmallText";
import ScreenTemplate from "../ScreenTemplate";
import {numberWithCommas, vimeoDataExtractor} from '../../helpers/formatter';
import {Fade} from "react-awesome-reveal";
import {DotLoader} from "react-spinners";

import {extract} from "../../helpers/jsonTransformation";

console.log(extract, '...............................')
const questions = [
    extract
]

let interval: any;

function Game(props: any) {
    let [handIndex, setHandIndex] = useState(0);
    let [questionIndex, setQuestionIndex] = useState(0);
    let [pot, setPot] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [speed, setSpeed] = useState(1200);
    const [pause, setPause] = useState(false);
    const [finished, setFinished] = useState(false);
    const [tableAction, setTableAction] = useState('');

    useEffect(() => {
        props.setIsFetchingGameData(true);
    },[])

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    useEffect(() => {
        if (pause) stop();
        else start();
    }, [pause])

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
            pot -= questions[questionIndex].hands[index+1].amount
            setPot(pot);
            setHandIndex(index);
            setTableAction(questions[questionIndex].hands[index].tableAction);
        }
    }

    const forward = () => {
        clearInterval(interval);
        setPause(true)

        if (questions[questionIndex].hands.length-1 === handIndex) {
            stop();
            setFinished(true);
            return;
        }
        if (handIndex < questions[questionIndex].hands.length -1) {
            let index = handIndex;
            index += 1;
            pot += questions[questionIndex].hands[index].amount
            setPot(pot);
            setHandIndex(index);
            setTableAction(questions[questionIndex].hands[index].tableAction);
        }

    }

    const move = () => {
        if (questions[questionIndex].hands.length-1 === handIndex) {
            stop();
            setFinished(true);
            return;
        }
        if (pause) return;
        if (handIndex < questions[questionIndex].hands.length -1) {
            setHandIndex(handIndex += 1);
            pot += questions[questionIndex].hands[handIndex].amount
            setPot(pot);
            setTableAction(questions[questionIndex].hands[handIndex].tableAction);
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

    const reset = (pause: boolean) => {
        setHandIndex(0);
        setPot(0);
        setFinished(false);
        setPause(pause);
        clearInterval(interval);

        //for (let i = 0; i <= 3; i++) flop.array[i].show = false;
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
            // const chips = questions[qNum].question.reward.chips;
            // const tickets = questions[qNum].question.reward.tickets;
            // props.updateDailyEarnings({chips: chips, tickets: tickets});
        }
    }

    const handleSubmit = () => {
        setFinished(false);
        props.setIsFetchingGameData(true);
        setQuestionIndex(questionIndex += 1);
        reset(false);
    }

    // ScreenTemplate loading={props.isFetchingGameData}
    return (
        <div>
            <div className="gameWrapper" style={width > 1300 ? {} : {transform: `scale(${width / 1300})`}}>
                <div>
                    <div className="gamePokerTableContainer">
                        {questions[questionIndex].players.length > 0 ?
                            questions[questionIndex].players.map(item =>
                                <div className={`gamePokerPlayerWrapper gameP${parseInt(item.number)}`}>
                                    <PokerPlayer
                                        players={questions[questionIndex].tableInfo.players}
                                        player={parseInt(item.number)}
                                        me={parseInt(item.number) === questions[questionIndex].hands[handIndex].player ? questions[questionIndex].hands[handIndex].cards.length > 0 : false}
                                        cards={parseInt(item.number) === questions[questionIndex].hands[handIndex].player ? questions[questionIndex].hands[handIndex].cards : questions[questionIndex].hands[getPastPlayerIndex(questions[questionIndex].hands,parseInt(item.number), handIndex)].cards}
                                        mp={item.initAmount}
                                        chipPos={parseInt(item.number) === questions[questionIndex].hands[handIndex].player ? handleChipPos(questions[questionIndex].hands[handIndex].player) : handleChipPos(questions[questionIndex].hands[getPastPlayerIndex(questions[questionIndex].hands,parseInt(item.number), handIndex)].player)}
                                        turn={parseInt(item.number) === questions[questionIndex].hands[handIndex].player}
                                        dealer={questions[questionIndex].tableInfo.dealer === parseInt(item.number)}
                                        action={parseInt(item.number) === questions[questionIndex].hands[handIndex].player ? questions[questionIndex].hands[handIndex].action : questions[questionIndex].hands[getPastPlayerIndex(questions[questionIndex].hands,parseInt(item.number), handIndex)].action}
                                        amount={parseInt(item.number) === questions[questionIndex].hands[handIndex].player ? questions[questionIndex].hands[handIndex].amount : questions[questionIndex].hands[getPastPlayerIndex(questions[questionIndex].hands,parseInt(item.number), handIndex)].amount}
                                        pot={pot}
                                    />
                                </div>
                            ): null}
                        <div className="gameHouseOfCardsWrapper">
                            <HouseOfCards
                                cards={questions[questionIndex].flop}
                                tableAction={tableAction}
                            />
                        </div>
                        <img src={Table} width={700}/>
                        <div className="gamePotWrapper">
                            <SmallText color="#FFF">POT <SmallText color="#FFF" bold>{`${numberWithCommas(pot)}`}</SmallText> ({`${numberWithCommas(questions[questionIndex].tableInfo.bb)} `}
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
                        headerText={questions[questionIndex].question.header}
                        questionNumber={questions[questionIndex].question.questionNumber}
                        description={questions[questionIndex].question.description}
                        options={questions[questionIndex].question.answers}
                        callback={handleAnswerQuestion}
                        next={handleSubmit}/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        players: state.gameState.players,
        flop: state.gameState.flop,
        questions: state.gameState.questions,
        isFetchingGameData: state.gameState.isFetchingGameData
    };
}

const bindActions = (dispatch: any) => {
    return {
        updateDailyEarnings: (data: { chips: number, tickets: number }) => dispatch(PERFORMANCE_ACTIONS.updateDailyEarnings(data)),
        setIsFetchingGameData: (data: boolean) => dispatch(ACTIONS.setIsFetchingGameData(data))
    };
};

export default connect(mapStateToProps, bindActions)(Game);