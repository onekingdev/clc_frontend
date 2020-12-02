import React, {useState, useEffect} from 'react';
import './styles.css';
import {sidebarItems} from '../../helpers/constants';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import SidebarItem from '../../components/SidebarItem';
import Avatar from '../../components/Avatar';
import ChipItem from '../../components/ChipItem';
import Table from '../../assets/images/table.png';
import Player from "../../components/Player";
import HouseOfCards from "../../components/HouseOfCards";
import PokerPlayer from "../../components/PokerPlayer";
import QuestionCard from "../../components/QuestionCard";
import Button from "../../components/Button";
import Logo from "../../assets/images/clai-logo.png";
import SmallText from "../../components/SmallText";

const players = [
    {
        player: 1,
        cardOne: {value: 'a', type: 'spades', show: true},
        cardTwo: {value: 'two', type: 'hearts', show: false}
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
    },
    {
        player: 10,
        cardOne: {value: 'two', type: 'hearts', show: true},
        cardTwo: {value: 'five', type: 'clubs', show: false}
    }
]

function Game() {
    const [slider, setSlider] = useState(true);

    const QuestionBoxOptions = [
        <Button onClick={() => {}} width={343} height={47} text="Fold" answer="A."/>,
        <Button onClick={() => {}} width={343} height={47} text="3BET 2x this" answer="B."/>,
        <Button onClick={() => {}} width={343} height={47} text="3BET 2.5x this" answer="C."/>,
        <Button onClick={() => {}} width={343} height={47} text="3BET 3.5x this" answer="D."/>,
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
        <div>
            <Sidebar title="MENU" items={sidebarItems} upperButtons={[]} reverse={!slider}
                     closeButton={() => setSlider(false)}/>
            <Header
                left={
                    <div style={{marginLeft: 60}}>
                        <SidebarItem icon="hamburger" onClick={() => setSlider(true)}/>
                    </div>
                }
                middle={
                    <div className="libraryHeaderItemWrapper">
                        <img src={Logo} width={210} height={58}/>
                    </div>
                }
                right={
                    <div className="libraryHeaderItemWrapper">
                        <div style={{marginRight: 39}}>
                            <ChipItem icon="chip" quantity={25} size="small"/>
                        </div>
                        <div style={{marginRight: 54}}>
                            <ChipItem icon="cash" quantity={3} size="small"/>
                        </div>
                        <Avatar
                            size="medium"
                            image=""
                            text="Chance Franci"
                            rank={1}/>
                    </div>
                }
            />
            <div className="gameContentContainer" onClick={() => setSlider(false)}>
                <div className="gameWrapper">
                    <div>
                        <div className="gamePokerTableContainer">
                            {players.length > 0 ?
                                players.map((player, index) =>
                                    <div className={`gamePokerPlayerWrapper gameP${player.player}`}>
                                        <PokerPlayer
                                            player={player.player}
                                            cards={[player.cardOne, player.cardTwo]}
                                            mp={Math.floor(Math.random() * (200 - 0)) + 0}
                                            chips={Math.floor(Math.random() * (15 - 0)) + 0}
                                            chipPos={handleChipPos(player.player)}
                                            turn={index === 0}
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
                                <SmallText color="#FFF">POT <SmallText color="#FFF" bold>2,400</SmallText> (22 BB)</SmallText>
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
                    <QuestionCard
                        headerText="Post Flop Problems"
                        questionNumber={24}
                        description="Based on contextual information. What is the best decision?"
                        options={QuestionBoxOptions}
                        footerText="Mauris varius falis commodo impredit. crass faucibius egeases urnas, sed cursus massa cursus in. Ut aliquam loborus arcu. Fucsu id arcu eget nisi porta blandit etiam mollis massa et ipusm timndum"
                        status={0}
                    />
                </div>
            </div>
        </div>
    );
}

export default Game;