import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect, useSelector} from 'react-redux';
import './styles.css';
import ScreenTemplate from '../ScreenTemplate';
import Banner from '../../components/Banner';
import Slider from '../../components/Slider';
import SmallText from '../../components/SmallText';
import libraryBg from '../../assets/images/libraryBg.png';
import * as ACTIONS from './store/actions';
import {DotLoader, PulseLoader} from "react-spinners";
import 'react-dropdown/style.css';
import VideoLibraryUnitGroup from '../../components/VideoLibraryUnitGroup';

function Library(props: any) {
    const [content, setContent] = useState({});

    useEffect(() => {
        props.fetchLibraryList();
    }, []);

    useEffect(() => {
        let obj: any = {};
        console.log(props.libraryLists)

        if (props.libraryLists && props.libraryLists) {
            Object.keys(props.libraryLists).forEach((key) => {
                obj[key] = [];
                props.libraryLists[key].sort((video1: any, video2: any) => video1.createdAt - video2.createdAt).forEach((item: any) => {
                    obj[key].push(item)
                })
            })
            setContent(obj);
        }
    }, [props.libraryLists])


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
                    <VideoLibraryUnitGroup
                        key={index}
                        content={content}
                        _key={key}
                        _index={index}
                        // sortByWatch={sortByWatch}
                        // onChangeSortbyWatchedHandler={onChangeSortbyWatchedHandler}
                        // sortByNewest={sortByNewest}
                        // onChangeSortbyNewestHandler={onChangeSortbyNewestHandler}
                        isFetchingLibraryData={props.isFetchingLibraryData}
                        openVideoHandler={(videoId) => props.openVideoHandler(videoId, props.user.id, key)}
                        // width={width}
                    />
                    // <div className={Object.keys(content).length - 1 === index ? 'bottomPadding' : ''}>
                    //     <div className="libraryTextWrapper">
                    //         <SmallText color="#FFF">
                    //             <SmallText bold>{key.split(' ')[0].toUpperCase()}</SmallText>
                    //             {' '}
                    //             {key.split(' ')[1] ? key.split(' ')[1].toUpperCase() : null}
                    //         </SmallText>
                    //         <div className="sortGrapWrapper">
                    //             <select name="sortByWatch" id="" value={sortByWatch} onChange={onChangeSortbyWatchedHandler}>
                    //                 {sortByWatchOption.map((option, id) => (
                    //                     <option value={option} key={id}>{ option }</option>
                    //                 ))}
                    //             </select>
                    //             <select name="sortByWatch" id="" value={sortByNewest} onChange={onChangeSortbyNewestHandler}>
                    //                 {sortByNewestOption.map((option, id) => (
                    //                     <option value={option} key={id}>{ option }</option>
                    //                 ))}
                    //             </select>
                    //         </div>
                    //     </div>
                    //     <Slider
                    //         loading={props.isFetchingLibraryData}
                    //         marginClass="librarySliderCenterLoaderMargin"
                    //         //@ts-ignore
                    //         content={content[key]}
                    //         show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}
                    //     />
                    // </div>
                )
                : null}
        </ScreenTemplate>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
        libraryLists: state.libraryState.libraryLists,
        isFetchingLibraryData: state.libraryState.isFetchingLibraryData
    };
}

const bindActions = (dispatch: any) => {
    return {
        fetchLibraryList: () => dispatch(ACTIONS.fetchLibraryList()),
        openVideoHandler: (id: number, userId: number, key: string) => dispatch(ACTIONS.openVideoHandler(id, userId, key)),
    };
};

export default connect(mapStateToProps, bindActions)(Library);