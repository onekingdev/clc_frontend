import React, {useState} from 'react';
import './styles.css';
import BodyText from "../BodyText";
import Avatar from "../Avatar";
import ChipItem from "../ChipItem";

interface IDataTable {
    query: string,
    data: any[],
    personalData: any,
    type: string,
    width?: number
}

const DataTable: React.FC<IDataTable> = ({
    query,
    data,
    type,
    personalData,
    width
}) =>  {
    return (
        <div className="dataTableContainer" style={width ? {width} : {}}>
            <div className="dataTableDataWrapper">
            {data.length > 0 ?
                data.map((item, index) =>
                    <div key={index} className="dataTableRow">
                        <div className="dataTableLeftColumn">
                            <BodyText>Rank {item.rank}</BodyText>
                        </div>
                        <div className="dataTableMiddleColumn">
                            <Avatar size="small" image={item.avatar} text={item.userName}/>
                        </div>
                        {type !== 'chips' ?
                            <div className="dataTableRightColumn">
                                <BodyText color="#FFF">{`${item[query].correct} Correct`}</BodyText>
                            </div> :
                            <div className="dataTableRightColumn">
                                <ChipItem icon="chip" quantity={item[query].chips} size="small"/>
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
                    <Avatar size="small" image={personalData.avatar} text="You" bold/>
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