import React, {useState} from 'react';
import './styles.css';
import BodyText from "../BodyText";
import TitleText from "../TitleText";
import CircularProgress from "../CircularProgress";

interface IProgressCard {
    values: number[],
    progressText: string,
    upperText: string,
    title: string,
    text: string
}

const ProgressCard: React.FC<IProgressCard> = ({
    values,
    progressText,
    upperText,
    title,
    text
                                   }) =>  {

    return (
        <div className="progressCardContainer">
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <div className="progressCardPercentageWrapper">
                    <CircularProgress type="default" values={values} text={progressText}/>
                </div>
            </div>
                <div>
                    <BodyText color="var(--primary)">{upperText}</BodyText>
                </div>
                <div className="progressCardTitleWrapper">
                    <TitleText>{title}</TitleText>
                </div>
                <div>
                    <BodyText>{text}</BodyText>
                </div>
        </div>
    );
}

export default ProgressCard;
