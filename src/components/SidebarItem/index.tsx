import React, {useState} from 'react';
import './styles.css';
import SmallText from "../SmallText";
import pro from '../../assets/images/PRO.png';
import hamburger from '../../assets/images/Rectangle.png';
import home from '../../assets/images/Vector 3.png';
import ai from '../../assets/images/Vector 3-1.png';
import path from '../../assets/images/Vector 3-2.png';
import practice1 from '../../assets/images/Vector 3-3.png';
import practice2 from '../../assets/images/Vector 4.png';
import video1 from '../../assets/images/Vector 4-1.png';
import video2 from '../../assets/images/Vector 5.png';
import performance1 from '../../assets/images/Vector 9.png';
import performance2 from '../../assets/images/Vector 8.png';
import answer from '../../assets/images/Vector 8-1.png';

interface ISidebarItem {
    icon: string,
    text?: string
    onClick: () => void
}

const SidebarItem: React.FC<ISidebarItem> = ({
    icon,
    text,
    onClick
}) =>  {
    const renderIcon = (i: string) => {
        switch (i) {
            case 'home':
                return(
                    <div className="">
                        <img src={home}/>
                    </div>
                );
            case 'ai':
                return(
                    <div className="">
                        <img src={ai}/>
                    </div>
                );
            case 'path':
                return(
                    <div className="">
                        <img src={path}/>
                    </div>
                );
            case 'practice':
                return(
                    <div className="">
                        <img src={practice1} style={{position: 'fixed', marginLeft: 6, marginTop: 10}}/>
                        <img src={practice2} style={{marginTop: 5}}/>
                    </div>
                );
            case 'video':
                return(
                    <div className="sideBarItemVideoWrapper">
                        <img src={video1}/>
                        <img src={video2} style={{marginLeft: -1}}/>
                    </div>
                );
            case 'training':
                return(
                    <div className="">
                        <img src={pro}/>
                    </div>
                );
            case 'performance':
                return(
                    <div className="">
                        <img src={performance1}/>
                        <img className="sideBarItemPerformanceWrapper" src={performance2}/>
                    </div>
                );
            case 'answers':
                return(
                    <div className="">
                        <img src={answer}/>
                    </div>
                );
            default:
                return (
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
                )
        }
    }

    return (
        <div className="sideBarItemContainer" onClick={onClick}>
            <div className="sideBarItemIconContainer">
                {renderIcon(icon)}
            </div>
            {text ? <div className="sideBarItemTextWrapper"><SmallText color="#FFF" bold>{text}</SmallText></div> : null}
        </div>
    );
}

export default SidebarItem;