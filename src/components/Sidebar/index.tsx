import React, {useEffect, useState} from 'react';
import './styles.css';
import {Slide} from 'react-awesome-reveal';
import SmallText from "../SmallText";
import hamburger from '../../assets/images/Rectangle.png';
import Button from "../Button";

interface ISidebar {
    title: string,
    items: any[],
    upperButtons: any[],
    reverse: boolean,
    closeButton: () => void
}

const Sidebar: React.FC<ISidebar> = ({
    title,
    items,
    upperButtons,
    reverse,
    closeButton
}) =>  {
    const [width, setWidth]   = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    // adjust dimensions
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    return (
        <Slide duration={500} style={{zIndex: 2, position: 'absolute', top: 0}} reverse={reverse} triggerOnce>
            <div className="sideMenuContainer">
                <div style={{marginLeft: 305, zIndex: 0}}>
                    <Button onClick={closeButton} text="X" width={40} height={40} closeMenuButton glow/>
                </div>
                <div className="sideMenuUpperButtonsWrapper">
                    {upperButtons.length > 0 ?
                        upperButtons.map((button, index) => <div key={index} style={{marginRight: 10}}>{button}</div>)
                        :null}
                </div>
                <div className="sideMenuTitleWrapper">
                    <div className="sideBarItemHamburgerWrapper">
                        <div className="sideBarItemHamburgerItemWrapper">
                            <img src={hamburger}/>
                        </div>
                        <div className="sideBarItemHamburgerItemWrapper">
                            <img src={hamburger}/>
                        </div>
                        <div className="sideBarItemHamburgerItemWrapper">
                            <img src={hamburger}/>
                        </div>
                    </div>
                    <div style={{marginLeft: 13}}>
                        <SmallText color="#FFF">{title}</SmallText>
                    </div>
                </div>
                <div className="sideMenuBodyWrapper">
                    {items.length > 0 ?
                        items.map((item, index) =>
                            <div>
                                {!(index % 2) ?
                                <div style={{display: 'flex'}}>
                                    <div className="sideMenuItemWrapper" style={{borderRightWidth: 1, borderBottomWidth: index === items.length -2 ? 0 : 1}}>
                                        {item}
                                    </div>
                                    <div className="sideMenuItemWrapper" style={{borderBottomWidth: index === items.length -2 ? 0 : 1}}>
                                        {items[index+1]}
                                    </div>
                                </div> : null}
                            </div>)
                        :null}
                </div>
            </div>
        </Slide>
    );
}

export default Sidebar;
