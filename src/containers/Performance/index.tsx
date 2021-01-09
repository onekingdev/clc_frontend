import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import * as ACTIONS from "./store/actions";
import './styles.css';
import Banner from "../../components/Banner";
import SmallText from "../../components/SmallText";
import performanceBg from "../../assets/images/performanceBg.png";
import TabNavigation from "../../components/TabNavigation";
import DataTable from "../../components/DataTable";
import Graph from "../../components/Graph";
import ScreenTemplate from "../ScreenTemplate";

function Performance(props: any) {
    const [width, setWidth] = useState(window.innerWidth);
    const [tab, setTab] = useState(0);
    const [query, setQuery] = useState('season');

    useEffect(() => {
        switch (tab) {
            case 0:
                props.fetchEarnings('season');
                setQuery('season')
                break;
            case 1:
                props.fetchEarnings('week');
                setQuery('week')
                break;
            case 2:
                props.fetchEarnings('month');
                setQuery('month')
                break;
            case 3:
                props.fetchEarnings('lifetime');
                setQuery('lifetime')
                break;
        }
    }, [tab])

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    return (
        <ScreenTemplate>
            <Banner topText="Track your progress" title="My Preformance" footerValues={[
                props.tableData.myCorrectQuestions, props.tableData.myChipsEarned, props.tickets
            ]}/>
            <div className="pathsImageWrapper">
                <img src={performanceBg} width="90%"/>
            </div>
            <div style={{marginTop: 72}}>
                <TabNavigation selectedIndex={tab} tabs={['This Season', 'This Week', 'This Month', 'Lifetime']}
                               callback={(index) => setTab(index)}/>
                <div className="performanceTablesWrapper">
                    <div style={{width: '50%'}}>
                        <div className="performanceTextWrapper">
                            <SmallText color="#FFF">
                                <SmallText bold>CORRECT</SmallText>
                                {' ANSWERS'}
                            </SmallText>
                        </div>
                        <div className="dataTableWrapper">
                            <DataTable
                                loading={props.isFetchingPerformanceData}
                                query={query}
                                data={props.tableData.correctQuestions}
                                type="correct"
                                personalData={{
                                    avatar: props.user.avatar,
                                    rank: props.tableData.myCorrectRank,
                                    chips: props.tableData.myChipsEarned,
                                    correctAnswers: props.tableData.myCorrectQuestions
                                }}
                                width={width < 1090 ? width - 120 : undefined}
                            />
                        </div>
                    </div>
                    <div style={{width: '50%'}}>
                        <div className="performanceTextWrapper">
                            <SmallText color="#FFF">
                                <SmallText bold>CHIPS</SmallText>
                                {' EARNED'}
                            </SmallText>
                        </div>
                        <div className="dataTableWrapper">
                            <DataTable
                                loading={props.isFetchingPerformanceData}
                                query={query}
                                data={props.tableData.chipsEarned}
                                type="chips"
                                personalData={{
                                    avatar: props.user.avatar,
                                    rank: props.tableData.myChipRank,
                                    chips: props.tableData.myChipsEarned,
                                    correctAnswers: props.tableData.myCorrectQuestions
                                }}
                                width={width < 1090 ? width - 120 : undefined}
                            />
                        </div>
                    </div>
                </div>
                <div className="performanceGraphWrapper bottomPadding">
                    <div>
                        <div className="performanceTextWrapper">
                            <SmallText color="#FFF">
                                <SmallText bold>ACTIVITY</SmallText>
                                {' LAST 7 DAYS'}
                            </SmallText>
                        </div>
                        <div className="graphWrapper">
                            <Graph loading={props.isFetchingPerformanceData} data={props.graphData} width={(width - 120) < 350 ? 350 : width - 120}/>
                        </div>
                    </div>
                </div>
            </div>
        </ScreenTemplate>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
        graphData: state.performanceState.graphData,
        tableData: state.performanceState.tableData,
        isFetchingPerformanceData: state.performanceState.isFetchingPerformanceData,
        chips: state.screenTemplateState.chips,
        tickets: state.screenTemplateState.tickets,
    };
}

const bindActions = (dispatch: any) => {
    return {
        fetchEarnings: (data: string) => dispatch(ACTIONS.fetchEarnings(data))
    };
};

export default connect(mapStateToProps, bindActions)(Performance);