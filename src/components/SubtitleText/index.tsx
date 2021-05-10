import React from 'react';
import './styles.css';

interface ISubtitleText {
    children: any,
    color?: string,
    bold?: boolean,
    fontStyle?: string,
    textDecoration?: string
    marginLeft?: number,
    marginRight?: number,
    fontSize?: string
}

const SubtitleText: React.FC<ISubtitleText> = ({
    children,
    color,
    bold,
    fontStyle,
    textDecoration,
    marginRight,
    marginLeft,
    fontSize
                                       }) =>  {

    return (
        <span
            className="subtitleText"
            style={{
                marginLeft: marginLeft,
                marginRight: marginRight,
                color: color ? color : 'var(--primary-subtitle-text)',
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: fontStyle ? fontStyle : 'none',
                textDecoration: textDecoration ? textDecoration : 'none',
                fontSize: fontSize ? fontSize : "16px"
            }}>
            {children}
        </span>
    );
}

export default SubtitleText;
