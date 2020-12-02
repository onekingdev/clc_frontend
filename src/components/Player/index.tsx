import React, {useState} from 'react';
import './styles.css';
import Button from "../Button";
import BodyText from "../BodyText";

interface IPlayer {
    play: boolean,
    replay: boolean,
    speed: number,
    volume: number,
    favorite: boolean,
    rewind: boolean,
    fastForward: boolean,
    callback: () => void
}

const Player: React.FC<IPlayer> = ({
    play,
    replay,
    speed,
    volume,
    favorite,
    rewind,
    fastForward,
    callback
}) =>  {
    return (
        <div className="playerContainer">
            <Button onClick={() => {}} width={53} height={53} iconName="faBackward" transparent/>
            <div className="playerCircularButtonWrapper">
                <Button onClick={() => {}} width={53} height={53} glow iconName={!play ? 'faPlay' : 'faPause'} circular/>
            </div>
            <Button onClick={() => {}} width={53} height={53} iconName="faRedo" transparent/>
            <Button onClick={() => {}} width={53} height={53} iconName="faForward" transparent/>
            <BodyText color="#FFF">1X</BodyText>
            <input type="range" min="1" max="10" value={volume} className="playerProgressBar" id="myRange"/>
            <BodyText color="#FFF">10X</BodyText>
            <Button onClick={() => {}} width={53} height={53} iconName="faVolumeUp" transparent/>
            <Button onClick={() => {}} width={53} height={53} iconName="faStar" transparent selected/>
        </div>
    );
}

export default Player;