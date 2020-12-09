import React, {useState, useEffect, useRef} from 'react';
import './styles.css';
// @ts-ignore
import Modal from 'react-awesome-modal';
import {header, sidebarItems} from '../../helpers/constants';
import Sidebar from "../../components/Sidebar";
import Banner from '../../components/Banner';
import Slider from '../../components/Slider';
import SmallText from '../../components/SmallText';
import libraryBg from '../../assets/images/libraryBg.png';
import MediaCard from '../../components/MediaCard';
import Image1 from '../../assets/images/image1.png';
import Image2 from '../../assets/images/image2.png';
import Image3 from '../../assets/images/image3.png';

function Library() {
    const scrollRef: any = useRef(null);
    const [slider, setSlider] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [width, setWidth]   = useState(window.innerWidth);
    const [scrollTop, setScrollTop] = useState(0);

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
        <div className="container">
            <Sidebar title="MENU" items={sidebarItems} upperButtons={[]} reverse={!slider} closeButton={() => setSlider(false)}/>
            {header(setSlider, scrollTop)}
            <div
                ref={scrollRef}
                className="libraryContentContainer"
                onScroll={() => {
                    const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
                    const scrollTop = scrollRef.current.scrollTop
                    console.log(`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`)
                    setScrollTop(scrollTop);
                }}
                onClick={() => setSlider(false)}>
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
                    <Slider content={usage} show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
                </div>
                <div className="bottomPadding">
                    <div className="libraryTextWrapper">
                        <SmallText color="#FFF">
                            <SmallText bold>FREQUENTLY</SmallText>
                            {' ASKED QUESTIONS'}
                        </SmallText>
                    </div>
                    <Slider content={fqa} show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
                </div>
            </div>
            <Modal visible={showModal} width="750" height="450" effect="fadeInUp" onClickAway={() => setShowModal(false)}>
                <iframe width="750" height="450"
                        src="https://www.youtube.com/embed/zBajLyDcfWA?playlist=zBajLyDcfWA&autoplay=1&loop=1">
                </iframe>
            </Modal>
        </div>
    );
}

export default Library;