import React, {useEffect, useState} from 'react';
import './styles.css';
import {Fade} from "react-awesome-reveal";

interface IHeader {
    left?: any,
    middle?: any,
    right?: any,
    scrolling?: number,
}

const Header: React.FC<IHeader> = ({
    left,
    middle,
    right,
    scrolling
                                   }) =>  {
    const [width, setWidth]   = useState(window.innerWidth);

    // adjust dimensions
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    return (
        <>
            {/*width < 900 ?
                <div className="headerSectionContainer" style={{paddingTop: 40}}>
                    {middle}
                </div>
                : null*/}
            <div className="headerContainer">
                {scrolling !== 0 ?
                    <Fade style={{zIndex: 1}}>
                        <div className="headerBg">
                            <div className="fadedScroller_fade"/>
                        </div>
                    </Fade> : null}
                <div className="headerSectionContainer">
                    {left}
                </div>
                {width > 800 ? <div className="headerSectionContainer">
                    {middle}
                </div> : null}
                <div className="headerSectionContainer">
                    {right}
                </div>
            </div>
        </>
    );
}

export default Header;
