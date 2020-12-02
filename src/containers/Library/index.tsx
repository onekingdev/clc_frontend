import React, {useState, useEffect} from 'react';
import './styles.css';
// @ts-ignore
import Modal from 'react-awesome-modal';
import {sidebarItems} from '../../helpers/constants';
import Header from "../../components/Header";
import SidebarItem from "../../components/SidebarItem";
import ChipItem from "../../components/ChipItem";
import Avatar from "../../components/Avatar";
import Sidebar from "../../components/Sidebar";
import Banner from '../../components/Banner';
import Slider from '../../components/Slider';
import SmallText from '../../components/SmallText';
import libraryBg from '../../assets/images/libraryBg.png';
import MediaCard from '../../components/MediaCard';
import Logo from '../../assets/images/clai-logo.png';
import Image1 from '../../assets/images/image1.png';
import Image2 from '../../assets/images/image2.png';
import Image3 from '../../assets/images/image3.png';

function Library() {
    const [slider, setSlider] = useState(true);
    const [showModal, setShowModal] = useState(false);

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
        <div>
            <Sidebar title="MENU" items={sidebarItems} upperButtons={[]} reverse={!slider} closeButton={() => setSlider(false)}/>
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
            <div className="libraryContentContainer" onClick={() => setSlider(false)}>
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
                    <Slider content={usage}/>
                </div>
                <div>
                    <div className="libraryTextWrapper">
                        <SmallText color="#FFF">
                            <SmallText bold>FREQUENTLY</SmallText>
                            {' ASKED QUESTIONS'}
                        </SmallText>
                    </div>
                    <Slider content={fqa}/>
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