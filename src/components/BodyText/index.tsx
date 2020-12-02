import React from 'react';
import './styles.css';

interface IBodyText {
    children: any,
    color?: string,
    bold?: boolean,
    fontStyle?: string,
    textDecoration?: string
}

const BodyText: React.FC<IBodyText> = ({
                                           children,
                                           color,
                                           bold,
                                           fontStyle,
                                           textDecoration
                                       }) =>  {

    return (
        <span
            className="bodyText"
            style={{
                color: color ? color : 'var(--primary-body-text)',
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: fontStyle ? fontStyle : 'none',
                textDecoration: textDecoration ? textDecoration : 'none'
            }}>
            {children}
        </span>
    );
}

export default BodyText;
