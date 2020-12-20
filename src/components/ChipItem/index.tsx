import React, {useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import SubtitleText from "../SubtitleText";
import TitleText from "../TitleText";
import chipIcon from "../../assets/images/chip.png"
import cashIcon from "../../assets/images/plaque.png"
import {numberWithCommas} from '../../helpers/formatter'

interface IChipItem {
    icon: string, // chip, cash
    quantity: number,
    size: string, // small, medium, large
}

const ChipItem: React.FC<IChipItem> = ({
    icon,
    quantity,
    size
}) =>  {

    return (
        <div className="chipItemContainer">
            {icon === 'chip' ?
                <img src={chipIcon} style={{marginTop: 5, marginRight: 7.5}} width={18} height={18}/>
                :
                <div>
                    <div className="cashTopImageWrapper">
                        <img src={cashIcon} style={{marginRight: 7.5}} width={18} height={18}/>
                    </div>
                    <div className="cashBottomImageWrapper">
                        <img src={cashIcon} style={{marginRight: 7.5}} width={18} height={18}/>
                    </div>
                </div>
            }
            {size === 'small' ?
                <SmallText color="#FFF" bold>{numberWithCommas(quantity)}</SmallText>
                : size === 'medium' ?
                    <SubtitleText bold>{numberWithCommas(quantity)}</SubtitleText>
                    : size === 'large' ?
                        <TitleText bold>{numberWithCommas(quantity)}</TitleText>
                        :
                        <SmallText color="#FFF" bold>{numberWithCommas(quantity)}</SmallText>
            }
        </div>
    );
}

export default ChipItem;