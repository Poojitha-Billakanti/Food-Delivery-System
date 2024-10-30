import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../feature/redux/slice/tokenSlice.js";

export default configureStore({
  reducer: {
    tokenLoader: tokenReducer,
  },
});
