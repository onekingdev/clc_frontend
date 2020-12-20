import React, {useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import SubtitleText from "../SubtitleText";
import BodyText from "../BodyText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";

interface IMediaCard {
    image: string,
    duration: string,
    title: string,
    description: string,
    onClick: () => void
}

const MediaCard: React.FC<IMediaCard> = ({
    image,
    duration,
    description,
    title,
    onClick
}) =>  {
    const [showPlay, setShowPlay] = useState(false);
    const [count, setCount] = useState(0);
    const [spanStyles, setSpanStyles] = useState({});

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
                    return <span key={'spanCount_' + index} className="" style={{...spanStyles[key]}}/>
                })
            )
        } else {
            return null;
        }
    }
    return (
        <div
            className="ripple mediaCardContainer"
            onClick={onClick}
            onMouseOver={() => setShowPlay(true)}
            onMouseLeave={() => setShowPlay(false)}>
            <div className="mediaCardBannerWrapper">
                {showPlay ?
                    <div className="mediaCardImageCover">
                        <div className="topicCardPlayCircle">
                            <FontAwesomeIcon color="#FFF" size="1x" icon={Icon['faPlay']} transform={{ rotate: 0 }} />
                        </div>
                    </div>
                    : null}
                <div>
                    <img src={image} width={276} height={154}/>
                </div>
            </div>
            <div className="topicCardTextWrapper">
                <SmallText>{duration.substr(1, duration.length -2)}</SmallText>
            </div>
            <div className="topicCardTextWrapper" style={{marginBottom: 12}}>
                <SubtitleText>{title}</SubtitleText>
            </div>
            <div className="topicCardTextWrapper">
                <BodyText>{description.length > 100 ? `${description.substr(0, 100)}...` : description}</BodyText>
            </div>
            <div className="rippleContainer" onMouseDown={showRipple} onMouseUp={callCleanUp(cleanUp, 2000)}>
                {renderRippleSpan()}
            </div>
        </div>
    );
}

export default MediaCard;