import React, {useState, useEffect, useRef} from 'react';
import * as ACTIONS from './store/actions';
// @ts-ignore
import {connect} from 'react-redux';
// @ts-ignore
import Modal from 'react-awesome-modal';
import './styles.css';
import Sidebar from '../../components/Sidebar';
import Settings from "../Settings";
import SidebarItem from "../../components/SidebarItem";
import Logo from "../../assets/images/clai-logo.png";
import ChipItem from "../../components/ChipItem";
import Avatar from "../../components/Avatar";
import Header from "../../components/Header";
// @ts-ignore
import {useHistory} from 'react-router-dom';
import {bugTrackerScript} from "../../helpers/constants";
import QuestionProgress from "../../components/QuestionsProgress";
import Loader from "../../components/Loader";
import {detectBrowser} from "../../helpers/validations";

function ScreenTemplate(props: any) {
    const history = useHistory();
    const scrollRef: any = useRef(null);
    const [slider, setSlider]: any = useState(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [scrollTop, setScrollTop] = useState(0);
    const [isLoading, setIsLoading] = useState(props.loading);

    useEffect(() => {
        props.getGlossary();
    }, [])

    useEffect(() => {
        if (props.user && props.user.type === 'admin') {
            const script = document.createElement('script');

            script.src = bugTrackerScript;
            script.async = true;
            // @ts-ignore
            document.getElementById("bugTracker").appendChild(script);
        } else {
            const element = document.getElementById("bugTracker");
            if (element && element.innerHTML) {
                element.removeChild(element);
                element.innerHTML = '';
            }
        }
    }, [props.user]);

    useEffect(() => {
        props.getRealtimeUserData();
        if (!props.user.id) {
            history.push('/');
        }
    }, []);

    useEffect(() => {
        if(!props.loading) {
            setTimeout(() => setIsLoading(false), 3000);
        }
    }, [props.loading])

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        if (detectBrowser() === 'Chrome' || detectBrowser() === 'Firefox') {
            window.screen.orientation.lock('portrait');
        }
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    return (
        <div className="container">
            {!props.type && slider !== null ? <Sidebar type="default" title="MENU" items={
                [<SidebarItem icon="home" text="Home" onClick={() => {
                    setSlider(false)
                    setTimeout(() => history.push('home'), 700);
                }}/>,
                    <SidebarItem icon="ai" text="AI Learning" onClick={() => {
                        setSlider(false)
                        setTimeout(() => {
                            sessionStorage.setItem('selectedTopic', '{}');
                            history.push('ai');
                        }, 700);
                    }}/>,
                    <SidebarItem icon="path" text="Pick Your Path" onClick={() => {
                        setSlider(false)
                        setTimeout(() => history.push('paths'), 700);
                    }}/>,
                    /*<SidebarItem icon="practice" text="Practice" onClick={() => {
                        setTimeout(() => history.push('practice'), 0);
                    }}/>,*/
                    <SidebarItem icon="video" text="Video Library" onClick={() => {
                        setSlider(false)
                        setTimeout(() => history.push('library'), 700);
                    }}/>,
                    /*<SidebarItem icon="training" text="Advanced Training" onClick={() => {
                        setTimeout(() => history.push('training'), 0);
                    }}/>,*/
                    <SidebarItem icon="performance" text="My Performance" onClick={() => {
                        setSlider(false)
                        setTimeout(() => history.push('performance'), 700);
                    }}/>,
                    /*<SidebarItem icon="answers" text="Answers" onClick={() => {
                        setTimeout(() => history.push('answers'), 0);
                    }}/>,*/
                    <SidebarItem icon="settings" text="Settings" onClick={() => {
                        setSlider(false)
                        setTimeout(() => history.push('settings'), 700);
                    }}/>
                ]
            }
                      upperButtons={[]}
                      reverse={!slider}
                      closeButton={() => setSlider(false)}/> : null}

            {
                !props.type ?
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
                                    onClick={() => history.push('settings')}
                                />
                            </div>
                        }
                    /> :
                    props.type === 'assessment' ?
                        <div style={{marginTop: 60}}/>
                        :
                        <div className="screenTemplateQuestionProgressWrapper">
                            <QuestionProgress loading={props.totalQuestions === 0} totalQuestions={props.totalQuestions} index={props.index} result={props.progressData} showFeedback={false} tooltip={props.tooltip}/>
                        </div>
            }

            <div
                ref={scrollRef}
                className="contentContainer"

                onScroll={() => {
                    const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
                    const scrollTop = scrollRef.current.scrollTop
                    setScrollTop(scrollTop);
                }}
                onClick={() => {
                    if (slider !== null) {
                        setSlider(false)
                    }
                }}>
                {isLoading ?
                    <Loader topText={props.type === 'results' ? 'THE TOURNAMENT ASSESSMENT' : 'FETCHING DATA'} title={props.type === 'results' ? 'Your Assessment is Being Processed' : 'Loading...'}/>
                    :
                    <div style={{paddingTop: 50}}>
                        {props.children}
                    </div>
                }
            </div>
            {props.user && props.user.type === 'admin' ? <div id="bugTracker" /> : null}
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
        chips: state.screenTemplateState.chips,
        tickets: state.screenTemplateState.tickets
    };
}

const bindActions = (dispatch: any) => {
    return {
        getRealtimeUserData: () => dispatch(ACTIONS.getRealtimeUserData()),
        getGlossary: () => dispatch(ACTIONS.getGlossary()),
    };
};

export default connect(mapStateToProps, bindActions)(ScreenTemplate);