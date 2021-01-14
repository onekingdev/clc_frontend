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
    reset: boolean
}

const TopicModal: React.FC<ITopicModal> = ({
                                               topic,
                                               setSelectedTopic,
                                               buyItem,
                                               reset
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
                    sessionStorage.setItem('selectedTopic', JSON.stringify(topic));
                    setTimeout(() => history.push('game'), 500);
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
    }

    return (
        <div className="registerModalContainer">
            <div>
                <TitleText>{topic.name}</TitleText>
            </div>
            <div>
                <BodyText>required mastered level to play: {topic.masteredLevel}</BodyText>
            </div>
            <div>
                <BodyText>Selected LESSON: {selectedName}</BodyText>
            </div>
            {topic.allTopicLessons && topic.allTopicLessons.length > 0 ?
                <div>
                    <BodyText>All LESSONS: </BodyText>
                    <div className="topicModalAllLessonsWrapper">
                        {topic.allTopicLessons.map((lesson: any) =>
                            <div className="topicModalLessonItemWrapper" onClick={() => changeSelectedLesson(lesson)}>
                                {lesson.mastered ?
                                    <FontAwesomeIcon
                                        color="#759A47"
                                        size="1x"
                                        icon={Icon['faCheck']}
                                        transform={{rotate: 0}}
                                        style={{marginRight: 5}}
                                    />
                                    : null}
                                <BodyText>{lesson.name}</BodyText>
                            </div>
                        )}
                    </div>
                </div>
                : null}
            <div>
                {topic.status === 0 && topic.chips !== 0 && topic.tickets !== 0 ?
                    <BodyText>{`buy for ${topic.chips} chips and ${topic.tickets} tickets`}</BodyText> : null}
            </div>
            {topic.status === 0 && topic.chips !== 0 && topic.tickets !== 0 || topic.status !== 0 ?
                <Button onClick={() => handleClick()} width="100%" height={44}
                        text={topic.status === 1 || topic.status === 2 ? 'Start' : 'Buy'} glow/>
                : null}

            <ErrorDisplay message={showErrorMsg} show={showErrorMsg !== ''}/>
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
