import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
import Button from "../../components/Button";
import {IUser} from "../Authentication/interfaces";
import * as ACTIONS from "../Authentication/store/actions";
// @ts-ignore
import {useHistory} from 'react-router-dom';

function Settings(props: any) {
    const history = useHistory();

    return (
        <div className="settingsContainer">
            <Button
                loading={props.isFetchingAuthentication}
                width={200}
                height={44}
                text="Logout"
                glow
                onClick={() => {
                    props.logout((success: boolean) => {
                        if (success) {
                            history.push(`/`);
                        }
                    })
                }}
            />
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
        logout: (callback: (success: boolean) => void) => dispatch(ACTIONS.logout(callback))
    };
};

export default connect(mapStateToProps, bindActions)(Settings);