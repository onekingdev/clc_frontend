import React, {useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import TitleText from "../TitleText";
import BodyText from "../BodyText";
import computer from '../../assets/images/computer.png';
import Button from "../Button";
// @ts-ignore
import {useHistory} from 'react-router-dom';

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
    const history = useHistory();
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
                <img src={computer} width="80%"/>
                <div className="performanceCardButtonWrapper">
                    <Button onClick={() => history.push('payment')} width={300} height={55} text="Learn More About Our Programs" glow/>
                </div>
            </div>
        </div>
    );
}

export default PerformanceCard;