import React from 'react';
// @ts-ignore
import {Route} from 'react-router-dom';
import Login from '../containers/Authentication';
import Paths from '../containers/Paths';
import Library from '../containers/Library';
import Performance from '../containers/Performance';
import Game from '../containers/Game';
import ScreenTemplate from "../containers/ScreenTemplate";

export default function Navigation() {
    return (
        <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/paths" component={Paths} />
            <Route exact path="/library" component={Library} />
            <Route exact path="/performance" component={Performance} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/ai" component={Game} />
            <Route exact path="/share" component={Game} />
        </div>
);
}