import React, {useState, useEffect} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
// @ts-ignore
import {useHistory} from 'react-router-dom';
import ScreenTemplate from "../ScreenTemplate";
import Button from "../../components/Button";

function Assessment(props: any) {
    const history = useHistory();

    return (
        <ScreenTemplate>
            <div className="assessmentContainer">
                <Button onClick={() => history.push('assessment')} width={200} height={47} glow text="Take Assessment"/>
            </div>
        </ScreenTemplate>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
    };
}

const bindActions = (dispatch: any) => {
    return {

    };
};

export default connect(mapStateToProps, bindActions)(Assessment);