import React, {useEffect, useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import SubtitleText from "../SubtitleText";
import BodyText from "../BodyText";
import TitleText from "../TitleText";
import Button from "../Button";
import {DotLoader} from "react-spinners";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IQuestionCard {
    loading: boolean,
    headerText: string,
    questionNumber: number,
    description: string,
    options: any[],
    myTopics: any,
    topicData: any,
    callback: (correct: boolean) => void,
    next: () => void
}

const QuestionCard: React.FC<IQuestionCard> = ({
                                                   loading,
                                                   headerText,
                                                   questionNumber,
                                                   description,
                                                   options,
                                                   myTopics,
                                                   topicData,
                                                   callback,
                                                   next
                                               }) => {
    const [status, setStatus] = useState(0); // 0 = not answered, 1 = correct, 2 = wrong,
    const [explanation, setExplanation] = useState('');
    const [mastered, setMastered] = useState(false);

    useEffect(() => {
        setStatus(0);
        setExplanation('');
        //options = options.sort(() => .5 - Math.random());
        const topic = topicData ? topicData : JSON.parse(sessionStorage.getItem('selectedTopic') as string);
        const myTopicsIndex = myTopics.findIndex((t: any) => t.UID === topic.UID);
        if (myTopicsIndex > -1) {
            const lessonIndex = myTopics[myTopicsIndex].lessons.findIndex((t: any) => t.UID === topic.lessonUID);
            if (lessonIndex > -1 && myTopics[myTopicsIndex].lessons[lessonIndex].mastered) {
                setMastered(true);
            } else {
                setMastered(false);
            }
        }
    }, [questionNumber])

    return (
        <div className="questionCardContainer">
            <div className="questionCardTextWrapper"
                 style={{marginBottom: 8, display: 'flex', justifyContent: 'space-between'}}>
                <SmallText>{headerText}</SmallText>
                {mastered ?
                    <div>
                        <SmallText bold color="#759A47">Mastered</SmallText>
                        <FontAwesomeIcon
                            color="#759A47"
                            size="1x"
                            icon={Icon['faCheck']}
                            transform={{rotate: 0}}
                            style={{marginLeft: 5}}
                        />
                    </div> : null}
            </div>
            <div className="questionCardTextWrapper" style={{marginBottom: 16}}>
                <TitleText>{`Question #${questionNumber}`}</TitleText>
            </div>
            <div className="questionCardTextWrapper" style={{marginBottom: 24}}>
                <BodyText>{description}</BodyText>
            </div>
            {options.length > 0 ?
                options.map((item, index) => <div key={index} style={{marginBottom: 16}}>
                    {item.text ?
                        <Button disabled={status !== 0} onClick={() => {
                            callback(item.correct);
                            setStatus(item.correct ? 1 : 2);
                            setExplanation(item.explanation);
                        }} width={343} height={47} text={item.text}
                                answer={index === 0 ? 'A.' : index === 1 ? 'B.' : index === 2 ? 'C.' : index === 3 ? 'D.' : 'E.'}/>
                        : null}
                </div>) :
                <div className="questionCenterLoader">
                    <DotLoader loading={true} color="#FFF"/>
                </div>
            }
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
                    <BodyText>{explanation}</BodyText>
                    <div style={{marginTop: 50}}>
                        <Button onClick={() => {
                            next();
                        }} width={343} height={47} text="Next Question" selected glow/>
                    </div>
                </div>
            </div> : null}
        </div>
    );
}

export default QuestionCard;