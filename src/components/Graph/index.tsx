import React, {useState} from 'react';
import './styles.css';

import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend,
    // @ts-ignore
} from 'recharts';
import TitleText from '../TitleText';
import PulseLoader from 'react-spinners/PulseLoader';

interface IGraph {
    data: any[],
    width: number | string,
    loading: boolean
}

const Graph: React.FC<IGraph> = ({
                                     data,
                                     width,
                                     loading
                                 }) => {
    // useLagRadar();

    return (
        <div className="graphContainer" style={{width: width}}>
            {loading ?
                <div className="graphCenterLoader">
                    <PulseLoader loading={true} color="#FFF"/>
                </div>
                :
                <div>
                    {data.length ?
                        <ComposedChart
                            width={width}
                            height={400}
                            data={data}
                            margin={{
                                top: 20, right: 20, bottom: 20, left: 20,
                            }}
                        >
                            <CartesianGrid stroke="transparent"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="Tickets Earned" barSize={32} fill="#E8BA73"/>
                            <Area type="monotone" dataKey="Questions Correct" fill="rgba(117, 154, 71, 0.3)"
                                  stroke="rgba(117, 154, 71, 1)"/>
                        </ComposedChart> :
                        <div className="graphNoDataWrapper">
                            <TitleText>- NO DATA -</TitleText>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default Graph;