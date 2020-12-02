import React, {useState} from 'react';
import './styles.css';

interface IHeader {
    left?: any,
    middle?: any,
    right?: any
}

const Header: React.FC<IHeader> = ({
                                       left,
                                       middle,
                                       right
                                   }) =>  {
    return (
        <div className="headerContainer">
            <div className="headerSectionContainer">
                {left}
            </div>
            <div className="headerSectionContainer">
                {middle}
            </div>
            <div className="headerSectionContainer">
                {right}
            </div>
        </div>
    );
}

export default Header;
