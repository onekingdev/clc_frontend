import React, {useState} from 'react';
import './styles.css';
import BodyText from "../BodyText";
import Avatar from "../Avatar";
import ChipItem from "../ChipItem";

interface IDataTable {
    data: any[],
    personalData: any,
    type: string
}

const DataTable: React.FC<IDataTable> = ({
    data,
    type,
    personalData
}) =>  {
    return (
        <div className="dataTableContainer">
            <div style={{height: 200, overflowY: 'scroll', paddingTop: 20}}>
            {data.length > 0 ?
                data.map((item) =>
                    <div className="dataTableRow">
                        <div className="dataTableLeftColumn">
                            <BodyText>Rank {item.rank}</BodyText>
                        </div>
                        <div className="dataTableMiddleColumn">
                            <Avatar size="small" image={item.image} text={`${item.firstName} ${item.lastName}`}/>
                        </div>
                        {type !== 'chips' ?
                            <div className="dataTableRightColumn">
                                <BodyText color="#FFF">{`${personalData.correctAnswers} Correct`}</BodyText>
                            </div> :
                            <div className="dataTableRightColumn">
                                <ChipItem icon="chip" quantity={item.chips} size="small"/>
                            </div>
                        }
                    </div>
                ) : null}
            </div>
            <div className="dataTableRow" style={{borderStyle: 'none'}}>
                <div className="dataTableLeftColumn">
                    <BodyText bold color="#FFF">{`Rank ${personalData.rank}`}</BodyText>
                </div>
                <div className="dataTableMiddleColumn">
                    <Avatar size="small" image={personalData.image} text="You" bold/>
                </div>
                {type !== 'chips' ?
                    <div className="dataTableRightColumn">
                        <BodyText bold color="#FFF">{`${personalData.correctAnswers} Correct`}</BodyText>
                    </div>
                    :
                    <div className="dataTableRightColumn">
                        <ChipItem icon="chip" quantity={personalData.chips} size="small"/>
                    </div>
                }
            </div>
        </div>
    );
}

export default DataTable;