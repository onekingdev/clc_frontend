import React, { useEffect } from "react";
// @ts-ignore
import { connect, useSelector } from "react-redux";
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
import { IntercomProvider} from "react-use-intercom";
export const PrivateRoute = ({requireAuth=true, ...rest}) => {
  const user = useSelector((store:any) => store.authState.user)
  const isAuthenticated = !!user.id;
  return (
    <Route
      {...rest}
    >
      {requireAuth ? (isAuthenticated ? rest.children : <Redirect to={{pathname: '/'}} />) : rest.children}
      </Route>
  )
}
function Navigation(props: any) {
  const selector = useSelector((store:any) => store.authState.user)
  const INTERCOM_APP_ID = "stkorlo9";

  return (
    <Switch>
      {console.log("in router")}
      <Route exact path="/" component={Login} />
      <Route exact path="/code=:code" component={Login} />
      <PrivateRoute exact path="/payment" component={Payment} />
      <IntercomProvider
        appId={INTERCOM_APP_ID}
        autoBoot
        autoBootProps={{
          name: selector.userName,
          email: selector.email,
          userId: selector.stringID,
          customAttributes: { custom_attribute_key: "Hi There!" },
        }}
      >
        {props.user.id ? (
          <div>
            {props.user.assessment ? (
              <div>
                <Redirect to="/assessment-screen" />
                <PrivateRoute exact path="/assessment-screen" component={Assessment} />
                <PrivateRoute exact path="/assessment" component={Game} />
                <PrivateRoute exact path="/results" component={Results} />
              </div>
            ) : props.user.payment &&
              moment(props.user.payment.subscription).diff(moment(), "days") >
                0 ? (
              <div>
                <Redirect to="/home" />
                <PrivateRoute exact path="/assessment-screen" component={Assessment} />
                <PrivateRoute exact path="/assessment" component={Game} />
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/paths" component={Paths} />
                <PrivateRoute exact path="/library" component={Library} />
                <PrivateRoute exact path="/performance" component={Performance} />
                <PrivateRoute exact path="/game" component={Game} />
                <PrivateRoute exact path="/ai" component={Game} />
                <PrivateRoute exact path="/share" component={Game} />
                <PrivateRoute exact path="/version" component={Version} />
                <PrivateRoute exact path="/settings" component={Settings} />
                <PrivateRoute exact path="/payment" component={Payment} />
                <PrivateRoute exact path="/results" component={Results} />
              </div>
            ) : (
              <div>
                <PrivateRoute exact path="/results" component={Results} />
                <PrivateRoute exact path="/payment" component={Payment} />
                <PrivateRoute exact path="/assessment" component={Game} />
              </div>
            )}
          </div>
        ) :  <Redirect to="/" />}
       </IntercomProvider>
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
