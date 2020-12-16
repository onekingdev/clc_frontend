import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
// @ts-ignore
import Modal from 'react-awesome-modal';
import './styles.css';
import {header, sidebarItems} from '../../helpers/builders';
import Sidebar from '../../components/Sidebar';
import Settings from "../Settings";
// import * as ACTIONS from "./store/actions";
import * as PERFORMANCE_ACTIONS from "../Performance/store/actions";
import DotLoader from "react-spinners/DotLoader";

function ScreenTemplate(props: any) {
    const scrollRef: any = useRef(null);
    const [slider, setSlider] = useState(true);
    const [width, setWidth]   = useState(window.innerWidth);
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
            {header(setSlider, scrollTop, setShowSettingsModal)}
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
                    : props.children}
            </div>
            <Modal visible={showSettingsModal} width="450" effect="fadeInUp" onClickAway={() => setShowSettingsModal(false)}>
                <Settings/>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {

    };
}

const bindActions = (dispatch: any) => {
    return {

    };
};

export default connect(mapStateToProps, bindActions)(ScreenTemplate);