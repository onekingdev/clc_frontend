import React, {useState} from 'react';
import './styles.css';
import BodyText from "./components/BodyText";
import TitleText from "./components/TitleText";
import SubtitleText from "./components/SubtitleText";
import SmallText from "./components/SmallText";
import Button from "./components/Button";
import ErrorDisplay from "./components/ErrorDisplay";
import TextInput from "./components/TextInput";
import Header from "./components/Header";
import Avatar from "./components/Avatar";
import ChipItem from "./components/ChipItem";
import SidebarItem from "./components/SidebarItem";
import Sidebar from "./components/Sidebar";
import Banner from "./components/Banner";
import MediaCard from "./components/MediaCard";
import TopicCard from "./components/TopicCard";
import QuestionCard from "./components/QuestionCard";
import TabNavigation from "./components/TabNavigation";
import Player from "./components/Player";
import Slider from "./components/Slider";
import DataTable from "./components/DataTable";
import PokerPlayer from "./components/PokerPlayer";
import HouseOfCards from "./components/HouseOfCards";
import Graph from "./components/Graph";

function Components() {
    const [textInput, setTextInput] = useState('');
    const [tabIndex, setTabIndex] = useState(0);

    const sidebarItems = [
        <SidebarItem icon="home" text="Home" onClick={() => {}}/>,
        <SidebarItem icon="ai" text="AI Learning" onClick={() => {}}/>,
        <SidebarItem icon="path" text="Pick Your Path" onClick={() => {}}/>,
        <SidebarItem icon="practice" text="Practice" onClick={() => {}}/>,
        <SidebarItem icon="video" text="Video Library" onClick={() => {}}/>,
        <SidebarItem icon="training" text="Advanced Training" onClick={() => {}}/>,
        <SidebarItem icon="performance" text="My Performance" onClick={() => {}}/>,
        <SidebarItem icon="answers" text="Answers" onClick={() => {}}/>,
    ];

    const tabs = ['This Season', 'This Week', 'This Month', 'Lifetime'];

    const QuestionBoxOptions = [
        <Button onClick={() => {}} width={343} height={47} text="Fold"/>,
        <Button onClick={() => {}} width={343} height={47} text="3BET 2x this"/>,
        <Button onClick={() => {}} width={343} height={47} text="3BET 2.5x this"/>,
        <Button onClick={() => {}} width={343} height={47} text="3BET 3.5x this"/>,
    ]

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

    const sliderContent = [
        <MediaCard
            image=""
            duration="2:47"
            title="1 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => {}}
        />,
        <MediaCard
            image=""
            duration="2:47"
            title="2 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => {}}
        />,
        <MediaCard
            image=""
            duration="2:47"
            title="3 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => {}}
        />,
        <MediaCard
            image=""
            duration="2:47"
            title="4 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => {}}
        />,
        <MediaCard
            image=""
            duration="2:47"
            title="5 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => {}}
        />,
        <MediaCard
            image=""
            duration="2:47"
            title="6 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => {}}
        />,
        <MediaCard
            image=""
            duration="2:47"
            title="7 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => {}}
        />,
        <MediaCard
            image=""
            duration="2:47"
            title="8 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => {}}
        />,
        <MediaCard
            image=""
            duration="2:47"
            title="9 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => {}}
        />
    ];

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

    return (
        <div>
            <Header
                left={
                    <div>
                        <SidebarItem icon="hamburger" onClick={() => {}}/>
                    </div>
                }
                right={
                    <div style={{display: 'flex', alignItems: 'center'}}>
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
            <Sidebar title="MENU" items={sidebarItems} upperButtons={[]} reverse={false} closeButton={() => {}}/>
            <div>
                <TitleText>hello world</TitleText>
            </div>
            <div>
                <SubtitleText>hello world</SubtitleText>
            </div>
            <div>
                <BodyText>hello world</BodyText>
            </div>
            <div>
                <SmallText>hello world</SmallText>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button onClick={() => {
                }} width={342} height={55} text="Login" glow/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{width: 342}}>
                    <TextInput value={textInput} onChange={(event) => setTextInput(event.target.value)}/>
                </div>
            </div>
            <div>
                <ErrorDisplay message="este es un mensaje de error" show={true}/>
            </div>
            <div>
                <Banner topText="Track your progress" title="My Performance" footerValues={[12, 25, 3]}/>
            </div>
            <div>
                <MediaCard
                    image=""
                    duration="2:47"
                    title="How to make the most of CL AI"
                    description="based on the contextual information. What is the best response?"
                    onClick={() => {}}
                />
            </div>
            <div>
                <TopicCard
                    label="Flop"
                    title="Lesson 3A"
                    description="based on the contextual information. What is the best response?"
                    status={0}
                />
            </div>
            <div>
                <QuestionCard
                    headerText="Post Flop Problems"
                    questionNumber={24}
                    description="Based on contextual information. What is the best decision?"
                    options={QuestionBoxOptions}
                    footerText="Mauris varius falis commodo impredit. crass faucibius egeases urnas, sed cursus massa cursus in. Ut aliquam loborus arcu. Fucsu id arcu eget nisi porta blandit etiam mollis massa et ipusm timndum"
                    status={0}
                />
            </div>
            <div>
                <QuestionCard
                    headerText="Post Flop Problems"
                    questionNumber={24}
                    description="Based on contextual information. What is the best decision?"
                    options={QuestionBoxOptions}
                    footerText="Mauris varius falis commodo impredit. crass faucibius egeases urnas, sed cursus massa cursus in. Ut aliquam loborus arcu. Fucsu id arcu eget nisi porta blandit etiam mollis massa et ipusm timndum"
                    status={1}
                />
            </div>
            <div>
                <QuestionCard
                    headerText="Post Flop Problems"
                    questionNumber={24}
                    description="Based on contextual information. What is the best decision?"
                    options={QuestionBoxOptions}
                    footerText="Mauris varius falis commodo impredit. crass faucibius egeases urnas, sed cursus massa cursus in. Ut aliquam loborus arcu. Fucsu id arcu eget nisi porta blandit etiam mollis massa et ipusm timndum"
                    status={2}
                />
            </div>
            <TabNavigation selectedIndex={tabIndex} tabs={tabs} callback={(index) => setTabIndex(index)}/>
            <div style={{width: 700}}>
                <Player play={false} replay={false} speed={1} volume={5} favorite={false} rewind={false} fastForward={false} callback={() => {}}/>
            </div>
            <div>
                <Slider content={sliderContent} />
            </div>
            <br/>
            <div>
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
            <div>
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
            <div>
                <PokerPlayer
                    player={1}
                    cards={[{value: 'a', type: 'clubs', show: true}, {value: 'two', type: 'clubs', show: false}]}
                    mp={99}
                    chips={20}
                    chipPos="left"
                    turn={false}
                />
            </div>
            <div style={{marginTop: 30, marginBottom: 30}}>
                <HouseOfCards cards={[
                    {value: 'a', type: 'clubs', show: true},
                    {value: 'two', type: 'diamonds', show: true},
                    {value: 'three', type: 'clubs', show: true},
                    {value: 'k', type: 'clubs', show: false},
                ]}/>
            </div>
            <Graph data={graphData} width={800}/>
        </div>
    );
}

export default Components;
