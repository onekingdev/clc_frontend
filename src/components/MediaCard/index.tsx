import React, {useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import SubtitleText from "../SubtitleText";
import BodyText from "../BodyText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import {PulseLoader} from "react-spinners";

interface IMediaCard {
    image: string,
    duration?: number,
    title: string,
    description: string,
    onClick: () => void,
    link?: boolean,
    loading?: boolean,
    watched?: boolean,
}

const MediaCard: React.FC<IMediaCard> = ({
    image,
    duration,
    description,
    title,
    onClick,
    link,
    loading,
    watched
}) =>  {
    const [showPlay, setShowPlay] = useState(false);
    const [count, setCount] = useState(0);
    const [spanStyles, setSpanStyles] = useState({});

    let time = moment().startOf('day').seconds(duration ? duration : 0).format('H:mm:ss');

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
            style={{
                height: watched === undefined ? 281 : 300
            }}
            onClick={onClick}
            onMouseOver={() => setShowPlay(true)}
            onMouseLeave={() => setShowPlay(false)}>
            <div className="mediaCardBannerWrapper">
                {!link && showPlay ?
                    <div className="mediaCardImageCover">
                        <div className="topicCardPlayCircle">
                            <FontAwesomeIcon color="#FFF" size="1x" icon={Icon['faPlay']} transform={{ rotate: 0 }} />
                        </div>
                    </div>
                    : null}
                {!loading ? <div>
                    <img src={image} width={276} height={154}/>
                </div> :
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 281}}>
                        <PulseLoader loading color="#FFF"/>
                    </div>
                }
            </div>
            {!loading && duration ?
            <div className="topicCardTextWrapper">
                <SmallText>{time[0] === '0' && time[2] === '0' ? time.substr(3, time.length) : time[0] === '0' ? time.substr(1, time.length) : time}</SmallText>
            </div> : null}
            <div className="topicCardTextWrapper" style={{marginBottom: 12}}>
                <SubtitleText>{title}</SubtitleText>
            </div>
            {!loading && description && description.length > 0 ?
            <div className="topicCardTextWrapper">
                <BodyText>{description.length > 100 ? `${description.substr(0, 100)}...` : description}</BodyText>
            </div> : null}
            <div className="rippleContainer" onMouseDown={showRipple} onMouseUp={callCleanUp(cleanUp, 2000)}>
                {renderRippleSpan()}
            </div>
            {watched !== undefined ? 
            <div className="watch-part">
                {watched ? (<>
                    <span style={{ "color": "white" }}>Watched</span> 
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="23" height="23" rx="4" fill="#E8BA73"/>
                        <path d="M7.77041 14.1025C7.32995 13.4008 6.4041 13.1891 5.70247 13.6296C5.00084 14.07 4.78912 14.9959 5.22959 15.6975L7.77041 14.1025ZM8.75997 18.5L7.48955 19.2975C7.74685 19.7074 8.18607 19.9679 8.6691 19.9972C9.15214 20.0266 9.61964 19.821 9.92461 19.4453L8.75997 18.5ZM19.6646 7.44531C20.1867 6.80209 20.0885 5.85743 19.4453 5.33536C18.8021 4.81328 17.8574 4.91148 17.3354 5.55469L19.6646 7.44531ZM5.22959 15.6975L7.48955 19.2975L10.0304 17.7025L7.77041 14.1025L5.22959 15.6975ZM9.92461 19.4453L19.6646 7.44531L17.3354 5.55469L7.59532 17.5547L9.92461 19.4453Z" fill="#698A42"/>
                        <rect x="1" y="1" width="23" height="23" rx="4" stroke="#E8BA73" stroke-width="2"/>
                    </svg>
                </>) : (<>
                    <span style={{ "color": "white" }}>Watch</span> 
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="23" height="23" rx="4" fill="#15171A"/>
                        <rect x="1" y="1" width="23" height="23" rx="4" stroke="#E8BA73" stroke-width="2"/>
                    </svg>
                </>)}
            </div> : null}
        </div>
    );
}

export default MediaCard;