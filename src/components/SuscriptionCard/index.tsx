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
    update?: boolean,
    handleGetMemberType: (value:string | undefined, interval: 'month' | 'year') => void,
    
}

const SuscriptionCard : React.FC<ISuscriptionCard> = ({
    title, 
    price,
    benefitsActive,
    value,
    update,
    handleGetMemberType
    }) =>  {
    
    return(
        <>
            <div className="suscription-cards-container">
                <div className="suscription-card">
                    <div className="price-container">
                        <SmallText fontSize="14px" bold color={'rgb(232, 185, 113)'}>{title}</SmallText>
                        <SubtitleText fontSize="20px" bold>${price}</SubtitleText> 
                        {!update && <SmallText fontSize="16px">7 DAY FREE TRIAL. Cancel at anytime</SmallText> }
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
                                <SmallText color="white" fontSize="16px">The Chip Leader 24/7 Community led by Alex and Chance</SmallText>
                            </li>
                        </ul>
                        <div className="card-plan-button">
                            <Button
                                onClick={() => {handleGetMemberType(value, 'month')}}
                                width={150}
                                height={42}
                                glow
                                circular={false}
                                text={update ? 'Update now' : 'Monthly'}
                                fontSize="12px"
                            />
                            <Button
                                onClick={() => {handleGetMemberType(value, 'year')}}
                                width={150}
                                height={42}
                                glow
                                circular={false}
                                text={update ? 'Update now' : 'Save 20% with annual'}
                                fontSize="12px"
                                bgGray={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuscriptionCard;