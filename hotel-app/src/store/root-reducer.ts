import { combineReducers } from "redux";
import hotelSlice from "./hotelSlice";

const appReducer = combineReducers({
  hotel: hotelSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
