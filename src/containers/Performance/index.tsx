import React, {useState, useEffect} from 'react';
import './styles.css';
import {sidebarItems} from '../../helpers/constants';
import Header from "../../components/Header";
import SidebarItem from "../../components/SidebarItem";
import ChipItem from "../../components/ChipItem";
import Avatar from "../../components/Avatar";
import Sidebar from "../../components/Sidebar";
import Banner from "../../components/Banner";
import SmallText from "../../components/SmallText";
import performanceBg from "../../assets/images/performanceBg.png";
import TabNavigation from "../../components/TabNavigation";
import DataTable from "../../components/DataTable";
import Graph from "../../components/Graph";
import Logo from "../../assets/images/clai-logo.png";

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
    const [slider, setSlider] = useState(true);

    return (
        <div>
            <Sidebar title="MENU" items={sidebarItems} upperButtons={[]} reverse={!slider}
                     closeButton={() => setSlider(false)}/>
            <Header
                left={
                    <div style={{marginLeft: 60}}>
                        <SidebarItem icon="hamburger" onClick={() => setSlider(true)}/>
                    </div>
                }
                middle={
                    <div className="libraryHeaderItemWrapper">
                        <img src={Logo} width={210} height={58}/>
                    </div>
                }
                right={
                    <div className="libraryHeaderItemWrapper">
                        <div style={{marginRight: 39}}>
                            <ChipItem icon="chip" quantity={25} size="small"/>
                        </div>
                        <div style={{marginRight: 54}}>
                            <ChipItem icon="cash" quantity={3} size="small"/>
                        </div>
                        <Avatar
                            size="medium"
                            image=""
                            text="Chance Franci"
                            rank={1}/>
                    </div>
                }
            />
            <div className="performanceContentContainer" onClick={() => setSlider(false)}>
                <Banner topText="Track your progress" title="My Preformance" footerValues={[12, 25, 3]}/>
                <div className="pathsImageWrapper">
                    <img src={performanceBg} width="90%"/>
                </div>
                <div style={{marginTop: 72}}>
                    <TabNavigation selectedIndex={0} tabs={['This Season', 'This Week', 'This Month', 'Lifetime']}
                                   callback={() => {
                                   }}/>
                    <div className="performanceTablesWrapper">
                        <div style={{width: '40%'}}>
                            <div className="performanceTextWrapper">
                                <SmallText color="#FFF">
                                    <SmallText bold>CORRECT</SmallText>
                                    {' ANSWERS'}
                                </SmallText>
                            </div>
                            <DataTable
                                data={dataTable}
                                type="chips"
                                personalData={{
                                    image: '',
                                    rank: 2000,
                                    chips: 3000,
                                    correctAnswers: 2000
                                }}/>
                        </div>
                        <div style={{width: '40%'}}>
                            <div className="performanceTextWrapper">
                                <SmallText color="#FFF">
                                    <SmallText bold>CHIPS</SmallText>
                                    {' EARNED'}
                                </SmallText>
                            </div>
                            <DataTable
                                data={dataTable}
                                type="correct"
                                personalData={{
                                    image: '',
                                    rank: 2000,
                                    chips: 3000,
                                    correctAnswers: 2000
                                }}/>
                        </div>
                    </div>
                    <div className="performanceGraphWrapper">
                        <div>
                            <div className="performanceTextWrapper">
                                <SmallText color="#FFF">
                                    <SmallText bold>ACTIVITY</SmallText>
                                    {' LAST 7 DAYS'}
                                </SmallText>
                            </div>
                            <Graph data={graphData} width={1240}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Performance;