//@ts-nocheck 
 /* eslint-disable */
import React, {useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather, fetchForecast } from '../redux/weather/weatherActions';
import './CityList.css'

const cities = ['Paris', 'London', 'Berlin', 'Rome', 'Madrid']; 
const CityList = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather);
  const forecastData = useSelector((state) => state.forecast);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cityForecast, setCityForecast] = useState([]);


  useEffect(() => {
    cities.forEach((city) => dispatch(fetchWeather(city)));
  }, [dispatch]); 

  useEffect(() => {
    if (forecastData && forecastData.list) {
      setCityForecast(forecastData.list.slice(0, 4));
    }
  }, [forecastData]);

  const handleCityClick = async (city) => {
    await dispatch(fetchForecast(city));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="columns is-multiline">
      {
      weatherData.loading ? (
        <h2>Loading...</h2>
        
      ) : weatherData ? (
        weatherData.map((cityWeather, idx) => (
            
            <div key={idx} className="column is-one-quarter">
            <div 
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCityClick(cityWeather.name)}
            >
                
              <div className="card-content"> 
              <img src={'https://openweathermap.org/img/wn/'+cityWeather.weather[0].icon+'.png'} alt=""/>             
                <h1 className="title"> {Math.ceil(cityWeather.main.temp)}°C</h1>
                <p className="subtitle">{cityWeather.name}</p>
                <p className="subtitle">Wind Speed: {cityWeather.wind.speed}m/s</p>
              </div>
            </div>
          </div>
        ))
      ) : <div>hhhh </div>}
   <div className={`modal ${isModalOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-content">
          <div className="columns is-multiline">
          {cityForecast && cityForecast.map((forecast, idx) =>{
              const date = new Date(forecast.dt_txt);
              return (
                <div key={idx} className="column is-one-quarter">
                  <div className="card modal-card"> 
                    <div className="has-text-centered modal-card-content"> 
                      <p className="title modal-title">{date.toLocaleDateString()} {date.toLocaleTimeString()}</p> 
                      <p className="modal-subtitle">Temperature: {forecast.main.temp}K</p> 
                      <p className="modal-subtitle">Wind Speed: {forecast.wind.speed}m/s</p> 
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
      </div>
    </div>
  );
};

export default CityList;
