import React, {useEffect, useState} from 'react';
import './styles.css';
import {Fade} from 'react-awesome-reveal';
import Button from '../Button';
import PulseLoader from 'react-spinners/PulseLoader';

interface ISlider {
    content: any[],
    show: number,
    loading: boolean,
    marginClass?: string
}

const Slider: React.FC<ISlider> = ({
                                       content,
                                       show,
                                       loading,
                                       marginClass
                                   }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const dotNum = content.length / show;

    const renderContent = (index: number) => {
        let showFrom = index * show;
        let display = [];

        for (let i: number = showFrom; i < showFrom + show; i++) {
            display.push(
                <Fade key={i} duration={3000} triggerOnce style={{margin: 10}}>
                    {content[i]}
                </Fade>
            )
        }
        return display
    }

    const renderDots = (index: number) => {
        let dots = [];

        for (let i: number = 0; i < dotNum; i++) {
            dots.push(
                <div className="sliderDots"
                     onClick={() => setSelectedIndex(i)}
                     style={{
                         marginRight: '2px',
                         marginLeft: '2px',
                         backgroundColor: i === index ? 'var(--primary)' : 'transparent'
                     }}/>
            )
        }
        return dots;
    };

    return (
        <div className="sliderContainer">
            <div style={{display: 'flex', alignItems: 'center'}}>
                {selectedIndex !== 0 ?
                    <div style={{paddingLeft: 60, marginRight: -100, zIndex: 1}}>
                        <Button onClick={() => setSelectedIndex(selectedIndex - 1)} width={40} height={40}
                                circular glow iconName="faChevronLeft" iconSize="1x"/>
                    </div> : null}

                <div className="sliderCardsWrapper">
                    {loading ?
                        <div className={`sliderCenterLoader ${marginClass}`}>
                            <PulseLoader loading={true} color="#FFF"/>
                        </div>
                        :
                        renderContent(selectedIndex)
                    }
                </div>
                {selectedIndex !== dotNum - 1 && dotNum > 1 && selectedIndex < dotNum -1 ?
                    <div style={{paddingRight: 60, marginLeft: -100, zIndex: 1}}>
                        <Button onClick={() => setSelectedIndex(selectedIndex + 1)} width={40} height={40}
                                circular glow
                                iconName="faChevronRight" iconSize="1x"/>
                    </div>
                    : null}
            </div>
            <div className="sliderFooterWrapper">
                <div className="sliderDotsWrapper">
                    {renderDots(selectedIndex)}
                </div>
            </div>
        </div>
    );
}

export default Slider;