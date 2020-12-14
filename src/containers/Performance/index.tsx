import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
// @ts-ignore
import Modal from 'react-awesome-modal';
import './styles.css';
import {header, sidebarItems} from '../../helpers/builders';
import Sidebar from "../../components/Sidebar";
import Banner from "../../components/Banner";
import SmallText from "../../components/SmallText";
import performanceBg from "../../assets/images/performanceBg.png";
import TabNavigation from "../../components/TabNavigation";
import DataTable from "../../components/DataTable";
import Graph from "../../components/Graph";
import Settings from "../Settings";

const dataTable = [
    {
        firstName: 'Armando',
        lastName: 'Gutierrez',
        image: '',
        rank: 2,
        correctAnswers: 5000,
        chips: 600
    },
    {
        firstName: 'Armando',
        lastName: 'Gutierrez',
        image: '',
        rank: 2,
        correctAnswers: 5000,
        chips: 600
    },
    {
        firstName: 'Armando',
        lastName: 'Gutierrez',
        image: '',
        rank: 2,
        correctAnswers: 5000,
        chips: 600
    },
    {
        firstName: 'Armando',
        lastName: 'Gutierrez',
        image: '',
        rank: 2,
        correctAnswers: 5000,
        chips: 600
    },
    {
        firstName: 'Armando',
        lastName: 'Gutierrez',
        image: '',
        rank: 2,
        correctAnswers: 5000,
        chips: 600
    }
]

const graphData = [
    {
        name: 'Friday', ['Questions Correct']: 590, ['Tickets Earned']: 800
    },
    {
        name: 'Saturday', ['Questions Correct']: 868, ['Tickets Earned']: 967
    },
    {
        name: 'Sunday', ['Questions Correct']: 1397, ['Tickets Earned']: 1098
    },
    {
        name: 'Monday', ['Questions Correct']: 1480, ['Tickets Earned']: 1200
    },
    {
        name: 'Tuesday', ['Questions Correct']: 1520, ['Tickets Earned']: 1108
    },
    {
        name: 'Wednesday', ['Questions Correct']: 1400, ['Tickets Earned']: 680
    },
    {
        name: 'Thursday', ['Questions Correct']: 1400, ['Tickets Earned']: 680
    },
];

function Performance() {
    const scrollRef: any = useRef(null);
    const [slider, setSlider] = useState(true);
    const [width, setWidth]   = useState(window.innerWidth);
    const [scrollTop, setScrollTop] = useState(0);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    return (
        <div className="container">
            <Sidebar title="MENU" items={sidebarItems} upperButtons={[]} reverse={!slider}
                     closeButton={() => setSlider(false)}/>
            {header(setSlider, scrollTop, setShowSettingsModal)}
            <div
                ref={scrollRef}
                className="performanceContentContainer"
                onScroll={() => {
                    const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
                    const scrollTop = scrollRef.current.scrollTop
                    console.log(`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`)
                    setScrollTop(scrollTop);
                }}
                onClick={() => setSlider(false)}>
                <Banner topText="Track your progress" title="My Preformance" footerValues={[12, 25, 3]}/>
                <div className="pathsImageWrapper">
                    <img src={performanceBg} width="90%"/>
                </div>
                <div style={{marginTop: 72}}>
                    <TabNavigation selectedIndex={0} tabs={['This Season', 'This Week', 'This Month', 'Lifetime']}
                                   callback={() => {
                                   }}/>
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
                                    data={dataTable}
                                    type="chips"
                                    personalData={{
                                        image: '',
                                        rank: 2000,
                                        chips: 3000,
                                        correctAnswers: 2000
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
                                    data={dataTable}
                                    type="correct"
                                    personalData={{
                                        image: '',
                                        rank: 2000,
                                        chips: 3000,
                                        correctAnswers: 2000
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
                                <Graph data={graphData} width={(width - 120) < 350 ? 350 :  width - 120}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal visible={showSettingsModal} width="450" effect="fadeInUp" onClickAway={() => setShowSettingsModal(false)}>
                <Settings/>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        graphData: state.performanceState.graphData,
        tableData: state.performanceState.tableData
    };
}

const bindActions = (dispatch: any) => {
    return {

    };
};

export default connect(mapStateToProps, bindActions)(Performance);