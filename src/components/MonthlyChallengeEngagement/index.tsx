import React, {useState} from 'react';
import moment from "moment";
import './styles.css';
import SmallText from "../SmallText";
import TitleText from "../TitleText";
import ChipItem from "../ChipItem";
import BodyText from "../BodyText";

interface IMonthlyChallengeEngagement {
    month: string,
    year: string,
    days: number[],
    totalDays: number
}

const MonthlyChallengeEngagement: React.FC<IMonthlyChallengeEngagement> = ({
    month,
    year,
    days,
    totalDays
                                   }) => {

    const renderSpots = (d: number[], t: number, templateDays: number) => {
        let items: any = [];

        for (let i = 1; i <= templateDays; i++) {
            if(i <= moment().startOf("month").day()){
                items.push(<div className="monthlyChallengeEngagementNullWrapper" />)
            }
            else if (d.includes(i - moment().startOf("month").day())) {
                items.push(<div className="monthlyChallengeEngagementActiveWrapper" />)
            } 
            else if (i <= (t + moment().startOf("month").day())){
                items.push(<div className="monthlyChallengeEngagementInActiveWrapper" />)
            }
            else{
                items.push(<div className="monthlyChallengeEngagementNullWrapper" />)
            }
        }

        return items;
    }
    console.log(moment().startOf("month").day())
    return (
        <div className="monthlyChallengeEngagementWrapper">
            <div style={{marginRight: 20}}>
                <div style={{textAlign: 'left'}}>
                    <TitleText color="var(--primary)" bold>{days ? days.length : 0}</TitleText>
                    <BodyText color="#FFF" bold>{`/${totalDays ? totalDays : 0}`}</BodyText>
                </div>
                <div style={{textAlign: 'left'}}>
                    <div>
                        <BodyText color="#FFF">DAYS</BodyText>
                    </div>
                    <div>
                        <BodyText color="#FFF">PRACTICING</BodyText>
                    </div>
                </div>
            </div>
            <div style={{width: 140}}>
                <div>
                    <BodyText color="#FFF" bold>{`${month} ${year}`}</BodyText>
                </div>
                <div className="monthlyChallengeEngagementDayWrapper">
                    <BodyText color="#FFF">S</BodyText>
                    <BodyText color="#FFF">M</BodyText>
                    <BodyText color="#FFF">T</BodyText>
                    <BodyText color="#FFF">W</BodyText>
                    <BodyText color="#FFF">T</BodyText>
                    <BodyText color="#FFF">F</BodyText>
                    <BodyText color="#FFF">S</BodyText>
                </div>
                <div className="monthlyChallengeEngagementCalendarWrapper">
                    {renderSpots(days, totalDays, 35)}
                </div>
            </div>
        </div>
    );
}

export default MonthlyChallengeEngagement;