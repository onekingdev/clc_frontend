import React, {useEffect, useState} from 'react';
import './styles.css';
import {Slide} from 'react-awesome-reveal';
import SmallText from "../SmallText";
import hamburger from '../../assets/images/Rectangle.png';
import Button from "../Button";
import PathsCardLogo from '../../assets/images/pathsLogo.png';
import TitleText from "../TitleText";

interface ISidebar {
    title: string,
    items: any,
    upperButtons: any[],
    reverse: boolean,
    closeButton: () => void,
    type: string,
    right?: boolean
}

const Sidebar: React.FC<ISidebar> = ({
    title,
    items,
    upperButtons,
    reverse,
    closeButton,
    type,
    right
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
        <Slide direction={right ? "right" : "left"} duration={500} style={right ? {zIndex: 2, position: 'absolute', top: 0, right: 0} : {zIndex: 2, position: 'absolute', top: 0}} reverse={reverse} triggerOnce>
            <div className="sideMenuContainer">
                <div style={right ? {marginLeft: -59, zIndex: 0} : {marginLeft: 305, zIndex: 0}}>
                    <Button onClick={closeButton} text="X" width={40} height={40} closeMenuButton={!right} closeMenuButtonRight={right} glow/>
                </div>
                <div className="sideMenuUpperButtonsWrapper">
                    {upperButtons.length > 0 ?
                        upperButtons.map((button, index) => <div key={index} style={{marginRight: 10}}>{button}</div>)
                        :null}
                </div>
                {type === 'default' ? <div className="sideMenuTitleWrapper">
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
                </div> :
                <div>
                    <img src={PathsCardLogo} width={209} height={97}/>
                    <div style={{marginTop: 30, marginLeft: 10, textAlign: 'left'}}>
                        <TitleText bold>{title}</TitleText>
                    </div>
                </div>
                }
                <div className="sideMenuBodyWrapper">
                    {items.length > 0 ?
                        items.map((item: any, index: number) =>
                            <div key={index}>
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
                        :  items}
                </div>
            </div>
        </Slide>
    );
}

export default Sidebar;
