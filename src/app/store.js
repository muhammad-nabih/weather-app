import { configureStore } from "@reduxjs/toolkit";
import weatherApiSliceReducer from "../features/weather-api/weatherApiSlice";
export const store = configureStore({
  reducer: {
    weather: weatherApiSliceReducer,
  },
});
