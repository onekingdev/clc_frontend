import React, { useState, useEffect } from "react";
import Navigation from "./services/navigation";
// @ts-ignore
import { BrowserRouter, Route } from "react-router-dom";
// @ts-ignore
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import TagManager from 'react-gtm-module';
const tagManagerArgs = {
  gtmId: 'GTM-WWR69FZ'
}
TagManager.initialize(tagManagerArgs)

const App = () => {
  const [loading, setLoading] = useState(true);
  const [persist] = useState(store(() => setLoading(false)));
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
