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
import * as ACTIONS from './store/actions';
import Banner from "../../components/Banner";
import homeBg from "../../assets/images/home-bg.png";
import SmallText from "../../components/SmallText";
import DataTable from "../../components/DataTable";
import MediaCard from "../../components/MediaCard";
import MonthEventCard from "../../components/MonthEventCard";
import Graph from "../../components/Graph";
import {DotLoader} from "react-spinners";
import MonthlyChallengeEngagement from "../../components/MonthlyChallengeEngagement";
import {embedVideo} from "../../helpers/formatter";
// @ts-ignore
import Modal from 'react-awesome-modal';

function Home(props: any) {
    const history = useHistory();
    const [width, setWidth] = useState(window.innerWidth);
    const [showModal, setShowModal] = useState({show: false, url: ''});

    useEffect(() => {
        props.fetchEarnings('month');
        props.fetchEvents();
        props.fetchHomeCards();
    }, [])

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
            <div className="homeUnderBannerWrapper">
                <div className="homeLeftSectionUnderBannerWrapper">
                    <div className="homeLeftSectionUnderTextBannerWrapper">
                        <div style={{marginRight: 30}}>
                            <TitleText bold>30</TitleText>
                        </div>
                        <div>
                            <div>
                                <BodyText color="#FFF">QUESTIONS</BodyText>
                            </div>
                            <div>
                                <BodyText color="#FFF">FOR TODAY</BodyText>
                            </div>
                        </div>
                    </div>
                    <div className="homeButtonWrapper">
                        <Button onClick={() => {}} width={171} height={40} glow text="Start now"/>
                    </div>
                </div>
                <MonthlyChallengeEngagement month="FEB" year="2021" days={[1,4,7,12]} totalDays={28} />
            </div>
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
                        {props.isFetchingCards ? <div className="homeCenterLoader"><DotLoader loading={true} color="#FFF" /></div> : props.contentSpotlight.title ?
                        <MediaCard
                            link
                            image="https://firebasestorage.googleapis.com/v0/b/chipleadercoaching-webapp.appspot.com/o/image1.png?alt=media&token=9b6d0aff-a401-42d1-8f07-43bb46764e1d"
                            title={props.contentSpotlight.title}
                            description={props.contentSpotlight.body}
                            onClick={() => setTimeout(() => window.open(props.contentSpotlight.link, '_blank'), 500)}
                        /> : null}
                    </div>
                    <div>
                        <div className="homeTextWrapper">
                            <SmallText color="#FFF">
                                WEEKLY <SmallText bold>HAND BREAKDOWN</SmallText>
                            </SmallText>
                        </div>
                        {props.isFetchingCards ? <div className="homeCenterLoader"><DotLoader loading={true} color="#FFF" /></div> : props.weeklyHandBreakdown.title ?
                        <MediaCard
                            image={props.weeklyHandBreakdown.image}
                            duration={props.weeklyHandBreakdown.duration}
                            title={props.weeklyHandBreakdown.title}
                            description={props.weeklyHandBreakdown.description}
                            onClick={() => setTimeout(() => setShowModal({show: true, url: props.weeklyHandBreakdown.url}), 500)}
                        /> : null}
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
                    {props.events.length > 0 ?  props.events.map((event: any) =>
                        <div className="homeMonthEventCardWrapper">
                            <MonthEventCard
                                width={(width - 120) < 350 ? 350 : width - 190}
                                title={event.title}
                                date={event.date}
                                body={event.body}
                                onClick={() => setTimeout(() => window.open(event.link, '_blank'), 500)}
                            />
                        </div>
                    ) :
                        <div className="homeCenterLoader">
                            <DotLoader color="#FFF"/>
                        </div>
                    }
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
                        <Graph data={props.monthlyGraphData} width={(width - 120) < 350 ? 350 : width - 120} loading={props.isFetchingPerformanceData}/>
                    </div>
                </div>
            </div>
            <Modal visible={showModal.show} width="50%" height="50%" effect="fadeInUp" onClickAway={() => setShowModal({show: false, url: ''})}>
                <iframe width="100%" height="100%" style={{backgroundColor: '#000'}} src={embedVideo(showModal.url)}/>
            </Modal>
        </ScreenTemplate>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
        tableData: state.performanceState.tableData,
        monthlyGraphData: state.performanceState.monthlyGraphData,
        isFetchingPerformanceData: state.performanceState.isFetchingPerformanceData,
        isFetchingEvents: state.homeState.isFetchingEvents,
        isFetchingCards: state.homeState.isFetchingCards,
        events: state.homeState.events,
        contentSpotlight: state.homeState.contentSpotlight,
        weeklyHandBreakdown: state.homeState.weeklyHandBreakdown
    };
}

const bindActions = (dispatch: any) => {
    return {
        fetchEarnings: (query: string) => dispatch(PERFORMANCE_ACTIONS.fetchEarnings(query)),
        fetchEvents: () => dispatch(ACTIONS.fetchEvents()),
        fetchHomeCards: () => dispatch(ACTIONS.fetchHomeCards())
    };
};

export default connect(mapStateToProps, bindActions)(Home);