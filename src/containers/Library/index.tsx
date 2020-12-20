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
import TitleText from "../../components/TitleText";

function Library(props: any) {
    const [showModal, setShowModal] = useState({show: false, url: ''});
    const [width, setWidth] = useState(window.innerWidth);
    const [usage, setUsage] = useState({array: [], length: 0});
    const [faq, setFaq] = useState({array: [], length: 0});

    useEffect(() => {
        props.fetchLibraryList();
    }, []);

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    useEffect(() => {
        let arr1: any = [], arr2: any = [];

        if (props.libraryLists && props.libraryLists.usage) {
            props.libraryLists.usage.forEach((item: any) => {
                arr1.push(
                    <MediaCard
                        image={item.image}
                        duration={item.duration}
                        title={item.title}
                        description={item.description}
                        onClick={() => setTimeout(() => setShowModal({show: true, url: item.url}), 500)}
                    />
                )
            })
        }
        if (props.libraryLists && props.libraryLists.faq) {
            props.libraryLists.faq.forEach((item: any) => {
                arr2.push(
                    <MediaCard
                        image={item.image}
                        duration={item.duration}
                        title={item.title}
                        description={item.description}
                        onClick={() => setTimeout(() => setShowModal({show: true, url: item.url}), 500)}
                    />
                )
            })
        }
        setUsage({array: arr1, length: arr1.length});
        setFaq({array: arr2, length: arr2.length});
    }, [props.libraryLists])

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

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
                    {usage.array.length > 0 || props.isFetchingLibraryData ?
                        <Slider
                            loading={props.isFetchingLibraryData}
                            marginClass="librarySliderCenterLoaderMargin"
                            content={usage.array}
                            show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
                        :
                        <TitleText>NO DATA</TitleText>
                    }
                </div>
            <div className="bottomPadding">
                <div className="libraryTextWrapper">
                    <SmallText color="#FFF">
                        <SmallText bold>FREQUENTLY</SmallText>
                        {' ASKED QUESTIONS'}
                    </SmallText>
                </div>
                {faq.array.length > 0 || props.isFetchingLibraryData ?
                    <Slider
                        loading={props.isFetchingLibraryData}
                        marginClass="librarySliderCenterLoaderMargin"
                        content={faq.array}
                        show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
                    :
                    <TitleText>NO DATA</TitleText>
                }
            </div>
            <Modal visible={showModal.show} width="750" height="450" effect="fadeInUp" onClickAway={() => setShowModal({show: false, url: ''})}>
                <iframe width="750" height="450"
                        src={showModal.url}>
                </iframe>
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