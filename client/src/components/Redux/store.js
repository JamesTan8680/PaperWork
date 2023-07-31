import { configureStore } from "@reduxjs/toolkit";
import DataReducer from "./DataSlice";

export default configureStore({
  reducer: {
    data: DataReducer,
  },
});
