import React, {useEffect, useState} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
import {validateEmail} from '../../../helpers/validations';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import ErrorDisplay from '../../../components/ErrorDisplay';
import SubtitleText from '../../../components/SubtitleText';
import {
    emptyEmailString,
    invalidEmailString,
    notFoundEmailString
    // @ts-ignore
} from '../../../helpers/constants';
import {IUser} from "../interfaces";
import * as ACTIONS from "../store/actions";
import {emailReset} from "../store/actions";

interface IEmailResetModal {
    reset: boolean
}

const EmailResetModal: React.FC<IEmailResetModal> = ({
                                                         reset
                                                     }) =>  {

    const [emailObj, setEmailObj] = useState({email: '', error: false});
    const [showErrorMsg, setShowErrorMsg] = useState('');

    useEffect(() => {
        if (reset) {
            setEmailObj({email: '', error: false});
            setShowErrorMsg('');
        }
    }, [reset]);

    useEffect(() => {
        if (!emailObj.error) {
            setShowErrorMsg('');
        }
    }, [emailObj])

    const handleSubmit = () => {
        if (emailObj.email === '') {
            setEmailObj({email: emailObj.email, error: true});
            setShowErrorMsg(emptyEmailString);
        } else if (!validateEmail(emailObj.email)) {
            setEmailObj({email: emailObj.email, error: true});
            setShowErrorMsg(invalidEmailString);
        } else {
            // setShowErrorMsg(notFoundEmailString);
            const request = {
                email: emailObj.email
            }

            emailReset(request);
        }
    }

    return (
        <div className="emailResetContainer">
            <div>
                <SubtitleText bold={true}>Email</SubtitleText>
                <div style={{marginTop: 20}}>
                    <TextInput
                        value={emailObj.email}
                        placeholder="Email"
                        onChange={(event) => setEmailObj({email: event.target.value, error: false})}
                        email={true}
                        error={emailObj.error}
                    />
                </div>
                <div style={{marginTop: 20}}>
                    <Button onClick={() => handleSubmit()} width="100%" height={45} glow={true} text="Send"/>
                </div>
                <ErrorDisplay message={showErrorMsg} show={showErrorMsg !== ''}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        isAuthenticating: state.authState.isAuthenticating,
        messageCode: state.authState.messageCode
    };
}

const bindActions = (dispatch: any) => {
    return {
        emailReset: (data: IUser) => dispatch(ACTIONS.emailReset(data))
    };
};

export default connect(mapStateToProps, bindActions)(EmailResetModal);
