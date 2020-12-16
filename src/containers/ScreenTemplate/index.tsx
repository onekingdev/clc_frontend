import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
// @ts-ignore
import Modal from 'react-awesome-modal';
import './styles.css';
import {sidebarItems} from '../../helpers/builders';
import Sidebar from '../../components/Sidebar';
import Settings from "../Settings";
// import * as ACTIONS from "./store/actions";
import * as PERFORMANCE_ACTIONS from "../Performance/store/actions";
import DotLoader from "react-spinners/DotLoader";
import SidebarItem from "../../components/SidebarItem";
import Logo from "../../assets/images/clai-logo.png";
import ChipItem from "../../components/ChipItem";
import Avatar from "../../components/Avatar";
import Header from "../../components/Header";

function ScreenTemplate(props: any) {
    const scrollRef: any = useRef(null);
    const [slider, setSlider] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
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
            <Header
                scrolling={scrollTop}
                left={
                    <div style={{marginLeft: '10%'}}>
                        <SidebarItem icon="hamburger" onClick={() => setSlider(true)}/>
                    </div>
                }
                middle={
                    <div className="headerItemWrapper">
                        <img src={Logo} width={210} height={58}/>
                    </div>
                }
                right={
                    <div className="headerItemWrapper">
                        <div className="headerChipTicketWrapper">
                            <div className="headerChipWrapper">
                                <ChipItem icon="chip" quantity={25} size="small"/>
                            </div>
                            <div className="headerCashWrapper">
                                <ChipItem icon="cash" quantity={3} size="small"/>
                            </div>
                        </div>
                        <Avatar
                            size="medium"
                            image=""
                            text="Chance Franci"
                            rank={1}
                            onClick={() => setShowSettingsModal(true)}
                        />
                    </div>
                }
            />
            <div
                ref={scrollRef}
                className="contentContainer"

                onScroll={() => {
                    const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
                    const scrollTop = scrollRef.current.scrollTop
                    setScrollTop(scrollTop);
                }}
                onClick={() => setSlider(false)}>
                {props.loading ?
                    <div className="centerLoader">
                        <DotLoader loading={true} color="#FFF"/>
                    </div>
                    :
                    <div style={{paddingTop: 50}}>
                        {props.children}
                    </div>
                }
            </div>
            <Modal visible={showSettingsModal} width="450" effect="fadeInUp"
                   onClickAway={() => setShowSettingsModal(false)}>
                <Settings/>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user
    };
}

const bindActions = (dispatch: any) => {
    return {};
};

export default connect(mapStateToProps, bindActions)(ScreenTemplate);