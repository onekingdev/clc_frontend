import React from 'react';
import './styles.css';
import SmallText from '../SmallText';
import BodyText from "../BodyText";
import * as Icon from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//import Spade from '../../assets/images/avatar_spade.png';
//import Club from '../../assets/images/avatar_club.png';
//import Diamond from '../../assets/images/avatar_diamond.png';
//import Heart from '../../assets/images/avatar_heart.png';

interface IAvatar {
    size: string, // small, medium, large
    image: string,
    text: string,
    rank?: number,
    bold?: boolean,
    onClick?: () => void,
    selected?: boolean
}

const Avatar: React.FC<IAvatar> = ({
    size,
    image,
    text,
    rank,
    bold,
    onClick,
    selected
}) =>  {
    const getSize = (s: string, min?: number) => {
        switch (s) {
            case 'small':
                return 24  - (min ? min : 0);
            case 'medium':
                return 50 - (min ? min : 0);
            case 'large':
                if (selected) return 120 - (min ? min : 0);
                return 128 - (min ? min : 0);
        }
    }

    const getImage = (image: string) => {
        switch (image) {
            default:
                return "none";
        }
    }

    return (
        <div>
            {rank ? <div className="avatarContainer" onClick={onClick} style={{cursor: 'pointer'}}>
                <div>
                    <div>
                        <SmallText color="#FFF" bold>{text}</SmallText>
                    </div>
                    <div>
                        <SmallText color="#76746C">{`Level${rank}`}</SmallText>
                    </div>
                </div>
                <div className={`avatarImage ${selected ? 'avatarSelected' : ''}`} style={{marginLeft: 16, width: getSize(size), height: getSize(size)}}>
                    <img src={getImage(image)} width={getSize(size, 30)} height={getSize(size, 30)}/>
                    {selected ? <div className="avatarCircle">
                        <FontAwesomeIcon color="#FFF" size="1x" icon={Icon['faCheck']}
                                         transform={{rotate: 0}}/>
                    </div> : null}
                </div>
            </div>
                :
            <div className="avatarContainer" onClick={onClick}>
                <div className={`avatarImage ${selected ? 'avatarSelected' : ''}`} style={{marginRight: 16, width: getSize(size), height: getSize(size)}}>
                    <img src={getImage(image)} width={getSize(size, size === 'large' ? 50 : 10)} height={getSize(size, size === 'large' ? 50 : 10)}/>
                    {selected ? <div className="avatarCircle">
                        <FontAwesomeIcon color="#FFF" size="1x" icon={Icon['faCheck']}
                                         transform={{rotate: 0}}/>
                    </div> : null}
                </div>
                <div>
                    {size === 'large' ? <BodyText color="#FFF" bold>{text}</BodyText>
                        : <SmallText color={bold ? 'var(--primary)' : '#FFF'} bold={bold}>{text}</SmallText>
                    }
                </div>
            </div>
            }
        </div>
    );
}

export default Avatar;
