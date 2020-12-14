import React, {useState} from "react";
import SidebarItem from "../components/SidebarItem";
import Logo from "../assets/images/clai-logo.png";
import ChipItem from "../components/ChipItem";
import Avatar from "../components/Avatar";
import Header from "../components/Header";

export const sidebarItems: any = [
    <SidebarItem icon="home" text="Home" onClick={() => {
    }}/>,
    <SidebarItem icon="ai" text="AI Learning" onClick={() => {
    }}/>,
    <SidebarItem icon="path" text="Pick Your Path" onClick={() => {
    }}/>,
    <SidebarItem icon="practice" text="Practice" onClick={() => {
    }}/>,
    <SidebarItem icon="video" text="Video Library" onClick={() => {
    }}/>,
    <SidebarItem icon="training" text="Advanced Training" onClick={() => {
    }}/>,
    <SidebarItem icon="performance" text="My Performance" onClick={() => {
    }}/>,
    <SidebarItem icon="answers" text="Answers" onClick={() => {
    }}/>,
];

export const header = (setSlider: (show: boolean) => void, scrolling: number, setSettings: (show: boolean) => void) =>
    <Header
        scrolling={scrolling}
        left={
            <div style={{marginLeft: '10%'}}>
                <SidebarItem icon="hamburger" onClick={() => setSlider(true)}/>
            </div>
        }
        middle={
            <div className="headerItemWrapper">
                <img src={Logo} width={210} height={58}/>
            </div>
        }
        right={
            <div className="headerItemWrapper">
                <div className="headerChipTicketWrapper">
                    <div className="headerChipWrapper">
                        <ChipItem icon="chip" quantity={25} size="small"/>
                    </div>
                    <div className="headerCashWrapper">
                        <ChipItem icon="cash" quantity={3} size="small"/>
                    </div>
                </div>
                <Avatar
                    size="medium"
                    image=""
                    text="Chance Franci"
                    rank={1}
                    onClick={() => setSettings(true)}
                />
            </div>
        }
    />