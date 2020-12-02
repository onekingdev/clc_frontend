import React, {useState} from 'react';
import './styles.css';
import BodyText from "../BodyText";

interface ITextInput {
    value: string,
    placeholder?: string,
    label?: string,
    onChange: (event: any) => void,
    password?: boolean,
    email?: boolean,
    error?: boolean
}

const TextInput: React.FC<ITextInput> = ({
                                             value,
                                             label,
                                             placeholder,
                                             onChange,
                                             password,
                                             email,
                                             error
                                         }) =>  {
    return (
        <div className="textInputContainer">
            {label ? <div className="textInputLabelWrapper">
                <BodyText bold={true}>{label}</BodyText>
            </div> : null}
            <input
                className={error ? 'textInputError' : 'textInput'}
                type={password ? 'password' : email ? 'email' : 'text'}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}

export default TextInput;
