import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
// @ts-ignore
import Modal from 'react-awesome-modal';
import './styles.css';
import {header, sidebarItems} from '../../helpers/builders';
import Sidebar from "../../components/Sidebar";
import Banner from "../../components/Banner";
import Slider from "../../components/Slider";
import TopicCard from "../../components/TopicCard";
import SmallText from "../../components/SmallText";
import pathsBg from '../../assets/images/pathsBg.png';
import Settings from "../Settings";

function Paths() {
    const scrollRef: any = useRef(null);
    const [slider, setSlider] = useState(true);
    const [scrollTop, setScrollTop] = useState(0);
    const [width, setWidth]   = useState(window.innerWidth);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

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
        <div className="container">
            <Sidebar title="MENU" items={sidebarItems} upperButtons={[]} reverse={!slider} closeButton={() => setSlider(false)}/>
            {header(setSlider, scrollTop, setShowSettingsModal)}
            <div
                ref={scrollRef}
                className="pathsContentContainer"
                onClick={() => setSlider(false)}
                onScroll={() => {
                    const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
                    const scrollTop = scrollRef.current.scrollTop
                    setScrollTop(scrollTop);
                }}>
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
                    <Slider content={available} show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
                </div>
                <div>
                    <div className="pathsTextWrapper">
                        <SmallText color="#FFF">
                            <SmallText bold>{locked.length}</SmallText>
                            {' LOCKED TOPICS'}
                        </SmallText>
                    </div>
                    <Slider content={locked} show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
                </div>
                <div className="bottomPadding">
                    <div className="pathsTextWrapper">
                        <SmallText color="#FFF">
                            <SmallText bold>{mastered.length}</SmallText>
                            {' MASTERED TOPICS'}
                        </SmallText>
                    </div>
                    <Slider content={mastered} show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
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
        pathsList: state.pathsState.pathsList
    };
}

const bindActions = (dispatch: any) => {
    return {

    };
};

export default connect(mapStateToProps, bindActions)(Paths);