import React, {useEffect, useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import TitleText from "../TitleText";
import ChipItem from "../ChipItem";
import BodyText from "../BodyText";
import {Bounce} from "react-awesome-reveal";

interface IBanner {
    topText: string,
    title: string,
    footerValues?: number[] | string[],
    type?: string
}

const Banner: React.FC<IBanner> = ({
                                       topText,
                                       title,
                                       footerValues,
                                       type
                                   }) => {
    const [reverse, setReverse] = useState(true);

    useEffect(() => {
        setReverse(true);
    }, [footerValues])

    useEffect(() => {
        if (reverse) {
            setReverse(false)
        }
    }, [reverse])

    return (
        <div className="">
            <div style={{marginBottom: 57}}>
                <div>
                    <SmallText>{topText}</SmallText>
                </div>
                <div>
                    <TitleText>{title}</TitleText>
                </div>
            </div>
            {footerValues ? <div className="bannerFooterWrapper">
                <div style={{width: 150}}>
                    <div>
                        {typeof footerValues[0] === 'string' ?
                            <TitleText>{typeof footerValues[0] === 'string' ? footerValues[0].split('/')[0] : footerValues[0]}</TitleText>
                            : footerValues[0] > 0 ?
                                <Bounce reverse={reverse} triggerOnce>
                                    <TitleText>{footerValues[0]}</TitleText>
                                </Bounce>
                                : <TitleText>0</TitleText>}
                        {typeof footerValues[0] === 'string' ?
                            < BodyText color="#FFF">{`/${footerValues[0].split('/')[1]}`}</BodyText> : null}
                    </div>
                    <div>
                        <SmallText color="#FFF">QUESTIONS CORRECT</SmallText>
                    </div>
                </div>
                {type === 'results' ? <div className="bannerFooterLeftWrapper">
                    <div>
                        <TitleText>{footerValues[1]}</TitleText><BodyText color="#FFF">%</BodyText>
                    </div>
                    <SmallText color="#FFF">CORRECT</SmallText>
                </div> : null}
                {type === undefined ? <div className="bannerFooterMiddleWrapper">
                    <ChipItem icon="chip" quantity={footerValues[1]} size="large"/>
                    <SmallText color="#FFF">EARNED</SmallText>
                </div> : null}
                {type === undefined ? <div style={{width: 150}}>
                    <ChipItem icon="cash" quantity={footerValues[2]} size="large"/>
                    <SmallText color="#FFF">EARNED</SmallText>
                </div> : null}
            </div> : null}
        </div>
    );
}

export default Banner;