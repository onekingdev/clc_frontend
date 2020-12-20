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
import {numberWithCommas} from '../../helpers/formatter';
import {Fade} from "react-awesome-reveal";
import {DotLoader} from "react-spinners";

const questions = [
    {
        anti: 500,
        bb: 10,
        sb: 5,
        pot: 2000,
        players: 9,
        flop: [
            {value: 'a', type: 'clubs', show: false},
            {value: 'a', type: 'diamonds', show: false},
            {value: 'three', type: 'clubs', show: false},
            {value: 'k', type: 'clubs', show: false},
            {value: 'seven', type: 'hearts', show: false},
        ],
        rounds: [
            {
                seats: [
                    {
                        player: 1,
                        mp: 500,
                        action: {type: 'anti', amount: 10}
                    },
                    {
                        player: 2,
                        mp: 500,
                        action: {type: 'anti', amount: 10}
                    },
                    {
                        player: 3,
                        mp: 500,
                        action: {type: 'anti', amount: 10}
                    },
                    {
                        player: 4,
                        mp: 500,
                        action: {type: 'anti', amount: 10}
                    },
                    {
                        player: 5,
                        mp: 500,
                        action: {type: 'anti', amount: 10}
                    },
                    {
                        player: 6,
                        mp: 500,
                        action: {type: 'anti', amount: 10}
                    },
                    {
                        player: 7,
                        mp: 500,
                        action: {type: 'anti', amount: 10}
                    },
                    {
                        player: 8,
                        mp: 500,
                        action: {type: 'anti', amount: 10}
                    },
                    {
                        player: 9,
                        mp: 500,
                        action: {type: 'anti', amount: 10}
                    },
                ]
            },
            {
                seats: [
                    {
                        player: 1,
                        cardOne: {value: 'a', type: 'diamonds', show: false},
                        cardTwo: {value: 'a', type: 'hearts', show: false},
                        dealer: true,
                        mp: 500,
                        action: {type: 'call', amount: 10}
                    },
                    {
                        player: 2,
                        cardOne: {value: 'three', type: 'clubs', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        sb: 5,
                        mp: 600,
                        action: {type: 'call', amount: 5}
                    },
                    {
                        player: 3,
                        cardOne: {value: 'k', type: 'diamonds', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        mp: 770,
                        bb: 10,
                        action: {type: 'call', amount: 10}
                    },
                    {
                        player: 4,
                        cardOne: {value: 'a', type: 'spades', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        mp: 550,
                        action: {type: 'call', amount: 10}
                    },
                    {
                        player: 5,
                        cardOne: {value: 'four', type: 'diamonds', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        mp: 50,
                        action: {type: 'call', amount: 10}
                    },
                    {
                        player: 6,
                        cardOne: {value: 'seven', type: 'hearts', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        mp: 90,
                        action: {type: 'call', amount: 10}
                    },
                    {
                        player: 7,
                        cardOne: {value: 'q', type: 'clubs', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        mp: 100,
                        action: {type: 'call', amount: 10}
                    },
                    {
                        player: 8,
                        cardOne: {value: 'six', type: 'diamonds', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        mp: 440,
                        action: {type: 'raise', amount: 30}
                    },
                    {
                        player: 9,
                        cardOne: {value: 'ten', type: 'spades', show: true},
                        cardTwo: {value: 'two', type: 'hearts', show: true},
                        mp: 20,
                        action: {type: '', amount: 0}
                    }
                ]
            }
        ],
        question: {
            reward: {chips: 4, tickets: 1},
            description: 'Based on contextual information. What is the best decision?',
            header: 'Post Flop Problems',
            questionNumber: 1,
            answers: [
                {
                    correct: false,
                    text: 'Call',
                    explanation: 'Mauris varius falis commodo impredit. crass faucibius egeases urnas, sed cursus massa cursus in. Ut aliquam loborus arcu. Fucsu id arcu eget nisi porta blandit etiam mollis massa et ipusm timndum'
                },
                {
                    correct: true,
                    text: 'Fold',
                    explanation: 'Mauris varius falis commodo impredit. crass faucibius egeases urnas, sed cursus massa cursus in. Ut aliquam loborus arcu. Fucsu id arcu eget nisi porta blandit etiam mollis massa et ipusm timndum'
                },
                {
                    correct: false,
                    text: 'Bet 2/3',
                    explanation: 'Mauris varius falis commodo impredit. crass faucibius egeases urnas, sed cursus massa cursus in. Ut aliquam loborus arcu. Fucsu id arcu eget nisi porta blandit etiam mollis massa et ipusm timndum'
                },
                {
                    correct: false,
                    text: 'Bet 1/3',
                    explanation: 'Mauris varius falis commodo impredit. crass faucibius egeases urnas, sed cursus massa cursus in. Ut aliquam loborus arcu. Fucsu id arcu eget nisi porta blandit etiam mollis massa et ipusm timndum'
                }
            ]
        }
    }
]

let interval: any;

function Game(props: any) {
    let [index, setIndex] = useState(-1);
    let [round, setRound] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [speed, setSpeed] = useState(1200);
    const [pause, setPause] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        props.setIsFetchingGameData(true);
    },[])

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    const back = () => {
        setPause(true)
        clearInterval(interval);
        if (index > 0) {
            setIndex(index -= 1);
        }
    }

    const forward = () => {
        clearInterval(interval);
        setPause(true)
        if (index < questions[0].players -1) {
            setIndex(index += 1);
        }
    }

    const move = () => {
        if (pause) return;
        if (index > questions[0].players-1) {
            if (questions[0].rounds.length-1 === round) setFinished(true);
            if (questions[0].rounds.length-1 > round) {
                reset();
                setRound(round += 1);
            }
        } else {
            setIndex(index += 1)
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

    const reset = () => {
        index = -1;
        setIndex(index);
        setPause(true)
        clearInterval(interval);
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
    }

    useEffect(() => {
        if (pause) stop();
        else start();
    }, [pause])

    useEffect(() => {
        if (round > 0) {
            start();
        }
    }, [round])

    useEffect(() => {
        if (finished) {
            stop();
            setIndex(questions[0].players-1);
        }
    }, [finished])

    // ScreenTemplate loading={props.isFetchingGameData}
    return (
        <div>
            <div className="gameWrapper" style={width > 1300 ? {} : {transform: `scale(${width / 1300})`}}>
                <div>
                    <div className="gamePokerTableContainer">
                        {questions[0].rounds[round].seats.length > 0 ?
                            //@ts-ignore
                            questions[0].rounds[round].seats.map((player: any, i: number) =>
                                <div key={i} className={`gamePokerPlayerWrapper gameP${player.player}`}>
                                    <PokerPlayer
                                        player={player.player}
                                        me={player.cardOne && player.cardOne.show && player.cardTwo.show}
                                        cards={player.cardOne ? [player.cardOne, player.cardTwo] : []}
                                        mp={player.mp}
                                        chips={index >= i ? player.sb || player.action.type === 'anti' ? 1 : player.action.type === 'call' || player.bb ? 2 : player.action.type === 'raise' ? 3 : 0 : 0}
                                        chipPos={handleChipPos(player.player)}
                                        turn={index === i}
                                        blind={player.sb ? 'SB' : player.bb ? 'BB' : ''}
                                        dealer={player.dealer}
                                        fold={false}
                                        action={index >= i ? player.action : {type: '', amount: 0}}/>
                                </div>
                            )
                            : null}
                        <div className="gameHouseOfCardsWrapper">
                            <HouseOfCards cards={questions[0].flop}/>
                        </div>
                        <img src={Table} width={700}/>
                        <div className="gamePotWrapper">
                            <SmallText color="#FFF">POT <SmallText color="#FFF" bold>{`${numberWithCommas(questions[0].pot)}`}</SmallText> ({`${numberWithCommas(questions[0].bb)} `}
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
                        headerText={questions[0].question.header}
                        questionNumber={questions[0].question.questionNumber}
                        description={questions[0].question.description}
                        options={questions[0].question.answers}
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