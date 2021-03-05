import React, {useState} from 'react';
import './styles.css';
import BodyText from "../BodyText";
import SmallText from "../SmallText";
import Button from "../Button";

interface IMonthEventCard {
    width: number,
    title: string,
    date: string,
    body: string,
    onClick: () => void
}

const MonthEventCard: React.FC<IMonthEventCard> = ({
    width,
    title,
    date,
    body,
    onClick
                                         }) =>  {

    return (
        <div className="monthEventCardContainer" style={width > 470 ? {width: width} : {}}>
            <div style={{width: '80%'}}>
                <div>
                    <BodyText color="var(--primary)" bold>{title}</BodyText>
                </div>
                <div style={{marginTop: 6}}>
                    <BodyText color="#FFF" bold>{date}</BodyText>
                </div>
                <div>
                    <SmallText color="#FFF">{body}</SmallText>
                </div>
            </div>
            <Button onClick={onClick} width={113} height={47} glow text="Register"/>
        </div>
    );
}

export default MonthEventCard;