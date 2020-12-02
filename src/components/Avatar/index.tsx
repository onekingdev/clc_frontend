import React, {useState} from 'react';
import './styles.css';
import SmallText from '../SmallText';
import Chance from '../../assets/images/chance.png';

interface IAvatar {
    size: string, // small, medium, large
    image: string,
    text: string,
    rank?: number,
    bold?: boolean
}

const Avatar: React.FC<IAvatar> = ({
    size,
    image,
    text,
    rank,
    bold
}) =>  {
    const getSize = (s: string) => {
        switch (s) {
            case 'small':
                return 24;
            case 'medium':
                return 50;
            case 'large':
                return 58;
        }
    }
    return (
        <div className="">
            {rank ? <div className="avatarContainer">
                <div>
                    <div>
                        <SmallText color="#FFF" bold>{text}</SmallText>
                    </div>
                    <div>
                        <SmallText color="#76746C">{`Rank${rank}`}</SmallText>
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
                    <SmallText color={bold ? 'var(--primary)' : '#FFF'} bold={bold}>{text}</SmallText>
                </div>
            </div>
            }
        </div>
    );
}

export default Avatar;
