import React, {useState, useEffect} from 'react';
import './styles.css';
import {sidebarItems} from '../../helpers/constants';
import Header from "../../components/Header";
import SidebarItem from "../../components/SidebarItem";
import ChipItem from "../../components/ChipItem";
import Avatar from "../../components/Avatar";
import Sidebar from "../../components/Sidebar";
import Banner from "../../components/Banner";
import Slider from "../../components/Slider";
import TopicCard from "../../components/TopicCard";
import SmallText from "../../components/SmallText";
import pathsBg from '../../assets/images/pathsBg.png';
import Logo from "../../assets/images/clai-logo.png";

function Paths() {
    const [slider, setSlider] = useState(true);

    const available = [
        <TopicCard
            label="Flop"
            title="Lesson 3A"
            description="based on the contextual information. What is the best response?"
            status={0}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3B"
            description="based on the contextual information. What is the best response?"
            status={0}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3C"
            description="based on the contextual information. What is the best response?"
            status={0}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3D"
            description="based on the contextual information. What is the best response?"
            status={0}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3E"
            description="based on the contextual information. What is the best response?"
            status={0}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3F"
            description="based on the contextual information. What is the best response?"
            status={0}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3G"
            description="based on the contextual information. What is the best response?"
            status={0}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3H"
            description="based on the contextual information. What is the best response?"
            status={0}
        />,
    ];
    const locked = [
        <TopicCard
            label="Flop"
            title="Lesson 3A"
            description="based on the contextual information. What is the best response?"
            status={1}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3B"
            description="based on the contextual information. What is the best response?"
            status={1}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3C"
            description="based on the contextual information. What is the best response?"
            status={1}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3D"
            description="based on the contextual information. What is the best response?"
            status={1}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3E"
            description="based on the contextual information. What is the best response?"
            status={1}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3F"
            description="based on the contextual information. What is the best response?"
            status={1}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3G"
            description="based on the contextual information. What is the best response?"
            status={1}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3H"
            description="based on the contextual information. What is the best response?"
            status={1}
        />,
    ];
    const mastered = [
        <TopicCard
            label="Flop"
            title="Lesson 3A"
            description="based on the contextual information. What is the best response?"
            status={2}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3B"
            description="based on the contextual information. What is the best response?"
            status={2}
        />,
        <TopicCard
            label="Flop"
            title="Lesson 3C"
            description="based on the contextual information. What is the best response?"
            status={2}
        />,
    ];

    return (
        <div>
            <Sidebar title="MENU" items={sidebarItems} upperButtons={[]} reverse={!slider} closeButton={() => setSlider(false)}/>
            <Header
                left={
                    <div style={{marginLeft: 60}}>
                        <SidebarItem icon="hamburger" onClick={() => setSlider(true)}/>
                    </div>
                }
                middle={
                    <div className="pathsHeaderItemWrapper">
                        <img src={Logo} width={210} height={58}/>
                    </div>
                }
                right={
                    <div className="pathsHeaderItemWrapper">
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
            <div className="pathsContentContainer" onClick={() => setSlider(false)}>
                <Banner topText="Lesson library" title="Pick your path"/>
                <div className="pathsImageWrapper">
                    <img src={pathsBg} width="90%"/>
                </div>
                <div>
                    <div className="pathsTextWrapper">
                        <SmallText color="#FFF">
                            <SmallText bold>{available.length}</SmallText>
                            {' AVAILABLE TOPICS'}
                        </SmallText>
                    </div>
                    <Slider content={available}/>
                </div>
                <div>
                    <div className="pathsTextWrapper">
                        <SmallText color="#FFF">
                            <SmallText bold>{locked.length}</SmallText>
                            {' LOCKED TOPICS'}
                        </SmallText>
                    </div>
                    <Slider content={locked}/>
                </div>
                <div>
                    <div className="pathsTextWrapper">
                        <SmallText color="#FFF">
                            <SmallText bold>{mastered.length}</SmallText>
                            {' MASTERED TOPICS'}
                        </SmallText>
                    </div>
                    <Slider content={mastered}/>
                </div>
            </div>
        </div>
    );
}

export default Paths;