import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// @ts-ignore
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
// @ts-ignore
import devTools from "remote-redux-devtools";

const persistConfig = {
  key: "authState",
  storage: storage,
  whitelist: ["authState"], // which reducer want to store
};

const logger = createLogger();

const promise = () => (next: any) => (action: any) =>
  typeof action.then === "function"
    ? Promise.resolve(action).then(next, (error: any) => {
        throw error; // To let the caller handle the rejection
      })
    : next(action);

const enhancer = compose(
    // applyMiddleware(thunk, promise, logger),
    applyMiddleware(thunk, promise),
    devTools({
        name: 'Chip Leader AI',
        realtime: true,
    }),
);

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store: any = createStore(persistedReducer, enhancer);
export default function configureStore(onCompletion: any) {
    // let store: any = createStore(persistedReducer, enhancer);
    let persistor = persistStore(store);
    return {store, persistor};
}
