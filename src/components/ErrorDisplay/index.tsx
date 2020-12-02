import React, {useState} from 'react';
import './styles.css';
import SmallText from '../SmallText';

interface IErrorDisplay {
    message: string,
    show: boolean
}

const ErrorDisplay: React.FC<IErrorDisplay> = ({
                                                   message,
                                                   show
                                               }) =>  {
    return (
        <div className="errorMessageContainer">
            {show ? <SmallText color="var(--error-small-text)">{message}</SmallText> :
                <div style={{height: 19}}/>}
        </div>
    );
}

export default ErrorDisplay;
