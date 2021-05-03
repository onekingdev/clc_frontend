import React from 'react';
import './styles.css';

interface ISmallText {
    children: any,
    color?: string,
    bold?: boolean,
    fontStyle?: string,
    textDecoration?: string,
    fontSize?: string
}

const SmallText: React.FC<ISmallText> = ({
                                             children,
                                             color,
                                             bold,
                                             fontStyle,
                                             textDecoration,
                                             fontSize
                                         }) =>  {

    return (
        <span
            className="smallText"
            style={{
                color: color ? color : 'var(--primary-small-text)',
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: fontStyle ? fontStyle : 'none',
                textDecoration: textDecoration ? textDecoration : 'none',
                fontSize : fontSize ? fontSize : "12px"
            }}>
            {children}
        </span>
    );
}

export default SmallText;