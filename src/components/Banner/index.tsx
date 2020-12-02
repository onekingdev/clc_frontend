import React, {useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import TitleText from "../TitleText";
import ChipItem from "../ChipItem";

interface IBanner {
    topText: string,
    title: string,
    footerValues?: number[]
}

const Banner: React.FC<IBanner> = ({
                                       topText,
                                       title,
                                       footerValues
                                   }) => {
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
                        <TitleText>{footerValues[0]}</TitleText>
                    </div>
                    <div>
                        <SmallText color="#FFF">QUESTIONS CORRECT</SmallText>
                    </div>
                </div>
                <div className="bannerFooterMiddleWrapper">
                    <ChipItem icon="chip" quantity={footerValues[1]} size="large"/>
                    <SmallText color="#FFF">EARNED</SmallText>
                </div>
                <div style={{width: 150}}>
                    <ChipItem icon="cash" quantity={footerValues[2]} size="large"/>
                    <SmallText color="#FFF">EARNED</SmallText>
                </div>
            </div> : null}
        </div>
    );
}

export default Banner;