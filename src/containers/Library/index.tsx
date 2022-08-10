import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
// @ts-ignore
import Modal from 'react-awesome-modal';
import './styles.css';
import ScreenTemplate from '../ScreenTemplate';
import Banner from '../../components/Banner';
import Slider from '../../components/Slider';
import SmallText from '../../components/SmallText';
import libraryBg from '../../assets/images/libraryBg.png';
import MediaCard from '../../components/MediaCard';
import * as ACTIONS from './store/actions';
import {embedVideo} from "../../helpers/formatter";
import {DotLoader, PulseLoader} from "react-spinners";
import BigScreen from 'bigscreen'
function Library(props: any) {
    const [showModal, setShowModal] = useState({show: false, url: ''});
    const [width, setWidth] = useState(window.innerWidth);
    const [content, setContent] = useState({});

    useEffect(() => {
        props.fetchLibraryList();
    }, []);

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    useEffect(() => {
        let obj: any = {};

        if (props.libraryLists && props.libraryLists) {
            Object.keys(props.libraryLists).forEach((key) => {
                obj[key] = [];
                props.libraryLists[key].forEach((item: any) => {
                    obj[key].push(
                        <MediaCard
                            image={item.image}
                            duration={item.duration}
                            title={item.title}
                            description={item.description}
                            onClick={() => setTimeout(() => setShowModal({show: true, url: item.url}), 500)}
                        />
                    )
                })
            })
            setContent(obj);
        }
    }, [props.libraryLists])

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    return (
        <ScreenTemplate>
            <Banner topText="Lesson library" title="Video Library"/>
            <div className="libraryImageWrapper">
                <img src={libraryBg} width="100%"/>
            </div>
            {props.isFetchingLibraryData ?
                <div style={{marginTop: 200}}>
                    <PulseLoader color="#FFF" loading={true}/>
                </div>
            : null}
            {!!Object.keys(content).length ?
                Object.keys(content).map((key: string, index) =>
                    <div className={Object.keys(content).length-1 === index ? 'bottomPadding' : ''}>
                        <div className="libraryTextWrapper">
                            <SmallText color="#FFF">
                                <SmallText bold>{key.split(' ')[0].toUpperCase()}</SmallText>
                                {' '}
                                {key.split(' ')[1] ? key.split(' ')[1].toUpperCase() : null}
                            </SmallText>
                        </div>
                        <Slider
                            loading={props.isFetchingLibraryData}
                            marginClass="librarySliderCenterLoaderMargin"
                            //@ts-ignore
                            content={content[key]}
                            show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
                    </div>
                 ): null}
            <Modal visible={showModal.show} width="50%" height="50%" effect="fadeInUp" onClickAway={() => setShowModal({show: false, url: ''})}>
                <button style={{position: "absolute", width: "100px", left: "50px", top:"10px"}} onClick={
                    () => {
                        const element:any = document.getElementById('videoPlayer');
                        if (BigScreen.enabled) {
                            BigScreen.request(element, ()=>{}, ()=>{}, ()=>{});
                            // You could also use .toggle(element, onEnter, onExit, onError)
                        }
                    }
                }>Full screen</button>
                <iframe width="100%" height="100%" style={{backgroundColor: '#000'}} src={embedVideo(showModal.url)} id="videoPlayer"/>
            </Modal>
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
    return {
        fetchLibraryList: () => dispatch(ACTIONS.fetchLibraryList())
    };
};

export default connect(mapStateToProps, bindActions)(Library);