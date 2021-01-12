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
    notFoundEmailString,
    resetPasswordEmailSent
    // @ts-ignore
} from '../../../helpers/constants';
import {IUser} from "../interfaces";
import * as ACTIONS from "../store/actions";
import {emailReset} from "../store/actions";
// @ts-ignore
import {useHistory} from 'react-router-dom';
import {formatMessageCode} from "../../../helpers/formatter";

interface IEmailResetModal {
    reset: boolean,
    isFetchingAuthentication: boolean,
    messageCode: number | string,
    emailReset: (data: IUser, callback: (success: boolean) => void) => void,
}

const EmailResetModal: React.FC<IEmailResetModal> = ({
    reset,
    isFetchingAuthentication,
    messageCode,
    emailReset
                                                     }) =>  {

    const [emailObj, setEmailObj] = useState({email: '', error: false});
    const [showErrorMsg, setShowErrorMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState('');

    useEffect(() => {
        setEmailObj({email: '', error: false});
        setShowErrorMsg('');
        setShowSuccessMsg('');
    }, [reset]);

    useEffect(() => {
        if (!emailObj.error) {
            setShowErrorMsg('');
        }
    }, [emailObj])

    useEffect(() => {
        if (messageCode) {
            setShowErrorMsg(formatMessageCode(messageCode))
        }
    }, [messageCode])

    const handleSubmit = () => {
        if (emailObj.email === '') {
            setEmailObj({email: emailObj.email, error: true});
            setShowErrorMsg(emptyEmailString);
        } else if (!validateEmail(emailObj.email)) {
            setEmailObj({email: emailObj.email, error: true});
            setShowErrorMsg(invalidEmailString);
        } else {
            const request = {
                email: emailObj.email
            }

            emailReset(request, (success) => {
                if (success) {
                    setShowErrorMsg('');
                    setShowSuccessMsg(resetPasswordEmailSent);
                }
            });
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
                    <Button loading={isFetchingAuthentication} onClick={() => handleSubmit()} width="100%" height={45} glow={true} text="Send"/>
                </div>
                {showSuccessMsg ? <ErrorDisplay message={showSuccessMsg} show={showSuccessMsg !== ''} color="var(--primary)"/>
                    : <ErrorDisplay message={showErrorMsg} show={showErrorMsg !== ''}/>}
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        isFetchingAuthentication: state.authState.isFetchingAuthentication,
        messageCode: state.authState.messageCode
    };
}

const bindActions = (dispatch: any) => {
    return {
        emailReset: (data: IUser, callback: (success: boolean) => void) => dispatch(ACTIONS.emailReset(data, callback))
    };
};

export default connect(mapStateToProps, bindActions)(EmailResetModal);
