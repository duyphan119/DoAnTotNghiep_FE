import { configureStore } from "@reduxjs/toolkit";
import { Context, createWrapper, HYDRATE } from "next-redux-wrapper";
import { useDispatch } from "react-redux";
import { AnyAction, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducers";
import rootSaga from "./saga";

export interface State {
  tick: string;
}

// create your reducer
const reducer = (state: State = { tick: "init" }, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case "TICK":
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

// create a makeStore function
const makeStore: any = (context: Context) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export type RootState = ReturnType<typeof makeStore.getState>;

export type AppDispatch = typeof makeStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type ActionPayload<T> = {
  type: string;
  payload: T;
};

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
