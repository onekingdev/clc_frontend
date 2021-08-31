import React, { useEffect } from "react";
// @ts-ignore
import { connect } from "react-redux";
// @ts-ignore
import { Route, Redirect, useHistory, Switch } from "react-router-dom";
import Login from "../containers/Authentication";
import Paths from "../containers/Paths";
import Library from "../containers/Library";
import Performance from "../containers/Performance";
import Assessment from "../containers/Assessment";
import Results from "../containers/Results";
import Game from "../containers/Game";
import Payment from "../containers/Payment";
import Version from "../containers/Version";
import Home from "../containers/Home";
import Settings from "../containers/Settings";
import moment from "moment";
import EmailResetModal from "../containers/Authentication/EmailResetModal";
import RegisterModal from "../containers/Authentication/RegisterModal";

function Navigation(props: any) {
  const history = useHistory();
  // useEffect(() => {
  //   console.log("AAaaaaaaaaaaaaaaaaaaaaaaaaSSSSSSSSs");
  //   console.log(props.user.assessment);
  //   console.log(props.user);
  //   console.log("AAaaaaaaaaaaaaaaaaaaaaaaaaSSSSSSSSs");
  //   if (
  //     !props.user.assessment &&
  //     window.location.pathname.includes("assessment")
  //   ) {
  //     history.push(`/home`);
  //   }
  // }, []);
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/code=:code" component={Login} />
      {props.user.id ? (
        <div>
          {moment(props.user.payment.subscription).diff(moment(), "days") > 0 ? (
            <div>
              <Redirect to="/assessment-screen" />
              <Route exact path="/assessment-screen" component={Assessment} />
              <Route exact path="/assessment" component={Game} />
            </div>
          ) : (
                <div>
                  <Route
                    exact
                    path="/assessment-screen"
                    component={Assessment}
                  />
                  <Route exact path="/assessment" component={Game} />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/paths" component={Paths} />
                  <Route exact path="/library" component={Library} />
                  <Route exact path="/performance" component={Performance} />
                  <Route exact path="/game" component={Game} />
                  <Route exact path="/ai" component={Game} />
                  <Route exact path="/share" component={Game} />
                  <Route exact path="/version" component={Version} />
                  <Route exact path="/settings" component={Settings} />
                </div> )
                }
              <div>
                <Route exact path="/results" component={Results} />
                <Route exact path="/payment" component={Payment} />
              </div>
            </div>
      ) : (
        <Redirect to="/" />
      )}
    </Switch>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.authState.user,
  };
};

const bindActions = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, bindActions)(Navigation);
