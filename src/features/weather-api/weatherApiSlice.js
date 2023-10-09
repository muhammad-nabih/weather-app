import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=31.417540&lon=31.814444&appid=02ae4580ab6abd83b3173850910a2045"
    );

    // handle success
    const weatherData = {
      number: Math.round(response.data.main.temp - 272.15),
      min: Math.round(response.data.main.temp - 272.15),
      max: Math.round(response.data.main.temp - 272.15),
      description: response.data.weather[0].description,
      nameCountry: response.data.name,
      icon: response.data.weather[0].icon,
    };

    const { number, min, max, description, nameCountry, icon } = weatherData;
    return { number, min, max, description, nameCountry, icon };
  }
);

// Initial State
const initialState = {
  result: "EMPTY STATE",
  weather: {},
  isLoading: false,
};

export const weatherApi = createSlice({
  name: "weatherApi",
  initialState: initialState,
  // THUNK ASYNC FUNCTION
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.rejected, () => {
        console.error("The Request Is Failed ");
 
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.isLoading = false;
      });
  },
});

export default weatherApi.reducer;
