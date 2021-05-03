import React, {useState} from 'react';
import './styles.css';
import Button from "../Button";
import BodyText from "../BodyText";

interface IPlayer {
    init: boolean,
    pause: boolean,
    setPause: (pause: boolean) => void,
    replay: () => void,
    speed: number,
    volume: number,
    favorite: boolean,
    rewind: () => void,
    fastForward: () => void,
    setSpeed: (speed: number) => void,
    share: () => void,
    finished: boolean,
    cash: () => void,
}

const Player: React.FC<IPlayer> = ({
    init,
    pause,
    setPause,
    replay,
    speed,
    volume,
    favorite,
    rewind,
    fastForward,
    setSpeed,
    share,
    finished,
    cash
}) =>  {
    const [typeMoney, setTypeMoney] = useState(false);
    return (
        <div className="playerContainer">
            <Button onClick={rewind} width={53} height={53} iconName="faBackward" transparent/>
            <div className="playerCircularButtonWrapper">
                <Button disabled={init || finished} onClick={() => setPause(!pause)} width={53} height={53} glow iconName={pause ? 'faPlay' : 'faPause'} circular/>
            </div>
            <Button onClick={() => replay()} width={53} height={53} iconName="faRedo" transparent/>
            <Button onClick={fastForward} width={53} height={53} iconName="faForward" transparent/>
            <BodyText color="#FFF">1X</BodyText>
            <input  type="range" min="500" max="2000" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} className="playerProgressBar" id="myRange"/>
            <BodyText color="#FFF">10X</BodyText>
            {/*<Button onClick={share} width={53} height={53} iconName="faShareAltSquare" transparent/>*/}
            <Button onClick={() => {}} width={53} height={53} iconName="faVolumeUp" transparent/>
            {/*<Button onClick={() => {
            }} width={53} height={53} iconName="faStar" transparent selected={favorite}/>*/}
            <Button onClick={() => {
                cash();
                typeMoney ? setTypeMoney(false) : setTypeMoney(true);
                }} width={40} height={40} text={typeMoney ? "$" : "BB"} circular/>
        </div>
    );
}

export default Player;