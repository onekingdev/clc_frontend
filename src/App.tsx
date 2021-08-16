import React, { useState } from "react";
import Navigation from "./services/navigation";
// @ts-ignore
import { BrowserRouter } from "react-router-dom";
// @ts-ignore
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { IntercomProvider, useIntercom } from "react-use-intercom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [persist] = useState(store(() => setLoading(false)));
  const INTERCOM_APP_ID = "stkorlo9";

  return (
    <Provider store={persist.store}>
      <PersistGate loading={loading} persistor={persist.persistor}>
        <BrowserRouter>
          <IntercomProvider appId={INTERCOM_APP_ID} autoBoot>
            <Navigation />
          </IntercomProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
