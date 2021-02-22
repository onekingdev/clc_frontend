import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';

function Version(props: any) {

    return (
        <div className="versionContainer">
            <iframe
                src="https://docs.google.com/document/d/1A9XHs_u42qunweu4RtqDajgTNtPzA8KHt7cD2ONfXWk/edit?usp=sharing"
                width="100%"
                height="100%"
            />
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