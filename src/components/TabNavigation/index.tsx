import React, {useEffect, useState} from 'react';
import './styles.css';
import BodyText from '../BodyText';
import {Slide} from 'react-awesome-reveal';
import { on } from 'cluster';

interface ITabNavigation {
    selectedIndex: number,
    tabs: string[],
    callback: (index: number) => void
}

const TabNavigation: React.FC<ITabNavigation> = ({
                                   selectedIndex,
                                   tabs,
                                   callback
                               }) =>  {
    const [direction, setDirection]: any = useState('right');
    const [passedIndex, setPassedIndex] = useState(selectedIndex);

    useEffect(() => {
        if (selectedIndex < passedIndex) {
            setDirection('right');
        } else {
            setDirection('left');
        }
        setPassedIndex(selectedIndex);
    }, [selectedIndex]);

    return (
        <div className="tabsContainer">
            {filterTabs(tabs).map((item, index) =>
                <div key={index} className="tabWrapper" onClick={() => callback(index)}>
                    <div className="tabTextWrapper">
                        <BodyText
                            bold
                            color={selectedIndex === index ? 'var(--primary)' : 'var(--primary-title-text)'}>
                            {item}
                        </BodyText>
                    </div>
                    {selectedIndex === index ?
                        <Slide direction={direction} triggerOnce>
                            <div className="tabUnderline"/>
                        </Slide> : null}
                </div>
            )}
        </div>
    );
}

const onlyUnique = (value: string, index: number, self: Array<string>) => self.indexOf(value) === index;

const filterTabs = ( tabs: Array<string> ) => tabs.map((tab: string) => tab.trim()).filter(onlyUnique);

export default TabNavigation;
