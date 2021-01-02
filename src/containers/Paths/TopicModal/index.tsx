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

interface ITopicModal {
    topic: any,
    setSelectedTopic: (topic: any) => void
}

const TopicModal: React.FC<ITopicModal> = ({
                                               topic,
                                               setSelectedTopic
                                           }) => {
    const history = useHistory();

    const handleClick = () => {
        if (topic.status === 0) {

        } else {
            localStorage.setItem('selectedTopic', JSON.stringify(topic));
            // setSelectedTopic(topic);
            setTimeout(() => history.push('game'), 500);
        }
    }

    return (
        <div className="registerModalContainer">
            <div>
                <TitleText>{topic.name}</TitleText>
            </div>
            <div>
                <BodyText>required mastered level: {topic.masteredLevel}</BodyText>
            </div>
            <div>
                <BodyText>LESSON: {topic.lessonName}</BodyText>
            </div>
            <div>
                {topic.status === 0 && topic.chips !== 0 && topic.tickets !== 0 ?
                    <BodyText>{`buy for ${topic.chips} chips and ${topic.tickets} tickets`}</BodyText> : null}
            </div>
            {topic.status === 0 && topic.chips !== 0 && topic.tickets !== 0 || topic.status !== 0 ?
                <Button onClick={() => handleClick()} width={300} height={44}
                        text={topic.status === 1 || topic.status === 2 ? 'Start' : 'Buy'} glow/>
                : null}
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {};
}

const bindActions = (dispatch: any) => {
    return {
        setSelectedTopic: (topic: any) => dispatch(ACTIONS.setSelectedTopic(topic))
    };
};

export default connect(mapStateToProps, bindActions)(TopicModal);
