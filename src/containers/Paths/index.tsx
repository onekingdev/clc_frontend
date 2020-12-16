import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
import Slider from '../../components/Slider';
import TopicCard from '../../components/TopicCard';
import SmallText from '../../components/SmallText';
import pathsBg from '../../assets/images/pathsBg.png';
import ScreenTemplate from '../ScreenTemplate';
import Banner from '../../components/Banner';

function Paths(props: any) {
    const [width, setWidth] = useState(window.innerWidth);

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
        <ScreenTemplate>
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
                <Slider
                    loading={props.isFetchingPathsData}
                    marginClass="pathsSliderCenterLoaderMargin"
                    content={available}
                    show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
            </div>
            <div>
                <div className="pathsTextWrapper">
                    <SmallText color="#FFF">
                        <SmallText bold>{locked.length}</SmallText>
                        {' LOCKED TOPICS'}
                    </SmallText>
                </div>
                <Slider
                    loading={props.isFetchingPathsData}
                    marginClass="pathsSliderCenterLoaderMargin"
                    content={locked}
                    show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
            </div>
            <div className="bottomPadding">
                <div className="pathsTextWrapper">
                    <SmallText color="#FFF">
                        <SmallText bold>{mastered.length}</SmallText>
                        {' MASTERED TOPICS'}
                    </SmallText>
                </div>
                <Slider
                    loading={props.isFetchingPathsData}
                    marginClass="pathsSliderCenterLoaderMargin"
                    content={mastered}
                    show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
            </div>
        </ScreenTemplate>
    );
}

const mapStateToProps = (state: any) => {
    return {
        pathsList: state.pathsState.pathsList,
        isFetchingPathsData: state.pathsState.isFetchingPathsData
    };
}

const bindActions = (dispatch: any) => {
    return {};
};

export default connect(mapStateToProps, bindActions)(Paths);