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
                        <SmallText fontSize="22px" bold>{title}</SmallText>
                        <SubtitleText fontSize="20px" bold>${price}</SubtitleText> 
                    </div>
                    <div className="suscription-card-list">
                        <ul>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="14px">Access to 3000+ and Growing Questions</SmallText>
                            </li>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="14px">Access to 3000+ and Growing Questions</SmallText>
                            </li>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="14px">Access to 3000+ and Growing Questions</SmallText>
                            </li>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="14px">Weekly Hand Breakdown</SmallText>
                            </li>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="14px">Monthly Live Workshop</SmallText>
                            </li>
                            <li className="card-list-item">
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="14px">ClC Coaching Video Archive</SmallText>
                            </li>
                            <li className="card-list-item" style={{ opacity: benefitsActive ? 1 : 0.2}}>
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="14px">The Chip Leader 24/7 Community</SmallText>
                            </li>
                            <li className="card-list-item" style={{ opacity: benefitsActive ? 1 : 0.2}}>
                                <i className="fas fa-check card-check"></i>
                                <SmallText color="white" fontSize="14px">Ability to Submit a Hand for Review</SmallText>
                            </li>
                        </ul>
                        <div className="card-plan-button">
                            <Button
                                 
                                onClick={() => {handleGetMemberType(value)}}
                                width={170}
                                height={35}
                                glow
                                circular={false}
                                text={'Start now'}
                                fontSize="10px"
                                 />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuscriptionCard;