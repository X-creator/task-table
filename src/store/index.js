import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import dataReducer from "./dataSlice";
import searchReducer from "./searchSlice";
import saga from "./saga";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    data: dataReducer,
    search: searchReducer
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(saga);

export default store;