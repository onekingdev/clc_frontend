import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
// @ts-ignore
import Modal from 'react-awesome-modal';
import './styles.css';
import Slider from '../../components/Slider';
import TopicCard from '../../components/TopicCard';
import SmallText from '../../components/SmallText';
import pathsBg from '../../assets/images/pathsBg.png';
import ScreenTemplate from '../ScreenTemplate';
import Banner from '../../components/Banner';
import * as ACTIONS from './store/actions';
import TopicModal from "./TopicModal";

function Paths(props: any) {
    const [width, setWidth] = useState(window.innerWidth);
    const [available, setAvailable] = useState({array: [], render: false});
    const [mastered, setMastered] = useState({array: [], render: false});
    const [locked, setLocked] = useState({array: [], render: false});
    const [modal, setModal] = useState({item: {}, show: false});

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    useEffect(() => {
        if (props.myTopics.length > 0) {
            props.getPathsList(props.myTopics);
        }
    }, [props.myTopics])

    useEffect(() => {
        let arr1: any = [], arr2: any = [], arr3: any = [];
        if (props.pathsList.available && props.pathsList.available.length > 0) {
            props.pathsList.available.forEach((item: any) => {
                arr1.push(
                    <TopicCard
                        label={item.name}
                        title={item.lessonName}
                        description="based on the contextual information. What is the best response?"
                        status={item.status}
                        callback={() => setModal({item, show: true})}
                    />
                )
            })
        }
        if (props.pathsList.mastered && props.pathsList.mastered.length > 0) {
            props.pathsList.mastered.forEach((item: any) => {
                arr2.push(
                    <TopicCard
                        label={item.name}
                        title={item.lessonName}
                        description="based on the contextual information. What is the best response?"
                        status={item.status}
                        callback={() => setModal({item, show: true})}
                    />
                )
            })
        }
        if (props.pathsList.locked && props.pathsList.locked.length > 0) {
            props.pathsList.locked.forEach((item: any) => {
                arr3.push(
                    <TopicCard
                        label={item.name}
                        title={item.lessonName}
                        description="based on the contextual information. What is the best response?"
                        status={item.status}
                        callback={() => setModal({item, show: true})}
                    />
                )
            })
        }

        setAvailable({array: arr1, render: !available.render});
        setMastered({array: arr2, render: !mastered.render});
        setLocked({array: arr3, render: !locked.render});
    }, [props.pathsList])

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    return (
        <ScreenTemplate>
            <Banner topText="Lesson library" title="Pick your path"/>
            <div className="pathsImageWrapper">
                <img src={pathsBg} width="90%"/>
            </div>
            {available.array.length > 0 || props.isFetchingPathsData ?
            <div>
                <div className="pathsTextWrapper">
                    <SmallText color="#FFF">
                        <SmallText bold>{available.array.length}</SmallText>
                        {' AVAILABLE TOPICS'}
                    </SmallText>
                </div>
                <Slider
                    loading={props.isFetchingPathsData}
                    marginClass="pathsSliderCenterLoaderMargin"
                    content={available.array}
                    show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
            </div>
                : null}
            {locked.array.length > 0 || props.isFetchingPathsData ?
                <div>
                    <div className="pathsTextWrapper">
                        <SmallText color="#FFF">
                            <SmallText bold>{locked.array.length}</SmallText>
                            {' LOCKED TOPICS'}
                        </SmallText>
                    </div>
                    <Slider
                        loading={props.isFetchingPathsData}
                        marginClass="pathsSliderCenterLoaderMargin"
                        content={locked.array}
                        show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
                </div>
            : null}
            {mastered.array.length > 0 || props.isFetchingPathsData ?
                <div className="bottomPadding">
                    <div className="pathsTextWrapper">
                        <SmallText color="#FFF">
                            <SmallText bold>{mastered.array.length}</SmallText>
                            {' MASTERED TOPICS'}
                        </SmallText>
                    </div>
                    <Slider
                        loading={props.isFetchingPathsData}
                        marginClass="pathsSliderCenterLoaderMargin"
                        content={mastered.array}
                        show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}/>
                </div>
                : <div className="bottomPadding"/>}
                <Modal visible={modal.show} width="450" effect="fadeInUp" onClickAway={() => setModal({item: {}, show: false})}>
                    <TopicModal topic={modal.item} reset={!modal.show}/>
                </Modal>
        </ScreenTemplate>
    );
}

const mapStateToProps = (state: any) => {
    return {
        pathsList: state.pathsState.pathsList,
        isFetchingPathsData: state.pathsState.isFetchingPathsData,
        myTopics: state.screenTemplateState.myTopics
    };
}

const bindActions = (dispatch: any) => {
    return {
        getPathsList: (myTopics: any) => dispatch(ACTIONS.getPathsList(myTopics))
    };
};

export default connect(mapStateToProps, bindActions)(Paths);