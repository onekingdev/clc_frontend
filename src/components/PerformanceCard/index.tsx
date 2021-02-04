import React, {useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import TitleText from "../TitleText";
import BodyText from "../BodyText";

interface IPerformanceCard {
    topText: string,
    title: string,
    bodyText: string,
    questions: string,
    percentage: string
}

const PerformanceCard: React.FC<IPerformanceCard> = ({
                                                         topText,
                                                         title,
                                                         bodyText,
                                                         questions,
                                                         percentage
                                                     }) => {
    return (
        <div className="performanceCardWrapper">
            <div className="performanceCardLeftWrapper">
                <div>
                    <SmallText>{topText}</SmallText>
                </div>
                <div style={{marginTop: 9, marginBottom: 8}}>
                    <TitleText>{title}</TitleText>
                </div>
                <div>
                    <BodyText>{bodyText}</BodyText>
                </div>
            </div>
            <div className="performanceCardRightWrapper">
                <div>
                    <TitleText>{`${percentage}%`}</TitleText>
                </div>
                <div style={{marginTop: 21}}>
                    <SmallText>{`${questions} QUESTIONS`}</SmallText>
                </div>
            </div>
        </div>
    );
}

export default PerformanceCard;