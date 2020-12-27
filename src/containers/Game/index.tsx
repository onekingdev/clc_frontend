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
    let [playerIndex, setPlayerIndex] = useState(-1);
    let [roundIndex, setRoundIndex] = useState(0);
    let [questionIndex, setQuestionIndex] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [speed, setSpeed] = useState(1200);
    const [pause, setPause] = useState(false);
    const [finished, setFinished] = useState(false);
    const [flop, setFlop] = useState({array: questions[questionIndex].flop, render: false});
    const [pot, setPot] = useState(questions[questionIndex].pot);

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

    useEffect(() => {
        if (playerIndex === -2) {
            setPause(false);
            if (roundIndex === 1) setPot(pot + (questions[questionIndex].ante * questions[questionIndex].players));
            if (roundIndex > 1) {
                let amount = 0;
                questions[questionIndex].rounds[roundIndex].seats.forEach(p => {
                    amount += p.action.amount;
                })
                setPot(amount + pot);
            }
        }
    }, [roundIndex, playerIndex])

    useEffect(() => {
        if (finished) {
            stop();
            //setPlayerIndex(questions[questionIndex].players-1);
        }
    }, [finished])

    useEffect(() => {
        if (playerIndex === -2) {
            setRoundIndex(0);
        }
    }, [playerIndex])

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    const back = () => {
        setPause(true);
        setFinished(false);
        clearInterval(interval);
        if (playerIndex === 0 && questions[questionIndex].rounds.length-1 === roundIndex) {
            setRoundIndex(roundIndex -= 1);
            setPlayerIndex(questions[questionIndex].players-1)
        }
        if (playerIndex > 0) {
            setPlayerIndex(playerIndex -= 1);
        }
    }

    const forward = () => {
        clearInterval(interval);
        setPause(true)
        if (roundIndex > 0 && playerIndex > -1) {
            // @ts-ignore
            /*if (questions[questionIndex].rounds[roundIndex].seats[playerIndex].cardOne.show) {
                stop();
                setFinished(true);
                return;
            }*/
        }
        if (playerIndex < questions[questionIndex].players -1) setPlayerIndex(playerIndex += 1);
        if (playerIndex === questions[questionIndex].players -1 && questions[questionIndex].rounds.length-1 > roundIndex) {
            setRoundIndex(roundIndex += 1);
            setPlayerIndex(-1);
            stop();
        }
    }

    const move = () => {
        if (roundIndex > 0 && playerIndex > -1) {
            // @ts-ignore
            /*if (questions[questionIndex].rounds[roundIndex].seats[playerIndex].cardOne.show) {
                stop();
                setFinished(true);
                return;
            }*/
            if (questions[questionIndex].rounds.length-1 === roundIndex && questions[questionIndex].rounds[roundIndex].seats.length-1 === playerIndex) {
                stop();
                setFinished(true);
                return;
            }
        }
        if (pause) return;
        if (playerIndex > questions[questionIndex].players-1) {
            // if (questions[questionIndex].rounds.length-1 === roundIndex) setFinished(true);
            if (questions[questionIndex].rounds.length-1 > roundIndex) {
                reset(true);
                setRoundIndex(roundIndex += 1);
            }
        } else {
            setPlayerIndex(playerIndex += 1)
        }
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
        playerIndex = -2;
        setPlayerIndex(playerIndex);
        setRoundIndex(0);
        setPot(0);
        setFinished(false);
        setPause(pause);
        clearInterval(interval);

        for (let i = 0; i <= 3; i++) flop.array[i].show = false;
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

    const checkTableActions = (tableAction: string) => {
        if (tableAction !== '') {
            if (tableAction === 'flop') {
                flop.array[0].show = true;
                flop.array[1].show = true;
                flop.array[2].show = true;
            } else if (tableAction === 'turn') {
                flop.array[0].show = true;
                flop.array[1].show = true;
                flop.array[2].show = true;
                flop.array[3].show = true;
            } else if (tableAction === 'river') {
                flop.array[0].show = true;
                flop.array[1].show = true;
                flop.array[2].show = true;
                flop.array[3].show = true;
                flop.array[4].show = true;
            }
            setFlop({array: flop.array, render: !flop.render});
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
                        {questions[questionIndex].rounds[roundIndex].seats.length > 0 ?
                            //@ts-ignore
                            questions[questionIndex].rounds[roundIndex].seats.map((player: any, i: number) =>
                                <div key={i} className={`gamePokerPlayerWrapper gameP${player.player}`}>
                                    <PokerPlayer
                                        player={player.player}
                                        me={player.cardOne && player.cardOne.show && player.cardTwo.show}
                                        cards={player.cardOne ? [player.cardOne, player.cardTwo] : []}
                                        mp={player.mp}
                                        chips={playerIndex >= i ? player.sb || player.action.type === 'ante' ? 1 : player.action.type === 'call' || player.bb ? 2 : player.action.type === 'raise' ? 3 : 0 : 0}
                                        chipPos={handleChipPos(player.player)}
                                        turn={playerIndex === i}
                                        blind={player.sb ? 'SB' : player.bb ? 'BB' : ''}
                                        dealer={player.dealer}
                                        tableAction={player.tableAction}
                                        onCall={(tableAction) => checkTableActions(tableAction)}
                                        action={playerIndex >= i ? player.action : {type: '', amount: 0}}/>
                                </div>
                            )
                            : null}
                        <div className="gameHouseOfCardsWrapper">
                            <HouseOfCards cards={flop.array}/>
                        </div>
                        <img src={Table} width={700}/>
                        <div className="gamePotWrapper">
                            <SmallText color="#FFF">POT <SmallText color="#FFF" bold>{`${numberWithCommas(pot)}`}</SmallText> ({`${numberWithCommas(questions[questionIndex].bb)} `}
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