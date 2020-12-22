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
        dealer: 3,
        ante: 2500,
        bb: 20000,
        sb: 10000,
        pot: 2000,
        players: 9,
        flop: ['Qd', 'Kh', '3h'],
        play: [
            {player: 1, action: 'ante', totalChips: 1215636, bet: 2500, cards: []},
            {player: 2, action: 'ante', totalChips: 361706, bet: 2500, cards: []},
            {player: 3, action: 'ante', totalChips: 643991, bet: 2500, cards: []},
            {player: 4, action: 'ante', totalChips: 1097921, bet: 2500, cards: []},
            {player: 5, action: 'ante', totalChips: 1232360, bet: 2500, cards: []},
            {player: 6, action: 'ante', totalChips: 1325678, bet: 2500, cards: []},
            {player: 7, action: 'ante', totalChips: 714859, bet: 2500, cards: []},
            {player: 8, action: 'ante', totalChips: 1378360, bet: 2500, cards: []},

            {player: 4, action: 'sb', bet: 10000, cards: []},
            {player: 5, action: 'bb', bet: 20000, cards: []},

            {player: 6, action: 'fold', bet: 0, cards: []},
            {player: 7, action: 'fold', bet: 0, cards: []},
            {player: 8, action: 'fold', bet: 0, cards: []},

            {player: 1, action: 'fold', bet: 0, cards: []},
            {player: 2, action: 'fold', bet: 0, cards: []},
            {player: 3, action: 'fold', bet: 0, cards: []},

            {player: 4, action: 'raise', bet: 60000 , cards: []},
            {player: 5, action: 'call', bet: 50000, cards: []}
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
    },
    {
        ante: 500,
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
                        action: {type: 'ante', amount: 10}
                    },
                    {
                        player: 2,
                        mp: 500,
                        action: {type: 'ante', amount: 10}
                    },
                    {
                        player: 3,
                        mp: 500,
                        action: {type: 'ante', amount: 10}
                    },
                    {
                        player: 4,
                        mp: 500,
                        action: {type: 'ante', amount: 10}
                    },
                    {
                        player: 5,
                        mp: 500,
                        action: {type: 'ante', amount: 10}
                    },
                    {
                        player: 6,
                        mp: 500,
                        action: {type: 'ante', amount: 10}
                    },
                    {
                        player: 7,
                        mp: 500,
                        action: {type: 'ante', amount: 10}
                    },
                    {
                        player: 8,
                        mp: 500,
                        action: {type: 'ante', amount: 10}
                    },
                    {
                        player: 9,
                        mp: 500,
                        action: {type: 'ante', amount: 10}
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
                        action: {type: 'fold', amount: 0}
                    },
                    {
                        player: 2,
                        cardOne: {value: 'three', type: 'clubs', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        sb: 5,
                        mp: 600,
                        action: {type: 'fold', amount: 0}
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
                        cardOne: {value: 'a', type: 'spades', show: true},
                        cardTwo: {value: 'two', type: 'hearts', show: true},
                        mp: 550,
                        action: {type: '', amount: 0}
                    },
                    {
                        player: 5,
                        cardOne: {value: 'four', type: 'diamonds', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        mp: 50,
                        action: {type: 'fold', amount: 0}
                    },
                    {
                        player: 6,
                        cardOne: {value: 'seven', type: 'hearts', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        mp: 90,
                        action: {type: 'fold', amount: 0}
                    },
                    {
                        player: 7,
                        cardOne: {value: 'q', type: 'clubs', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        mp: 100,
                        action: {type: 'fold', amount: 0}
                    },
                    {
                        player: 8,
                        cardOne: {value: 'six', type: 'diamonds', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        mp: 440,
                        action: {type: 'fold', amount: 0}
                    },
                    {
                        player: 9,
                        cardOne: {value: 'ten', type: 'spades', show: false},
                        cardTwo: {value: 'two', type: 'hearts', show: false},
                        mp: 20,
                        action: {type: 'fold', amount: 0}
                    }
                ]
            }
        ],
        question: {
            reward: {chips: 4, tickets: 1},
            description: 'Based on contextual information. What is the best decision?',
            header: 'Post Flop Problems',
            questionNumber: 2,
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
                    text: 'Raise',
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
        test();
    }, [])


    /*
            general{
                dealer: 3,
                ante: 2500,
                bb: 20000,
                sb: 10000,
                pot: 2000,
                players: 9,

            },
            flop[Qd, Kh, 3h ] ojo aqui si despues del flop hay mas acciones y llegan a mostrar mas cartas en la mesa (serian maximo 2 mas de esos 3 que se ven en el flop) se las agregas aqui en este arreglo
            play [
                {player: 1, action: 'ante', totalChips: 1215636, bet: 2500, cards: []}
                {player: 2, action: 'ante', totalChips: 361706, bet: 2500, cards: []}
                {player: 3, action: 'ante', totalChips: 643991, bet: 2500, cards: []}
                {player: 4, action: 'ante', totalChips: 1097921, bet: 2500, cards: []}
                {player: 5, action: 'ante', totalChips: 1232360, bet: 2500, cards: []}
                {player: 6, action: 'ante', totalChips: 1325678, bet: 2500, cards: []}
                {player: 7, action: 'ante', totalChips: 714859, bet: 2500, cards: []}
                {player: 8, action: 'ante', totalChips: 1378360, bet: 2500, cards: []}

                {player: 4, action: 'sb', bet: 10000, cards: []}
                {player: 5, action: 'bb', bet: 20000, cards: []}

                {player: 6, action: 'fold', bet: 0, cards: []}
                {player: 7, action: 'fold', bet: 0, cards: []}
                {player: 8, action: 'fold', bet: 0, cards: []}

                {player: 1, action: 'fold', bet: 0, cards: []}
                {player: 2, action: 'fold', bet: 0, cards: []}
                {player: 3, action: 'fold', bet: 0, cards: []}

                {player: 4, action: 'raise', bet: 60000 , cards: []}
                {player: 5, action: 'call', bet: 50000, cards: []}
            ]
     */
    const handHistoryJsonCreator = (generalInfo: {dealer: number, ante: number, bb: number, sb: number, pot: number, players: number}, flop: string[], play: {player: number, action: string, totalChips: number, bet: number, cards: string[]}[]) => {

    }

    const test = () => {
    const str = `***** Hand History for Game 18324551423 *****
        NL Texas Hold'em $5200 USD Buy-in Trny:201127594 Level:9  Blinds-Antes(10K/20K -2.5K) - Sunday,February 24, 13:23:46 PST 2019
        Table The Big Game: $1M Gtd (201127594) Table #10 (Real Money)
        Seat 3 is the button
        Total number of players : 8/8
        Seat 1: SanityWaterline ( 1,215,636  )
        Seat 2: ACHSO8000 ( 361,706  )
        Seat 3: SandaiKitetsu ( 643,991  )
        Seat 4: ChanceSeeYou ( 1,097,921  )
        Seat 5: its__showtime ( 1,232,360  )
        Seat 6: SiguiendoElFlow ( 1,325,678  )
        Seat 7: coolwhip81 ( 714,859  )
        Seat 8: TorTor2012 ( 1,378,360  )
        Trny:201127594 Level:9
        Blinds-Antes(10,000/20,000 -2,500)
        SanityWaterline posts ante [2,500 ]
        ACHSO8000 posts ante [2,500 ]
        SandaiKitetsu posts ante [2,500 ]
        ChanceSeeYou posts ante [2,500 ]
        its__showtime posts ante [2,500 ]
        SiguiendoElFlow posts ante [2,500 ]
        coolwhip81 posts ante [2,500 ]
        TorTor2012 posts ante [2,500 ]
        ChanceSeeYou posts small blind [10,000 ].
            its__showtime posts big blind [20,000 ].
        ** Dealing down cards **
        Dealt to ChanceSeeYou [ 5h, 7h ]
        SiguiendoElFlow folds
        coolwhip81 folds
        TorTor2012 folds
        SanityWaterline folds
        ACHSO8000 folds
        SandaiKitetsu folds
        ChanceSeeYou raises [ 60,000  ]
        its__showtime calls [ 50,000  ]
        ** Dealing Flop ** [ Qd, Kh, 3h ]`

        let dIndex = str.search('is the button')
        let dealer = str[dIndex -2];
        let sIndex = str.search('Seat 10')
        let pNum = str[sIndex+2];

        console.log(pNum, '.......');

    }

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
        }
        if (roundIndex > 0) {
            if (roundIndex === 1 && playerIndex < 3) {
                flop.array[0].show = false;
                flop.array[1].show = false;
                flop.array[2].show = false;
                flop.array[3].show = false;
                flop.array[4].show = false;
            } else if (roundIndex === 1 && playerIndex > 2) {
                flop.array[0].show = true;
                flop.array[1].show = true;
                flop.array[2].show = true;
            } else if (roundIndex === 2) {
                flop.array[0].show = true;
                flop.array[1].show = true;
                flop.array[2].show = true;
                flop.array[3].show = true;
            } else if (roundIndex === 3) {
                flop.array[0].show = true;
                flop.array[1].show = true;
                flop.array[2].show = true;
                flop.array[3].show = true;
                flop.array[4].show = true;
            }
            setFlop({array: flop.array, render: !flop.render});
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
            if (questions[questionIndex].rounds[roundIndex].seats[playerIndex].cardOne.show) {
                stop();
                setFinished(true);
                return;
            }
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
            if (questions[questionIndex].rounds[roundIndex].seats[playerIndex].cardOne.show) {
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
                                        fold={false}
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