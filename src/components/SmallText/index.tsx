import React from 'react';
import './styles.css';

interface ISmallText {
    children: any,
    color?: string,
    bold?: boolean,
    fontStyle?: string,
    textDecoration?: string
}

const SmallText: React.FC<ISmallText> = ({
                                             children,
                                             color,
                                             bold,
                                             fontStyle,
                                             textDecoration
                                         }) =>  {

    return (
        <span
            className="smallText"
            style={{
                color: color ? color : 'var(--primary-small-text)',
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: fontStyle ? fontStyle : 'none',
                textDecoration: textDecoration ? textDecoration : 'none'
            }}>
            {children}
        </span>
    );
}

export default SmallText;