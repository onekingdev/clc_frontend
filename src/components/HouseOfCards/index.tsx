import React, {useEffect, useState} from 'react';
import './styles.css';
import two_clubs from '../../assets/images/cards/2_clubs.png';
import two_diamonds from '../../assets/images/cards/2_diamonds.png';
import two_hearts from '../../assets/images/cards/2_hearts.png';
import two_spades from '../../assets/images/cards/2_spades.png';
import three_clubs from '../../assets/images/cards/3_clubs.png';
import three_diamonds from '../../assets/images/cards/3_diamonds.png';
import three_hearts from '../../assets/images/cards/3_hearts.png';
import three_spades from '../../assets/images/cards/3_spades.png';
import four_clubs from '../../assets/images/cards/4_clubs.png';
import four_diamonds from '../../assets/images/cards/4_diamonds.png';
import four_hearts from '../../assets/images/cards/4_hearts.png';
import four_spades from '../../assets/images/cards/4_spades.png';
import five_clubs from '../../assets/images/cards/5_clubs.png';
import five_diamonds from '../../assets/images/cards/5_diamonds.png';
import five_hearts from '../../assets/images/cards/5_hearts.png';
import five_spades from '../../assets/images/cards/5_spades.png';
import six_clubs from '../../assets/images/cards/6_clubs.png';
import six_diamonds from '../../assets/images/cards/6_diamonds.png';
import six_hearts from '../../assets/images/cards/6_hearts.png';
import six_spades from '../../assets/images/cards/6_spades.png';
import seven_clubs from '../../assets/images/cards/7_clubs.png';
import seven_diamonds from '../../assets/images/cards/7_diamonds.png';
import seven_hearts from '../../assets/images/cards/7_hearts.png';
import seven_spades from '../../assets/images/cards/7_spades.png';
import eight_clubs from '../../assets/images/cards/8_clubs.png';
import eight_diamonds from '../../assets/images/cards/8_diamonds.png';
import eight_hearts from '../../assets/images/cards/8_hearts.png';
import eight_spades from '../../assets/images/cards/8_spades.png';
import nine_clubs from '../../assets/images/cards/9_clubs.png';
import nine_diamonds from '../../assets/images/cards/9_diamonds.png';
import nine_hearts from '../../assets/images/cards/9_hearts.png';
import nine_spades from '../../assets/images/cards/9_spades.png';
import ten_clubs from '../../assets/images/cards/10_clubs.png';
import ten_diamonds from '../../assets/images/cards/10_diamonds.png';
import ten_hearts from '../../assets/images/cards/10_hearts.png';
import ten_spades from '../../assets/images/cards/10_spades.png';
import a_clubs from '../../assets/images/cards/A_clubs.png';
import a_diamonds from '../../assets/images/cards/A_diamonds.png';
import a_hearts from '../../assets/images/cards/A_hearts.png';
import a_spades from '../../assets/images/cards/A_spades.png';
import k_clubs from '../../assets/images/cards/K_clubs.png';
import k_diamonds from '../../assets/images/cards/K_diamonds.png';
import k_hearts from '../../assets/images/cards/K_hearts.png';
import k_spades from '../../assets/images/cards/K_spades.png';
import q_clubs from '../../assets/images/cards/Q_clubs.png';
import q_diamonds from '../../assets/images/cards/Q_diamonds.png';
import q_hearts from '../../assets/images/cards/Q_hearts.png';
import q_spades from '../../assets/images/cards/Q_spades.png';
import back from '../../assets/images/cards/Cardback Default.png';
import {Flip} from 'react-awesome-reveal';
import cardBack from "../../assets/images/cards/Cardback Default.png";

interface IHouseOfCards {
    cards: string[],
    tableAction: string
}

const HouseOfCards: React.FC<IHouseOfCards> = ({
    cards,
    tableAction
}) =>  {
    const [display, setDisplay] = useState([{card: '', show: false}])

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
                return five_diamonds; //TODO: need this card
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
                return q_clubs;
            case 'Jd':
                return q_diamonds;
            case 'Jh':
                return q_hearts;
            case 'Js':
                return q_spades;
            default:
                return cardBack;
        }
    }

    useEffect(() => {
        const list: any = []
        cards.forEach(card => {
            list.push({card, show: false});
        })
        if (cards.length === 3) list.push({card: '', show: false}, {card: '', show: false})
        else if (cards.length === 4) list.push({card: '', show: false})
        setDisplay(list)
    }, [])

    useEffect(() => {
        if (tableAction === 'flop') {
            display[0].show = true;
            display[1].show = true;
            display[2].show = true;
        } else if (tableAction === 'turn') {
            display[3].show = true;
        } else if (tableAction === 'river') {
            display[4].show = true;
        }
    }, [tableAction])

    return (
        <div className="houseOfCardsContainer">
            {display.length > 0 ?
                display.map((item, index) =>
                    <div key={index} className="houseOfCardsEmpty">
                        {item.show ?
                            <Flip>
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