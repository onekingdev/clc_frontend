import React, {useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import SubtitleText from "../SubtitleText";
import BodyText from "../BodyText";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PathsCardLogo from '../../assets/images/pathsLogo.png';

interface ITopicCard {
    label: string,
    title: string,
    description: string,
    status: number // 0 = locked, 1 = available, 2 = mastered
}

const TopicCard: React.FC<ITopicCard> = ({
    label,
    title,
    description,
    status
}) =>  {
    const [count, setCount] = useState(0);
    const [spanStyles, setSpanStyles] = useState({});
    const [showPlay, setShowPlay] = useState(false);

    /* Debounce Code to call the Ripple removing function */
    const callCleanUp = (cleanup: () => void, delay: number) => {
        return () => {
            let bounce = setTimeout(() => {
                cleanup();
            }, delay);
            clearTimeout(bounce);
        }
    }

    const showRipple = (e: {pageX: number, pageY: number, currentTarget: any}) => {
        const rippleContainer = e.currentTarget;
        const size = rippleContainer.offsetWidth;
        const pos = rippleContainer.getBoundingClientRect();
        const x = e.pageX - pos.x - (size / 2);
        const y = e.pageY - pos.y - (size / 2);

        const s = { top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
        const c = count + 1;

        setSpanStyles({...spanStyles, [c] : s});
        setCount(c);
    }

    const cleanUp = () => {
        setCount(0);
        setSpanStyles({});
    }

    const renderRippleSpan = () => {
        const spanArray = Object.keys(spanStyles);
        if (spanArray && spanArray.length > 0) {
            return (
                spanArray.map((key, index) => {
                    // @ts-ignore
                    return <span key={'spanCount_' + index + '_S_' + status} className="" style={{...spanStyles[key]}}/>
                })
            )
        } else {
            return null;
        }
    }

    return (
        <div className="ripple topicCardContainer">
            <div className="topicCardBanner"
                 onMouseOver={() => setShowPlay(true)}
                 onMouseLeave={() => setShowPlay(false)}
            >
                {status === 0 ?
                    <div className="topicCardImageCover">
                        <div className="topicCardPlayCircle">
                            <FontAwesomeIcon color="#FFF" size="1x" icon={Icon['faPlay']} transform={{ rotate: 0 }} />
                        </div>
                        <div style={{marginLeft: 26, marginRight: 46}}>
                            <BodyText bold color="#FFF">Start now</BodyText>
                        </div>
                    </div>
                    : status === 1 ?
                        <div className="topicCardImageCover">
                            <FontAwesomeIcon color={'var(--primary)'} size="1x" icon={Icon['faLock']} transform={{ rotate: 0 }} />
                            <div style={{marginLeft: 16}}>
                                <BodyText bold color="#FFF">Locked</BodyText>
                            </div>
                        </div>
                        :
                        <div className="topicCardImageCover">
                            <div className="topicCardCheckCircle">
                                <FontAwesomeIcon color="#FFF" size="1x" icon={Icon['faCheck']} transform={{ rotate: 0 }} />
                            </div>
                            <div style={{marginLeft: 16}}>
                                <BodyText bold color="#FFF">Mastered</BodyText>
                            </div>
                        </div>
                }
                <img src={PathsCardLogo} width={259} height={140}/>
            </div>
            <div className="topicCardBottomWrapper">
                <div style={{marginTop: 80}}>
                    <div className="topicCardTextWrapper">
                        <SmallText>{label}</SmallText>
                    </div>
                    <div className="topicCardTextWrapper" style={{marginBottom: 12}}>
                        <SubtitleText>{title}</SubtitleText>
                    </div>
                    <div className="topicCardTextWrapper">
                        <BodyText>{description}</BodyText>
                    </div>
                </div>
            </div>
            <div className="rippleContainer" onMouseDown={showRipple} onMouseUp={callCleanUp(cleanUp, 2000)}>
                {renderRippleSpan()}
            </div>
        </div>
    );
}

export default TopicCard;