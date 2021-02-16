import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import TitleText from "../../components/TitleText";



function Version(props: any) {

    return (
        <div>
            <TitleText>Hello world</TitleText>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {

    };
}

const bindActions = (dispatch: any) => {
    return {

    };
};

export default connect(mapStateToProps, bindActions)(Version);