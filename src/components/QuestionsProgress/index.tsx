import React, {useEffect, useState} from 'react';
import './styles.css';
import BodyText from "../BodyText";
import ReactTooltip from "react-tooltip";
import PulseLoader from 'react-spinners/PulseLoader';

interface IQuestionProgress {
    totalQuestions: number,
    index: number,
    result: { id: number, correct: boolean | null }[],
    showFeedback: boolean,
    tooltip: string,
    loading: boolean
}

const QuestionProgress: React.FC<IQuestionProgress> = ({
                                                           totalQuestions,
                                                           index,
                                                           result,
                                                           showFeedback,
                                                           tooltip,
                                                           loading
                                                       }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //let tooltip = document.querySelectorAll(`.questionProgressTooltip`)[0]
        //ReactTooltip.show(tooltip) // TODO: need to fix it...................................
    }, [])

    useEffect(() => {
        if (!loading) {
            setTimeout(() => setIsLoading(false), 500);
        }
    }, [loading])

    return (
        <div className="questionsProgressContainer">
            {isLoading ? <PulseLoader loading={true} color="#FFF"/> :
                <div className="questionsProgressContainer">
                    {result && result.map((r, i) =>
                        <div
                            key={i}
                            className={
                            index === i ?
                                'questionsProgressActiveSquare blink_me'
                                : 'questionsProgressInactiveSquare'}
                                 style={
                                     r.correct === null && index !== i ? {background: '#0B0C0D'} :
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
                            {index === i && tooltip !== '' ? <span data-tip={tooltip} style={{zIndex: 99}}/> : null}
                        </div>
                    )}
                    {/*<ReactTooltip
                        className="questionProgressTooltip"
                        place="bottom"
                        type="warning"
                        effect="solid"
                        multiline={true}
                        offset={{top: -15}}
                        backgroundColor="var(--primary)"
                    />*/}
                    <div className="questionsProgressTextWrapper">
                        <BodyText>{index}</BodyText>
                        <BodyText>/</BodyText>
                        <BodyText>{totalQuestions}</BodyText>
                        <BodyText> Questions</BodyText>
                    </div>
                </div>}
        </div>
    );
}

export default QuestionProgress;
