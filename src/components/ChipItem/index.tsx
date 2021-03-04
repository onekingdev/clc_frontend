import React, {useEffect, useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import SubtitleText from "../SubtitleText";
import TitleText from "../TitleText";
import chipIcon from "../../assets/images/chip.png"
import cashIcon from "../../assets/images/plaque.png"
import {numberWithCommas} from '../../helpers/formatter'
import {Bounce} from "react-awesome-reveal";

interface IChipItem {
    icon: string, // chip, cash
    quantity: number | string,
    size: string, // small, medium, large
}

const ChipItem: React.FC<IChipItem> = ({
    icon,
    quantity,
    size
}) =>  {

    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        setReverse(true);
    }, [quantity])

    useEffect(() => {
        if (reverse) {
            setReverse(false)
        }
    }, [reverse])

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
                typeof quantity === 'string' || quantity > 0 ?
                <Bounce reverse={reverse} triggerOnce><SmallText color="#FFF" bold>{typeof quantity !== 'string' ? numberWithCommas(quantity) : quantity}</SmallText></Bounce>
                    : <SmallText color="#FFF" bold>0</SmallText>
                : size === 'medium' ?
                    typeof quantity === 'string' || quantity > 0 ?
                    <Bounce reverse={reverse} triggerOnce><SubtitleText bold>{typeof quantity !== 'string' ? numberWithCommas(quantity) : quantity}</SubtitleText></Bounce>
                        : <SubtitleText bold>0</SubtitleText>
                    : size === 'large' ?
                        typeof quantity === 'string' || quantity > 0 ?
                        <Bounce reverse={reverse} triggerOnce><TitleText bold>{typeof quantity !== 'string' ? numberWithCommas(quantity) : quantity}</TitleText></Bounce>
                            : <TitleText bold>0</TitleText>
                        :
                        typeof quantity === 'string' || quantity > 0 ?
                        <Bounce reverse={reverse} triggerOnce><SmallText color="#FFF" bold>{typeof quantity !== 'string' ? numberWithCommas(quantity) : quantity}</SmallText></Bounce>
                            : <SmallText color="#FFF" bold>0</SmallText>
            }
        </div>
    );
}

export default ChipItem;