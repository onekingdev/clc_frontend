import React, {useEffect, useState} from 'react';
import './styles.css';
import two_clubs from '../../assets/images/cards/2_clubs.svg';
import two_diamonds from '../../assets/images/cards/2_diamonds.svg';
import two_hearts from '../../assets/images/cards/2_hearts.svg';
import two_spades from '../../assets/images/cards/2_spades.svg';
import three_clubs from '../../assets/images/cards/3_clubs.svg';
import three_diamonds from '../../assets/images/cards/3_diamonds.svg';
import three_hearts from '../../assets/images/cards/3_hearts.svg';
import three_spades from '../../assets/images/cards/3_spades.svg';
import four_clubs from '../../assets/images/cards/4_clubs.svg';
import four_diamonds from '../../assets/images/cards/4_diamonds.svg';
import four_hearts from '../../assets/images/cards/4_hearts.svg';
import four_spades from '../../assets/images/cards/4_spades.svg';
import five_clubs from '../../assets/images/cards/5_clubs.svg';
import five_diamonds from '../../assets/images/cards/5_diamonds.svg';
import five_hearts from '../../assets/images/cards/5_hearts.svg';
import five_spades from '../../assets/images/cards/5_spades.svg';
import six_clubs from '../../assets/images/cards/6_clubs.svg';
import six_diamonds from '../../assets/images/cards/6_diamonds.svg';
import six_hearts from '../../assets/images/cards/6_hearts.svg';
import six_spades from '../../assets/images/cards/6_spades.svg';
import seven_clubs from '../../assets/images/cards/7_clubs.svg';
import seven_diamonds from '../../assets/images/cards/7_diamonds.svg';
import seven_hearts from '../../assets/images/cards/7_hearts.svg';
import seven_spades from '../../assets/images/cards/7_spades.svg';
import eight_clubs from '../../assets/images/cards/8_clubs.svg';
import eight_diamonds from '../../assets/images/cards/8_diamonds.svg';
import eight_hearts from '../../assets/images/cards/8_hearts.svg';
import eight_spades from '../../assets/images/cards/8_spades.svg';
import nine_clubs from '../../assets/images/cards/9_clubs.svg';
import nine_diamonds from '../../assets/images/cards/9_diamonds.svg';
import nine_hearts from '../../assets/images/cards/9_hearts.svg';
import nine_spades from '../../assets/images/cards/9_spades.svg';
import ten_clubs from '../../assets/images/cards/10_clubs.svg';
import ten_diamonds from '../../assets/images/cards/10_diamonds.svg';
import ten_hearts from '../../assets/images/cards/10_hearts.svg';
import ten_spades from '../../assets/images/cards/10_spades.svg';
import a_clubs from '../../assets/images/cards/A_clubs.svg';
import a_diamonds from '../../assets/images/cards/A_diamonds.svg';
import a_hearts from '../../assets/images/cards/A_hearts.svg';
import a_spades from '../../assets/images/cards/A_spades.svg';
import k_clubs from '../../assets/images/cards/K_clubs.svg';
import k_diamonds from '../../assets/images/cards/K_diamonds.svg';
import k_hearts from '../../assets/images/cards/K_hearts.svg';
import k_spades from '../../assets/images/cards/K_spades.svg';
import q_clubs from '../../assets/images/cards/Q_clubs.svg';
import q_diamonds from '../../assets/images/cards/Q_diamonds.svg';
import q_hearts from '../../assets/images/cards/Q_hearts.svg';
import q_spades from '../../assets/images/cards/Q_spades.svg';
import j_clubs from '../../assets/images/cards/J_clubs.svg';
import j_diamonds from '../../assets/images/cards/J_diamonds.svg';
import j_hearts from '../../assets/images/cards/J_hearts.svg';
import j_spades from '../../assets/images/cards/J_spades.svg';
import {Flip} from 'react-awesome-reveal';
import cardBack from "../../assets/images/cards/Cardback Default.png";

interface IHouseOfCards {
    cards: string[],
    tableAction: string,
    handIndex: number,
    players: number
}

let flopIndex = 0;
let turnIndex = 0;
let riverIndex = 0;

const HouseOfCards: React.FC<IHouseOfCards> = ({
    cards,
    tableAction,
    handIndex,
    players
}) =>  {
    const [display, setDisplay] = useState([{card: '', show: false}, {card: '', show: false}, {card: '', show: false}, {card: '', show: false}, {card: '', show: false}])

    const renderCard = (value: string) => {
        switch (value) {
            case '2c':
                return two_clubs;
            case '2d':
                return two_diamonds;
            case '2h':
                return two_hearts;
            case '2s':
                return two_spades;
            case '3c':
                return three_clubs;
            case '3d':
                return three_diamonds;
            case '3h':
                return three_hearts;
            case '3s':
                return three_spades;
            case '4c':
                return four_clubs;
            case '4d':
                return four_diamonds;
            case '4h':
                return four_hearts;
            case '4s':
                return four_spades;
            case '5c':
                return five_clubs;
            case '5d':
                return five_diamonds;
            case '5h':
                return five_hearts;
            case '5s':
                return five_spades;
            case '6c':
                return six_clubs;
            case '6d':
                return six_diamonds;
            case '6h':
                return six_hearts;
            case '6s':
                return six_spades;
            case '7c':
                return seven_clubs;
            case '7d':
                return seven_diamonds;
            case '7h':
                return seven_hearts;
            case '7s':
                return seven_spades;
            case '8c':
                return eight_clubs;
            case '8d':
                return eight_diamonds;
            case '8h':
                return eight_hearts;
            case '8s':
                return eight_spades;
            case '9c':
                return nine_clubs;
            case '9d':
                return nine_diamonds;
            case '9h':
                return nine_hearts;
            case '9s':
                return nine_spades;
            case 'Tc':
                return ten_clubs;
            case 'Td':
                return ten_diamonds;
            case 'Th':
                return ten_hearts;
            case 'Ts':
                return ten_spades;
            case 'Ac':
                return a_clubs;
            case 'Ad':
                return a_diamonds;
            case 'Ah':
                return a_hearts
            case 'As':
                return a_spades;
            case 'Kc':
                return k_clubs;
            case 'Kd':
                return k_diamonds;
            case 'Kh':
                return k_hearts;
            case 'Ks':
                return k_spades;
            case 'Qc':
                return q_clubs;
            case 'Qd':
                return q_diamonds;
            case 'Qh':
                return q_hearts;
            case 'Qs':
                return q_spades;
            case 'Jc':
                return j_clubs;
            case 'Jd':
                return j_diamonds;
            case 'Jh':
                return j_hearts;
            case 'Js':
                return j_spades;
            default:
                return cardBack;
        }
    }

    useEffect(() => {
        if (handIndex === players) {
            const list: any = []
            if (cards.length >= 3) {
                cards.forEach(card => {
                    list.push({card, show: false});
                })
                if (cards.length === 3) list.push({card: '', show: false}, {card: '', show: false})
                else if (cards.length === 4) list.push({card: '', show: false})
            } else {
                for (let i = 0; i < 5; i++) list.push({card: '', show: false})
            }
            setDisplay(list)
        }
    }, [cards, handIndex])

    useEffect(() => {
        if (handIndex === 0) {
            flopIndex = 0;
            turnIndex = 0;
            riverIndex = 0;
        }

        if (tableAction === 'flop') {
            display[0].show = true;
            display[1].show = true;
            display[2].show = true;
            flopIndex = handIndex;
        } else if (tableAction === 'turn') {
            display[3].show = true;
            turnIndex = handIndex;
        } else if (tableAction === 'river') {
            display[4].show = true;
            riverIndex = handIndex;
        }

        if (flopIndex !== 0 && flopIndex > handIndex) {
            display[0].show = false;
            display[1].show = false;
            display[2].show = false;
            display[3].show = false;
            display[4].show = false;
        } else if (turnIndex !== 0 && turnIndex > handIndex) {
            display[3].show = false;
        } else if (riverIndex !== 0 && riverIndex > handIndex) {
            display[4].show = false;
        }
    }, [tableAction, handIndex])

    return (
        <div className="houseOfCardsContainer">
            {display.length > 0 ?
                display.map((item, index) =>
                    <div key={index} className="houseOfCardsEmpty">
                        {item.show ?
                            <Flip duration={1000}>
                                <img src={renderCard(item.card)} width={54}
                                  height={76}/>
                            </Flip>
                              : null}
                    </div>
                ) : null}
        </div>
    );
}

export default HouseOfCards;