import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
import ScreenTemplate from '../ScreenTemplate';
import Banner from '../../components/Banner';
import Slider from '../../components/Slider';
import SmallText from '../../components/SmallText';
import libraryBg from '../../assets/images/libraryBg.png';
import MediaCard from '../../components/MediaCard';
import Image1 from '../../assets/images/image1.png';
import Image2 from '../../assets/images/image2.png';
import Image3 from '../../assets/images/image3.png';
import {IUser} from "../Authentication/interfaces";
import * as ACTIONS from "../Authentication/store/actions";

function Library(props: any) {
    const [showModal, setShowModal] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {

    }, []);

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    const usage = [
        <MediaCard
            image={Image1}
            duration="2:47"
            title="1 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image2}
            duration="2:47"
            title="2 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image3}
            duration="2:47"
            title="3 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image1}
            duration="2:47"
            title="4 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image2}
            duration="2:47"
            title="5 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image3}
            duration="2:47"
            title="6 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image1}
            duration="2:47"
            title="7 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image2}
            duration="2:47"
            title="8 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />
    ];
    const fqa = [
        <MediaCard
            image={Image1}
            duration="2:47"
            title="1 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image2}
            duration="2:47"
            title="2 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image3}
            duration="2:47"
            title="3 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image1}
            duration="2:47"
            title="4 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image2}
            duration="2:47"
            title="5 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image3}
            duration="2:47"
            title="6 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image1}
            duration="2:47"
            title="7 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />,
        <MediaCard
            image={Image2}
            duration="2:47"
            title="8 How to make the most of CL AI"
            description="based on the contextual information. What is the best response?"
            onClick={() => setTimeout(() => setShowModal(true), 500)}
        />
    ];

    return (
        <ScreenTemplate>
            <Banner topText="Lesson library" title="Video Library"/>
            <div className="libraryImageWrapper">
                <img src={libraryBg} width="90%"/>
            </div>
            <div>
                <div className="libraryTextWrapper">
                    <SmallText color="#FFF">
                        <SmallText bold>HOW TO USE</SmallText>
                        {' CHIP LEADER AI'}
                    </SmallText>
                </div>
                <Slider
                    loading={props.isFetchingLibraryData}
                    marginClass="librarySliderCenterLoaderMargin"
                    content={usage}
                    show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
            </div>
            <div className="bottomPadding">
                <div className="libraryTextWrapper">
                    <SmallText color="#FFF">
                        <SmallText bold>FREQUENTLY</SmallText>
                        {' ASKED QUESTIONS'}
                    </SmallText>
                </div>
                <Slider
                    loading={props.isFetchingLibraryData}
                    marginClass="librarySliderCenterLoaderMargin"
                    content={fqa}
                    show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
            </div>
        </ScreenTemplate>
    );
}

const mapStateToProps = (state: any) => {
    return {
        libraryLists: state.libraryState.libraryLists,
        isFetchingLibraryData: state.libraryState.isFetchingLibraryData
    };
}

const bindActions = (dispatch: any) => {
    return {};
};

export default connect(mapStateToProps, bindActions)(Library);