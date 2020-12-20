import React, {useState, useEffect, useRef} from 'react';
import * as ACTIONS from './store/actions';
// @ts-ignore
import {connect} from 'react-redux';
// @ts-ignore
import Modal from 'react-awesome-modal';
import './styles.css';
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
// @ts-ignore
import {useHistory} from 'react-router-dom';

function ScreenTemplate(props: any) {
    const history = useHistory();
    const scrollRef: any = useRef(null);
    const [slider, setSlider] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [scrollTop, setScrollTop] = useState(0);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    useEffect(() => {
        props.getRealtimeUserData();
    }, []);

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
            <Sidebar title="MENU" items={
                [<SidebarItem icon="home" text="Home" onClick={() => {
                    setTimeout(() => history.push('home'), 0);
                }}/>,
                <SidebarItem icon="ai" text="AI Learning" onClick={() => {
                    setTimeout(() => history.push('game'), 0);
                }}/>,
                <SidebarItem icon="path" text="Pick Your Path" onClick={() => {
                    setTimeout(() => history.push('path'), 0);
                }}/>,
                <SidebarItem icon="practice" text="Practice" onClick={() => {
                    setTimeout(() => history.push('practice'), 0);
                }}/>,
                <SidebarItem icon="video" text="Video Library" onClick={() => {
                    setTimeout(() => history.push('library'), 0);
                }}/>,
                <SidebarItem icon="training" text="Advanced Training" onClick={() => {
                    setTimeout(() => history.push('training'), 0);
                }}/>,
                <SidebarItem icon="performance" text="My Performance" onClick={() => {
                    setTimeout(() => history.push('performance'), 0);
                }}/>,
                <SidebarItem icon="answers" text="Answers" onClick={() => {
                    setTimeout(() => history.push('answers'), 0);
                }}/>]
            } upperButtons={[]} reverse={!slider}
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
                                <ChipItem icon="chip" quantity={(props.chips)} size="small"/>
                            </div>
                            <div className="headerCashWrapper">
                                <ChipItem icon="cash" quantity={props.tickets} size="small"/>
                            </div>
                        </div>
                        <Avatar
                            size="medium"
                            image={props.user.avatar}
                            text={props.user.userName}
                            rank={props.user.masteredLevel}
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
            <Modal visible={showSettingsModal} width="40%" effect="fadeInUp"
                   onClickAway={() => setShowSettingsModal(false)}>
                <Settings/>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
        chips: state.screenTemplateState.chips,
        tickets: state.screenTemplateState.tickets,
    };
}

const bindActions = (dispatch: any) => {
    return {
        getRealtimeUserData: () => dispatch(ACTIONS.getRealtimeUserData())
    };
};

export default connect(mapStateToProps, bindActions)(ScreenTemplate);