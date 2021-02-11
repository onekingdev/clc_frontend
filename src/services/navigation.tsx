import React, {useEffect} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
// @ts-ignore
import {Route, Redirect} from 'react-router-dom';
import Login from '../containers/Authentication';
import Paths from '../containers/Paths';
import Library from '../containers/Library';
import Performance from '../containers/Performance';
import Assessment from '../containers/Assessment';
import Results from '../containers/Results';
import Game from '../containers/Game';

function Navigation(props: any) {

    return (
        <div>
            <Route exact path="/" component={Login}/>
            {props.user.id ?
                <div>
                    {props.user.assessment ?
                    <div>
                        <Redirect to="/assessment-screen"/>
                        <Route exact path="/assessment-screen" component={Assessment}/>
                        <Route exact path="/assessment" component={Game}/>
                    </div>
                        :
                        <div>
                            <Route exact path="/paths" component={Paths}/>
                            <Route exact path="/library" component={Library}/>
                            <Route exact path="/performance" component={Performance}/>
                            <Route exact path="/results" component={Results}/>
                            <Route exact path="/game" component={Game}/>
                            <Route exact path="/ai" component={Game}/>
                            <Route exact path="/share" component={Game}/>
                        </div>
                    }
                </div> : <Redirect to="/" />}
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
    };
}

const bindActions = (dispatch: any) => {
    return {};
};

export default connect(mapStateToProps, bindActions)(Navigation);