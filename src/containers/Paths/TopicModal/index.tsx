import React, {useEffect, useState} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';

import * as ACTIONS from "../store/actions";
// @ts-ignore
import {useHistory} from 'react-router-dom';
import TitleText from "../../../components/TitleText";
import BodyText from "../../../components/BodyText";
import Button from "../../../components/Button";
import {formatMessageCode} from "../../../helpers/formatter";
import ErrorDisplay from "../../../components/ErrorDisplay";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ITopicModal {
    topic: any,
    setSelectedTopic: (topic: any) => void,
    buyItem: (item: any, callback: (data: any) => void) => void,
    reset: boolean,
    callback: () => void
}

const TopicModal: React.FC<ITopicModal> = ({
                                               topic,
                                               setSelectedTopic,
                                               buyItem,
                                               reset,
                                               callback
                                           }) => {
    const history = useHistory();
    const [showErrorMsg, setShowErrorMsg] = useState('');
    const [selectedName, setSelectedName] = useState('');

    useEffect(() => {
        setShowErrorMsg('');
    }, [reset]);

    useEffect(() => {
        setSelectedName(topic.lessonName);
    }, [topic.lessonName]);

    const handleClick = () => {
        if (topic.status === 0) {
            buyItem(topic, (data) => {
                if (data.correct) {
                    callback();
                } else {
                    setShowErrorMsg(formatMessageCode(data.msg));
                }
            });
        } else {
            sessionStorage.setItem('selectedTopic', JSON.stringify(topic));
            setTimeout(() => history.push('game'), 500);
        }
    }

    const changeSelectedLesson = (lesson: any) => {
        topic.lessonName = lesson.name;
        topic.lessonUID = lesson.UID;
        topic.rule = lesson.rule;
        setSelectedName(lesson.name);

        handleClick();
    }

    return (
        <div>
            <div>
                <div style={{textAlign: 'left'}}>
                    <TitleText>{topic.name}</TitleText>
                </div>
                <div style={{textAlign: 'left'}}>
                    <BodyText>required mastered level to play: {topic.masteredLevel}</BodyText>
                </div>
                {topic.allTopicLessons && topic.allTopicLessons.length > 0 ?
                    <div>
                        <div style={{textAlign: 'left'}}>
                            <BodyText>All LESSONS: </BodyText>
                        </div>
                        <div className="topicModalAllLessonsWrapper">
                            {topic.allTopicLessons.map((lesson: any) =>
                                <div className="topicModalLessonItemWrapper"
                                     onClick={() => changeSelectedLesson(lesson)}>
                                    <div className="topicModalPlayCircle">
                                        <FontAwesomeIcon
                                            color="#FFF"
                                            size="1x"
                                            icon={Icon['faPlay']}
                                            transform={{rotate: 0}}
                                        />
                                    </div>
                                    <div>
                                        <div>
                                            <BodyText bold color="#FFF">{lesson.name}</BodyText>
                                            {lesson.mastered ?<BodyText bold color="#759A47"> Mastered</BodyText> : null}
                                            {lesson.mastered ?
                                                <FontAwesomeIcon
                                                    color="#759A47"
                                                    size="1x"
                                                    icon={Icon['faCheck']}
                                                    transform={{rotate: 0}}
                                                    style={{marginLeft: 5}}
                                                />
                                                : null}
                                        </div>
                                        <div style={{marginTop: 8}}>
                                            <BodyText>{`${lesson.description.length > 40 ? lesson.description.substr(0, 40)+'...' : lesson.description}`}</BodyText>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    : null}
                <div>
                    {topic.status === 0 && topic.chips !== 0 && topic.tickets !== 0 ?
                        <BodyText>{`buy for ${topic.chips} chips and ${topic.tickets} tickets`}</BodyText> : null}
                </div>
                {topic.status === 0 && topic.chips !== 0 && topic.tickets !== 0 ?
                    <Button onClick={() => handleClick()} width="100%" height={44}
                            text="Buy" glow />
                    : null}
                <ErrorDisplay message={showErrorMsg} show={showErrorMsg !== ''}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {};
}

const bindActions = (dispatch: any) => {
    return {
        setSelectedTopic: (topic: any) => dispatch(ACTIONS.setSelectedTopic(topic)),
        buyItem: (item: any, callback: (data: any) => void) => dispatch(ACTIONS.buyItem(item, callback))
    };
};

export default connect(mapStateToProps, bindActions)(TopicModal);
