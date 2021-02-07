import React, {useState} from 'react';
import './styles.css';
import BodyText from "../BodyText";
import timer from '../../assets/images/timer.png'

interface IInfoCard {
    title: string,
    text: string,
    image: string
}

const InfoCard: React.FC<IInfoCard> = ({
    title,
    text,
    image
                                   }) =>  {
    const renderImage = (i: string) => {
        switch (i) {
            case 'timer':
                return <img src={timer} width={64} height={64} />
            default:
                return <img src={timer} width={64} height={64} />
        }
    }

    return (
        <div className="infoCardContainer">
            <div>
                {renderImage(image)}
            </div>
            <div>
                <div className="infoCardTitleWrapper">
                    <BodyText color="var(--primary)">{title}</BodyText>
                </div>
                <div className="infoCardTextWrapper">
                    <BodyText color="#FFF">{text}</BodyText>
                </div>
            </div>
        </div>
    );
}

export default InfoCard;
