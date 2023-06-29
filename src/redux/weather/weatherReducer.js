import {
    FETCH_WEATHER_START,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE,
    FETCH_FORECAST_START,
    FETCH_FORECAST_SUCCESS,
    FETCH_FORECAST_FAILURE,
  } from './weatherActions';
  
  const initialState = {
    loading: false,
    weather: [],
    forecast: {}, 
    error: '',
  };
  
  const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_WEATHER_START:
        return {
          ...state,
          loading: true,
        };
      case FETCH_WEATHER_SUCCESS:
        return {
          ...state,
          loading: false,
          weather: [...state.weather, action.payload],
        };
      case FETCH_WEATHER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case FETCH_FORECAST_START: 
        return {
          ...state,
          loading: true,
        };
      case FETCH_FORECAST_SUCCESS: 
        return {
          ...state,
          loading: false,
          forecast: action.payload,
        };
      case FETCH_FORECAST_FAILURE: 
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default weatherReducer;
  