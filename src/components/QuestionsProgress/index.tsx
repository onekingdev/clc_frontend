import React, {useEffect, useState} from 'react';
import './styles.css';
import BodyText from "../BodyText";
import ReactTooltip from "react-tooltip";

interface IQuestionProgress {
    totalQuestions: number,
    index: number,
    result: { id: number, correct: boolean | null }[],
    showFeedback: boolean,
    tooltip: string,
}

const QuestionProgress: React.FC<IQuestionProgress> = ({
                                                           totalQuestions,
                                                           index,
                                                           result,
                                                           showFeedback,
                                                           tooltip
                                                       }) => {

    useEffect(() => {
        let tooltip = document.querySelectorAll(`[data-tip]`)[0]
        ReactTooltip.show(tooltip)
    }, [])

    return (
        <div className="questionsProgressContainer">
            {result.map((r, i) =>
                <div className={
                    index === i ?
                        'questionsProgressActiveSquare blink_me'
                        : 'questionsProgressInactiveSquare'}
                         style={
                             r.correct === null &&  index !== i ? {background: '#0B0C0D'} :
                                 showFeedback ?
                             r.correct ?
                                     {
                                         background: '#759A47',
                                         boxShadow: '0px 0px 12px #759A47'
                                     } :
                                 r.correct === false ?
                                     {
                                         background: '#C75350',
                                         boxShadow: '0px 0px 12px rgba(199, 83, 80, 0.7)'

                                     } :
                                     {
                                         background: 'var(--primary)',
                                         boxShadow: '0px 0px 12px rgba(232, 186, 115, 0.7)'
                                     }
                                 :
                                {
                                     background: 'var(--primary)',
                                     boxShadow: '0px 0px 12px rgba(232, 186, 115, 0.7)'
                                }}
                >
                    {index === i && tooltip !== '' ? <span data-tip={tooltip} style={{zIndex: 99}} /> : null}
                </div>
            )}
            <ReactTooltip
                place="bottom"
                type="warning"
                effect="solid"
                multiline={true}
                offset={{top: -15}}
                backgroundColor="var(--primary)"
            />
            <div className="questionsProgressTextWrapper">
                <BodyText>{index}</BodyText>
                <BodyText>/</BodyText>
                <BodyText>{totalQuestions}</BodyText>
                <BodyText> Questions</BodyText>
            </div>
        </div>
    );
}

export default QuestionProgress;
