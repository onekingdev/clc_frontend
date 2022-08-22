import React, { useEffect, useState } from "react";
import Slider from "../Slider";
import SmallText from "../SmallText";
// @ts-ignore
import Modal from 'react-awesome-modal';
import MediaCard from '../../components/MediaCard';
import BigScreen from 'bigscreen';
import { embedVideo } from "../../helpers/formatter";
import './styles.css';
import Select from "../Select";

const VideoLibraryUnitGroup: React.FC<{
  content: any;
  _key: string;
  _index: number;
  // sortByWatch: string;
  // onChangeSortbyWatchedHandler: (ev: any) => void;
  // sortByNewest: string;
  // onChangeSortbyNewestHandler: (ev: any) => void;
  isFetchingLibraryData: boolean;
  openVideoHandler: (id: number) => void;
  // width: number;
}> = ({ content, _key: key, _index: index, isFetchingLibraryData, openVideoHandler }) => {
  const [width, setWidth] = useState(window.innerWidth);

  // adjust dimensions
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, [width]);
  const updateDimensions = () => {
      setWidth(window.innerWidth);
  }

  const [showModal, setShowModal] = useState({ show: false, url: '' });
  // const [viewItems, setViewItems] = useState([]);
  // useEffect(() => {
  //   if (content[key].length > 0) {
  //     let temp = content[key].map((item: any) => item)
  //     temp.sort((item1: { createdAt: string; libraryWatchingStatus: boolean; }, item2: { createdAt: string; libraryWatchingStatus: boolean; }) => {
  //       const watching1 = item1.libraryWatchingStatus;
  //       const watching2 = item2.libraryWatchingStatus;
  //       if (watching1 === watching2) {
  //         if (sortByNewest === "Newest") {
  //           return (new Date(item1.createdAt).getTime() - new Date(item2.createdAt).getTime());
  //         } else {
  //           return (new Date(item2.createdAt).getTime() - new Date(item1.createdAt).getTime());
  //         }
  //       } else {
  //         if (sortByWatch === "Watched") {
  //           return (watching1 ? 1 : 0) - (watching2 ? 1 : 0)
  //         } else {
  //           return (watching2 ? 1 : 0) - (watching1 ? 1 : 0)
  //         }
  //       }
  //     });
  //     setViewItems(temp);
  //   }
  // }, [content[key], sortByNewest, sortByWatch]);
  return (
    <>
      <div className={Object.keys(content).length - 1 === index ? 'bottomPadding' : ''}>
          <div className="libraryTextWrapper">
              <SmallText color="#FFF">
                  <SmallText bold>{key.split(' ')[0].toUpperCase()}</SmallText>
                  {' '}
                  {key.split(' ')[1] ? key.split(' ')[1].toUpperCase() : null}
              </SmallText>
          </div>
          {content[key] && content[key].length > 0 && (
            <Slider
                loading={isFetchingLibraryData}
                marginClass="librarySliderCenterLoaderMargin"
                //@ts-ignore
                content={content[key].map((item: any) => (
                  <MediaCard
                    image={item.image}
                    duration={item.duration}
                    title={item.title}
                    description={item.description}
                    onClick={() => setTimeout(() => {
                      setShowModal({ show: true, url: item.url })
                      openVideoHandler(item.id);
                    }, 500)}
                    watched={item.libraryWatchingStatus as boolean}
                  />
                ))}
                show={width < 650 ? 1 : width < 950 ? 2 : width < 1300 ? 3 : width < 1650 ? 4 : width < 2000 ? 5 : 6}
            />
          )}
      </div>
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
    </>
  )
}

export default VideoLibraryUnitGroup;