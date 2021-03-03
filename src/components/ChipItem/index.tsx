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
                <Bounce reverse={reverse}><SmallText color="#FFF" bold>{typeof quantity !== 'string' ? numberWithCommas(quantity) : quantity}</SmallText></Bounce>
                : size === 'medium' ?
                    <Bounce reverse={reverse}><SubtitleText bold>{typeof quantity !== 'string' ? numberWithCommas(quantity) : quantity}</SubtitleText></Bounce>
                    : size === 'large' ?
                        <Bounce reverse={reverse}><TitleText bold>{typeof quantity !== 'string' ? numberWithCommas(quantity) : quantity}</TitleText></Bounce>
                        :
                        <Bounce reverse={reverse}><SmallText color="#FFF" bold>{typeof quantity !== 'string' ? numberWithCommas(quantity) : quantity}</SmallText></Bounce>
            }
        </div>
    );
}

export default ChipItem;