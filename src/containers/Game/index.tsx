import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
import Table from '../../assets/images/table.png';
import Player from "../../components/Player";
import HouseOfCards from "../../components/HouseOfCards";
import PokerPlayer from "../../components/PokerPlayer";
import QuestionCard from "../../components/QuestionCard";
import Button from "../../components/Button";
import SmallText from "../../components/SmallText";
import * as PERFORMANCE_ACTIONS from "../Performance/store/actions";
import ScreenTemplate from "../ScreenTemplate";

const players = [
    {
        player: 1,
        cardOne: {value: 'a', type: 'spades', show: true},
        cardTwo: {value: 'two', type: 'hearts', show: true}
    },
    {
        player: 2,
        cardOne: {value: 'k', type: 'diamonds', show: true},
        cardTwo: {value: 'tree', type: 'clubs', show: false}
    },
    {
        player: 3,
        cardOne: {value: 'a', type: 'hearts', show: true},
        cardTwo: {value: 'k', type: 'spades', show: false}
    },
    {
        player: 4,
        cardOne: {value: 'six', type: 'spades', show: true},
        cardTwo: {value: 'two', type: 'diamonds', show: false}
    },
    {
        player: 5,
        cardOne: {value: 'a', type: 'spades', show: true},
        cardTwo: {value: 'ten', type: 'clubs', show: false}
    },
    {
        player: 6,
        cardOne: {value: 'k', type: 'diamonds', show: true},
        cardTwo: {value: 'five', type: 'spades', show: false}
    },
    {
        player: 7,
        cardOne: {value: 'a', type: 'diamonds', show: true},
        cardTwo: {value: 'two', type: 'clubs', show: false}
    },
    {
        player: 8,
        cardOne: {value: 'q', type: 'clubs', show: true},
        cardTwo: {value: 'three', type: 'clubs', show: false}
    },
    {
        player: 9,
        cardOne: {value: 'ten', type: 'spades', show: true},
        cardTwo: {value: 'two', type: 'hearts', show: false}
    }
]

function Game(props: any) {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        // props.updateDailyEarnings({chips: 2, tickets: 1});
    }, [])

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    const QuestionBoxOptions = [
        <Button onClick={() => {
        }} width={343} height={47} text="Fold" answer="A."/>,
        <Button onClick={() => {
        }} width={343} height={47} text="3BET 2x this" answer="B."/>,
        <Button onClick={() => {
        }} width={343} height={47} text="3BET 2.5x this" answer="C."/>,
        <Button onClick={() => {
        }} width={343} height={47} text="3BET 3.5x this" answer="D."/>,
    ]

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

    return (
        <ScreenTemplate>
            <div className="gameWrapper" style={width > 1300 ? {} : {transform: `scale(${width / 1300})`}}>
                <div>
                    <div className="gamePokerTableContainer">
                        {players.length > 0 ?
                            players.map((player, index) =>
                                <div key={index} className={`gamePokerPlayerWrapper gameP${player.player}`}>
                                    <PokerPlayer
                                        player={player.player}
                                        cards={[player.cardOne, player.cardTwo]}
                                        mp={Math.floor(Math.random() * (200 - 0)) + 0}
                                        chips={Math.floor(Math.random() * (4 - 0)) + 0}
                                        chipPos={handleChipPos(player.player)}
                                        turn={index === 8}
                                        dealer={index === 7}
                                    />
                                </div>
                            ) : null}
                        <div className="gameHouseOfCardsWrapper">
                            <HouseOfCards cards={[
                                {value: 'a', type: 'clubs', show: true},
                                {value: 'two', type: 'diamonds', show: false},
                                {value: 'three', type: 'clubs', show: false},
                                {value: 'k', type: 'clubs', show: false},
                            ]}/>
                        </div>
                        <img src={Table} width={700}/>
                        <div className="gamePotWrapper">
                            <SmallText color="#FFF">POT <SmallText color="#FFF" bold>2,400</SmallText> (22
                                BB)</SmallText>
                        </div>
                    </div>
                    <div className="gameFooterContainer">
                        <div className="gamePlayerWrapper">
                            <Player
                                play={false}
                                replay={false}
                                speed={1}
                                volume={5}
                                favorite={false}
                                rewind={false}
                                fastForward={false}
                                callback={() => {
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="gameQuestionWrapper">
                    <QuestionCard
                        headerText="Post Flop Problems"
                        questionNumber={24}
                        description="Based on contextual information. What is the best decision?"
                        options={QuestionBoxOptions}
                        footerText="Mauris varius falis commodo impredit. crass faucibius egeases urnas, sed cursus massa cursus in. Ut aliquam loborus arcu. Fucsu id arcu eget nisi porta blandit etiam mollis massa et ipusm timndum"
                        status={2}
                    />
                </div>
            </div>
        </ScreenTemplate>
    );
}

const mapStateToProps = (state: any) => {
    return {
        players: state.gameState.players,
        flop: state.gameState.flop,
        questions: state.gameState.questions
    };
}

const bindActions = (dispatch: any) => {
    return {
        updateDailyEarnings: (data: { chips: number, tickets: number }) => dispatch(PERFORMANCE_ACTIONS.updateDailyEarnings(data))
    };
};

export default connect(mapStateToProps, bindActions)(Game);