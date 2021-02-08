import React, {useState} from 'react';
import './styles.css';
import SmallText from '../SmallText';
import Chance from '../../assets/images/chance.png';
import BodyText from "../BodyText";

interface IAvatar {
    size: string, // small, medium, large
    image: string,
    text: string,
    rank?: number,
    bold?: boolean,
    onClick?: () => void
}

const Avatar: React.FC<IAvatar> = ({
    size,
    image,
    text,
    rank,
    bold,
    onClick
}) =>  {
    const getSize = (s: string) => {
        switch (s) {
            case 'small':
                return 24;
            case 'medium':
                return 50;
            case 'large':
                return 80;
        }
    }
    return (
        <div className="">
            {rank ? <div className="avatarContainer" onClick={onClick} style={{cursor: 'pointer'}}>
                <div>
                    <div>
                        <SmallText color="#FFF" bold>{text}</SmallText>
                    </div>
                    <div>
                        <SmallText color="#76746C">{`Level${rank}`}</SmallText>
                    </div>
                </div>
                <div className="avatarImage" style={{marginLeft: 16}}>
                    <img src={image === '' ? Chance : image} width={getSize(size)} height={getSize(size)}/>
                </div>
            </div>
                :
            <div className="avatarContainer">
                <div className="avatarImage" style={{marginRight: 16}}>
                    <img src={image === '' ? Chance : image} width={getSize(size)} height={getSize(size)}/>
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
