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
import VideoLibraryUnitGroup from '../../components/VideoLibraryUnitGroup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';

function Library(props: any) {
    const [content, setContent] = useState({});

    useEffect(() => {
        if (props.user.id) {
            props.fetchLibraryList(undefined, undefined, props.user.id);
        }
    }, [props.user.id]);

    useEffect(() => {
        let obj: any = {};
        console.log(props.libraryLists)

        if (props.libraryLists && props.libraryLists) {
            Object.keys(props.libraryLists).forEach((key) => {
                obj[key] = [];
                props.libraryLists[key].sort((video1: any, video2: any) => video1.createdAt - video2.createdAt).forEach((item: any) => {
                    if (item.title.toLowerCase().includes(searchWord.toLowerCase())) {
                        obj[key].push(item)
                    }
                })
            })
            setContent(obj);
        }
    }, [props.libraryLists])

    const sortByNewestOption = ["Newest", "Oldest"];
    const [sortByNewest, setSortByNewest] = useState("");
    const onChangeSortbyNewestHandler = (ev: any) => {
        setSortByNewest(ev.target.value);
    }
    const sortByWatchOption = ["Watched", "Unwatched"];

    const [sortByWatch, setSortByWatch] = useState("");

    const onChangeSortbyWatchHandler = (ev: any) => {
        setSortByWatch(ev.target.value);
    }
    const [searchWord, setSearchHandler] = useState<string>("");
    const [filterWord, setFilterWord] = useState<string>("");
    const filterHandler = () => {
        props.fetchLibraryList(sortByNewest, sortByWatch, props.user.id)
        // if (filterWord !== searchWord) {
        //     setFilterWord(searchWord);
        // }
    };

    const [age, setAge] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

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
            {!!Object.keys(content).length ? (
                <>
                    <VideoLibraryUnitGroup
                        content={content}
                        _key={"Welcome"}
                        _index={1}
                        // sortByWatch={sortByWatch}
                        // onChangeSortbyWatchedHandler={onChangeSortbyWatchedHandler}
                        // sortByNewest={sortByNewest}
                        // onChangeSortbyNewestHandler={onChangeSortbyNewestHandler}
                        isFetchingLibraryData={props.isFetchingLibraryData}
                        openVideoHandler={(videoId) => props.openVideoHandler(videoId, props.user.id, "Welcome")}
                        // width={width}
                    />
                    <div className="filterWrapper">
                        <div className="sortGrapWrapper">
                            <Box sx={{ minWidth: 100 }}>
                                <FormControl size="small" fullWidth className="filter-container">
                                    <InputLabel className="filter-label" id="demo-videos-select-label">Videos</InputLabel>
                                    <Select
                                        className="filter-select"
                                        labelId="demo-videos-select-label"
                                        id="demo-videos-select"
                                        value={sortByWatch}
                                        label="Videos"
                                        onChange={onChangeSortbyWatchHandler}
                                    >
                                    {
                                        sortByWatchOption.map((option, id) => (
                                            <MenuItem key={id} value={option}>{option}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
                            </Box>
                            {/* <select name="sortByWatch" id="" value={sortByWatch} onChange={onChangeSortbyWatchHandler}>
                                {sortByWatchOption.map((option, id) => (
                                    <option value={option} key={id}>{ option }</option>
                                ))}
                            </select> */}
                        </div>
                        <div className="sortGrapWrapper">
                            <Box sx={{ minWidth: 100 }}>
                                <FormControl size="small" fullWidth className="filter-container">
                                    <InputLabel className="filter-label" id="demo-videos-select-label">Sort by date</InputLabel>
                                    <Select
                                        className="filter-select"
                                        labelId="demo-videos-select-label"
                                        id="demo-videos-select"
                                        value={sortByNewest}
                                        label="Videos"
                                        onChange={onChangeSortbyNewestHandler}
                                    >
                                    {
                                        sortByNewestOption.map((option, id) => (
                                            <MenuItem key={id} value={option}>{option}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
                            </Box>
                            {/* <select name="sortByNewest" id="" value={sortByNewest} onChange={onChangeSortbyNewestHandler}>
                                {sortByNewestOption.map((option, id) => (
                                    <option value={option} key={id}>{ option }</option>
                                ))}
                            </select> */}
                        </div>
                        <div className="sortGrapWrapper">
                            <TextField size="small" className="filter-search" id="outlined-basic" label="Search by name" variant="outlined" value={searchWord} onChange={(e) => { setSearchHandler(e.target.value) }} />
                            {/* <input value={searchWord} onChange={(e) => {setSearchHandler(e.target.value)}} style={{ height: "40px", borderRadius: "8px" }} /> */}
                            <button className="search-btn" onClick={filterHandler}>Search</button>
                        </div>
                    </div>
                    {Object.keys(content).map((key: string, index) => 
                        key !== "Welcome" && <VideoLibraryUnitGroup
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
                    )}
                </>) : null}
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
        fetchLibraryList: (sortByNewest?: string, sortByWatch?: string, userId?: string) => dispatch(ACTIONS.fetchLibraryList(sortByNewest, sortByWatch, userId)),
        openVideoHandler: (id: number, userId: number, key: string) => dispatch(ACTIONS.openVideoHandler(id, userId, key)),
    };
};

export default connect(mapStateToProps, bindActions)(Library);