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