import React, {useState} from 'react';
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
import a_hearts from '../../assets/images/cards/A__hearts.png';
import a_spades from '../../assets/images/cards/A_spades.png';
import k_clubs from '../../assets/images/cards/K_clubs.png';
import k_diamonds from '../../assets/images/cards/K_diamonds.png';
import k_hearts from '../../assets/images/cards/K_hearts.png';
import k_spades from '../../assets/images/cards/K_spades.png';
import q_clubs from '../../assets/images/cards/Q_clubs.png';
import q_diamonds from '../../assets/images/cards/Q_diamonds.png';
import q_hearts from '../../assets/images/cards/Q_hearts.png';
import q_spades from '../../assets/images/cards/Q_spades.png';
import cardBack from '../../assets/images/cards/Cardback Default.png';
import chip from '../../assets/images/chip.png';
import BodyText from "../BodyText";

interface IPokerPlayer {
    player: number,
    cards: { value: string, type: string, show: boolean }[],
    mp: number,
    chips: number,
    chipPos: string,
    turn: boolean
}

const PokerPlayer: React.FC<IPokerPlayer> = ({
    player,
    cards,
    mp,
    chips,
    chipPos,
    turn
 }) => {

    const renderCard = (value: string) => {
        switch (value) {
            case 'two_clubs':
                return two_clubs;
            case 'two_diamonds':
                return two_diamonds;
            case 'two_hearts':
                return two_hearts;
            case 'two_spades':
                return two_spades;
            case 'three_clubs':
                return three_clubs;
            case 'three_diamonds':
                return three_diamonds;
            case 'three_hearts':
                return three_hearts;
            case 'three_spades':
                return three_spades;
            case 'four_clubs':
                return four_clubs;
            case 'four_diamonds':
                return four_diamonds;
            case 'four_hearts':
                return four_hearts;
            case 'four_spades':
                return four_spades;
            case 'five_clubs':
                return five_clubs;
            case 'five_diamonds':
                return five_diamonds;
            case 'five_hearts':
                return five_hearts;
            case 'five_spades':
                return five_spades;
            case 'six_clubs':
                return six_clubs;
            case 'six_diamonds':
                return six_diamonds;
            case 'six_hearts':
                return six_hearts;
            case 'six_spades':
                return six_spades;
            case 'seven_clubs':
                return seven_clubs;
            case 'seven_diamonds':
                return seven_diamonds;
            case 'seven_hearts':
                return seven_hearts;
            case 'seven_spades':
                return seven_spades;
            case 'eight_clubs':
                return eight_clubs;
            case 'eight_diamonds':
                return eight_diamonds;
            case 'eight_hearts':
                return eight_hearts;
            case 'eight_spades':
                return eight_spades;
            case 'nine_clubs':
                return nine_clubs;
            case 'nine_diamonds':
                return nine_diamonds;
            case 'nine_hearts':
                return nine_hearts;
            case 'nine_spades':
                return nine_spades;
            case 'ten_clubs':
                return ten_clubs;
            case 'ten_diamonds':
                return ten_diamonds;
            case 'ten_hearts':
                return ten_hearts;
            case 'ten_spades':
                return ten_spades;
            case 'a_clubs':
                return a_clubs;
            case 'a_diamonds':
                return a_diamonds;
            case 'a_hearts':
                return a_hearts
            case 'a_spades':
                return a_spades;
            case 'k_clubs':
                return k_clubs;
            case 'k_diamonds':
                return k_diamonds;
            case 'k_hearts':
                return k_hearts;
            case 'k_spades':
                return k_spades;
            case 'q_clubs':
                return q_clubs;
            case 'q_diamonds':
                return q_diamonds;
            case 'q_hearts':
                return q_hearts;
            case 'q_spades':
                return q_spades;
        }
    }

    const renderChips = (quantity: number) => {
        let array = []
        for (let i: number = 0; i < quantity; i++) {
            if (i < 6) {
                array.push(
                    <div style={chipPos === 'right' || chipPos === 'bottom' ? {marginBottom: -25} : {marginBottom: -25}}>
                        <img src={chip} width={20} height={20}/>
                    </div>
                )
            } else if (i < 11) {
                array.push(
                    <div style={chipPos === 'right' || chipPos === 'bottom' ? {marginBottom: -25, marginRight: 60} : {marginBottom: -25, marginRight: 60}}>
                        <img src={chip} width={20} height={20}/>
                    </div>
                )
            } else  if (i < 15) {
                array.push(
                    <div style={chipPos === 'right' || chipPos === 'bottom' ? {marginBottom: -25, marginLeft: 30} : {marginBottom: -25, marginLeft: 25}}>
                        <img src={chip} width={20} height={20}/>
                    </div>
                )
            }
        }
        return array;
    }

    return (
        <div className="pokerPlayerItemsWrapper">
            <div>
                {chipPos === 'left' || chipPos === 'top' ?
                    <div className={`pokerChips chipP${player}`}>
                        {renderChips(chips)}
                    </div>
                    : null}
                <div className="pokerPlayerItemsWrapper">
                    {cards.length > 0 ?
                        cards.map(card =>
                            <div className="pokerPlayerItemsWrapper">
                                <img src={!card.show ? cardBack : renderCard(`${card.value}_${card.type}`)} width={40}
                                     height={56}/>
                            </div>
                        ) : null}
                </div>
                <div className="pokerPlayerItemsWrapper"
                style={
                    turn ? {
                        borderRadius: 10,
                        borderColor: 'var(--primary)',
                        boxShadow: '0 0 10px var(--primary)'
                    } : {}
                }
                >
                    <div className="pokerPlayerMPWrapper">
                        <div style={{marginRight: 9}}>
                            <BodyText color="#FFF">MP</BodyText>
                        </div>
                        <div>
                            <BodyText color="#FFF" bold>{`${mp} BB`}</BodyText>
                        </div>
                    </div>
                </div>
                {chipPos === 'right' || chipPos === 'bottom' ?
                    <div className={`pokerChips chipP${player}`}>
                        {renderChips(chips)}
                    </div>
                    : null}
            </div>
        </div>
    );
}

export default PokerPlayer;