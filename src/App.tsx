import React, { useState, useEffect } from "react";
import Navigation from "./services/navigation";
// @ts-ignore
import { BrowserRouter } from "react-router-dom";
// @ts-ignore
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import * as TYPES from "./containers/Authentication/store/actions/types"
declare const rewardful: any;
declare let Rewardful: any;
const App = () => {
  const [loading, setLoading] = useState(true);
  const [persist] = useState(store(() => setLoading(false)));

  if(rewardful)
    rewardful('ready', function() {
      if(Rewardful?.referral) {
        persist.store.dispatch({type: TYPES.SET_REWARDFUL_ID, payload: Rewardful.referral});
        console.log('Current referral ID: ', Rewardful.referral);
      } else {
        console.log('No referral present.');
      }
    });

  return (
    <Provider store={persist.store}>
      <PersistGate loading={loading} persistor={persist.persistor}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </PersistGate>

    </Provider>
  );
};

export default App;
