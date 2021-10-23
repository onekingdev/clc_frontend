import React from "react";
import Button from "../Button";
import SmallText from "../SmallText";
import SubtitleText from "../SubtitleText";
import "./styles.css"

interface ISuscriptionCard {
    title?: string,
    price?: number,
    benefitsActive?: boolean,
    value?: string,
    handleGetMemberType: (value:string | undefined) => void,
    
}

const SuscriptionCard : React.FC<ISuscriptionCard> = ({
    title, 
    price,
    benefitsActive,
    value,
    handleGetMemberType
    }) =>  {
    
    return(
        <>
            <div className="suscription-cards-container">
                <div className="suscription-card">
                    <div className="price-container">
                        <SmallText fontSize="14px" bold color={'rgb(232, 185, 113)'}>{title}</SmallText>
                        <SubtitleText fontSize="20px" bold>${price}</SubtitleText> 
                        <SmallText fontSize="16px">7 DAY FREE TRIAL. Cancel at anytime</SmallText> 
                    </div>
                    <div className="suscription-card-list">
                        <ul>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="16px">Full Access to Chip Leader AI Platform</SmallText>
                            </li>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="16px">Access to 3000+ and Growing Questions</SmallText>
                            </li>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="16px">CLC Coaching Video Archive</SmallText>
                            </li>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="16px">Weekly Hand Breakdown</SmallText>
                            </li>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="16px">2  Live Workshops Each Month</SmallText>
                            </li>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="16px">Full Tournament Assessment Engine</SmallText>
                            </li>
                            <li className="card-list-item" style={{ opacity: benefitsActive ? 1 : 0.2}}>
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="16px">Attend all Workshops Live</SmallText>
                            </li>
                            <li className="card-list-item" style={{ opacity: benefitsActive ? 1 : 0.2}}>
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="16px">The Chip Leader 24/7 Community lead by Alex and Chance</SmallText>
                            </li>
                        </ul>
                        <div className="card-plan-button">
                            <Button
                                 
                                onClick={() => {handleGetMemberType(value)}}
                                width={240}
                                height={52}
                                glow
                                circular={false}
                                text={'Start Now (FREE 7 DAY TRIAL)'}
                                fontSize="12px"
                                 />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuscriptionCard;