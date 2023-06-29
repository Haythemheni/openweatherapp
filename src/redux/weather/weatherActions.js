
export const FETCH_WEATHER_START = "FETCH_WEATHER_START";
export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE";

export const fetchWeatherStart = () => ({
  type: FETCH_WEATHER_START,
});

export const fetchWeatherSuccess = (weather) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: weather,
});

export const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});

export const fetchWeather = (city) => {
  return (dispatch) => {
    dispatch(fetchWeatherStart());
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a4d36cd4aa170037a202388da489d625&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(fetchWeatherSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchWeatherFailure(error));
      });
  };
};export const FETCH_FORECAST_START = 'FETCH_FORECAST_START';
export const FETCH_FORECAST_SUCCESS = 'FETCH_FORECAST_SUCCESS';
export const FETCH_FORECAST_FAILURE = 'FETCH_FORECAST_FAILURE';

export const fetchForecastStart = () => ({
  type: FETCH_FORECAST_START,
});

export const fetchForecastSuccess = (forecast) => ({
  type: FETCH_FORECAST_SUCCESS,
  payload: forecast,
});

export const fetchForecastFailure = (error) => ({
  type: FETCH_FORECAST_FAILURE,
  payload: error,
});

export const fetchForecast = (city) => {
  return (dispatch) => {
    dispatch(fetchForecastStart());
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a4d36cd4aa170037a202388da489d625&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(fetchForecastSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchForecastFailure(error));
      });
  };
};
