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
import { userInfo } from 'os';

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
            setTimeout(() => setIsLoading(false), 1000);
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
            {props.type !== 'assessment' && props.type !== 'results' && slider !== null ? <Sidebar type="default" title="MENU" items={
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
                props.type !== 'assessment' && props.type !== 'results' && props.type !== 'assessment-screen' ?
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
                                {(props.user?.payment?.price && props.user?.payment?.price > 100) || (props.user?.payment?.amount && props.user?.payment?.amount > 10000) && <div className="headerSlackInvitation" onClick={()=> window.location.href="https://join.slack.com/t/chipleaderpremium/shared_invite/zt-r77vfd47-iF4Y575aNHhhw3ObHSX8lA"}>
                                    
                                    <img 
                                    src="data:image/png;base64,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" 
                                    style={{ width: "30px", height: "30px", paddingRight: "5px"}}></img>
                                    <h5>CLAI Slack Channel</h5>
                                </div>}
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
                id="contentContainer"

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
                    <Loader
                        type={props.type}
                        topText={props.type === 'results' ? 'THE TOURNAMENT ASSESSMENT' : 'FETCHING DATA'}
                        title={props.type === 'results' ? 'Your Assessment is Being Processed' : 'Loading...'}
                    />
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