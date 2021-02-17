import React, {useState, useEffect} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
// @ts-ignore
import {useHistory} from 'react-router-dom';
import ScreenTemplate from "../ScreenTemplate";
import Button from "../../components/Button";
import BodyText from "../../components/BodyText";
import TitleText from "../../components/TitleText";
import InfoCard from "../../components/InfoCard";
import * as PERFORMANCE_ACTIONS from '../Performance/store/actions';
import Banner from "../../components/Banner";
import homeBg from "../../assets/images/home-bg.png";
import SmallText from "../../components/SmallText";
import DataTable from "../../components/DataTable";
import MediaCard from "../../components/MediaCard";
import MonthEventCard from "../../components/MonthEventCard";
import Graph from "../../components/Graph";

function Home(props: any) {
    const history = useHistory();
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        props.fetchEarnings('month');
    }, [props.myTopics])

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
            <Banner topText="Dashboard" title={`Welcome, ${props.user.userName}`}/>
            <div className="libraryImageWrapper">
                <img src={homeBg} width="100%"/>
            </div>
            <div className="homeDashboardContainer">
                <div className="homeTopWrapper">
                    <div>
                        <div className="homeTextWrapper">
                            <SmallText color="#FFF">
                                THIS MONTHS <SmallText bold>CHIP LEADERS</SmallText>
                            </SmallText>
                        </div>
                        <div>
                            <DataTable
                                loading={props.isFetchingPerformanceData}
                                query="month"
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
                    <div>
                        <div className="homeTextWrapper">
                            <SmallText color="#FFF">
                                CONTENT <SmallText bold>SPOTLIGHT</SmallText>
                            </SmallText>
                        </div>
                        {/*<MediaCard
                            image={item.image}
                            duration={item.duration}
                            title={item.title}
                            description={item.description}
                            onClick={() => setTimeout(() => item.url, 500)}
                        />*/}
                    </div>
                    <div>
                        <div className="homeTextWrapper">
                            <SmallText color="#FFF">
                                WEEKLY <SmallText bold>HAND BREAKDOWN</SmallText>
                            </SmallText>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="homeTitleWrapper">
                        <div className="homeTextWrapper">
                            <SmallText color="#FFF">
                                EVENTS <SmallText bold>THIS MONTH</SmallText>
                            </SmallText>
                        </div>
                    </div>
                    <div className="homeMonthEventCardWrapper">
                        <MonthEventCard
                            width={(width - 120) < 350 ? 350 : width - 190}
                            title="Live Workshop: The Hand Spotlight with Chance the killer kornuth "
                            date="12/20/29:5:00: P.M PST"
                            body="Marius varius felis at commodo imperdient. cras"
                            onClick={() => {}}
                        />
                    </div>
                </div>
                <div>
                    <div className="homeTitleWrapper">
                        <div className="homeTextWrapper">
                            <SmallText color="#FFF">
                                PROGRESS <SmallText bold>THIS MONTH</SmallText>
                            </SmallText>
                        </div>
                    </div>
                    <div className="homeGraphWrapper">
                        <Graph data={props.graphData} width={(width - 120) < 350 ? 350 : width - 120} loading={props.isFetchingPerformanceData}/>
                    </div>
                </div>
            </div>
        </ScreenTemplate>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
        tableData: state.performanceState.tableData,
        graphData: state.performanceState.graphData,
        isFetchingPerformanceData: state.performanceState.isFetchingPerformanceData,
    };
}

const bindActions = (dispatch: any) => {
    return {
        fetchEarnings: (query: string) => dispatch(PERFORMANCE_ACTIONS.fetchEarnings(query)),
    };
};

export default connect(mapStateToProps, bindActions)(Home);