import React from 'react';
import './styles.css';

interface ITitleText {
    children: any,
    color?: string,
    bold?: boolean,
    fontStyle?: string,
    textDecoration?: string
}

const TitleText: React.FC<ITitleText> = ({
                                             children,
                                             color,
                                             bold,
                                             fontStyle,
                                             textDecoration
                                         }) =>  {

    return (
        <span
            className="titleText"
            style={{
                color: color ? color : 'var(--primary-title-text)',
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: fontStyle ? fontStyle : 'none',
                textDecoration: textDecoration ? textDecoration : 'none'
            }}>
            {children}
        </span>
    );
}

export default TitleText;