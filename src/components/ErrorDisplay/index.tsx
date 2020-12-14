import React, {useState} from 'react';
import './styles.css';
import SmallText from '../SmallText';

interface IErrorDisplay {
    message: string,
    show: boolean,
    color?: string
}

const ErrorDisplay: React.FC<IErrorDisplay> = ({
   message,
   show,
   color

}) =>  {
    return (
        <div className="errorMessageContainer">
            {show ? <SmallText color={color ? color : 'var(--error-small-text)'}>{message}</SmallText> :
                <div style={{height: 19}}/>}
        </div>
    );
}

export default ErrorDisplay;
