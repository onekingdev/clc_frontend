import React, {useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import SubtitleText from "../SubtitleText";
import BodyText from "../BodyText";
import Button from "../Button";
import TitleText from "../TitleText";

interface IQuestionCard {
    headerText: string,
    questionNumber: number,
    description: string,
    options: any[],
    footerText: string,
    status: number // 0 = not answered, 1 = correct, 2 = wrong
}

const QuestionCard: React.FC<IQuestionCard> = ({
    headerText,
    questionNumber,
    description,
    options,
    footerText,
    status
}) =>  {
    return (
        <div className="questionCardContainer">
            <div className="questionCardTextWrapper" style={{marginBottom: 8}}>
                <SmallText>{headerText}</SmallText>
            </div>
            <div className="questionCardTextWrapper" style={{marginBottom: 16}}>
                <TitleText>{`Question #${questionNumber}`}</TitleText>
            </div>
            <div className="questionCardTextWrapper" style={{marginBottom: 24}}>
                <BodyText>{description}</BodyText>
            </div>
            {options.length > 0 ?
                options.map((item, index) => <div key={index} style={{marginBottom: 16}}>{item}</div>) : null}
            {status !== 0 ? <div className="questionCardFooterWrapper">
                {status === 1 ?
                    <div className="questionCardFooterHeaderWrapper">
                        <div className="questionCardIconWrapper" style={{backgroundColor: '#759A47', marginRight: 12}}>

                        </div>
                        <SubtitleText bold>Correct answer</SubtitleText>
                    </div>
                    :
                    <div className="questionCardFooterHeaderWrapper">
                        <div className="questionCardIconWrapper" style={{backgroundColor: '#C75350', marginRight: 12}}>

                        </div>
                        <SubtitleText bold>Incorrect answer</SubtitleText>
                    </div>
                }
                <div>
                    <BodyText>{footerText}</BodyText>
                </div>
            </div> : null}
        </div>
    );
}

export default QuestionCard;