import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './WeatherApp.css';

import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import search_icon from "../Assets/search.png";
import wind_icon from "../Assets/wind.png";

export const WeatherApp = () => {
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);
  const api_key = "ed18ce5a059ac5efff520442da84f47d";

  const getWeatherIcon = (condition) => {
    if (condition.includes("cloud")) {
      return cloud_icon;
    } else if (condition.includes("clear")) {
      return clear_icon;
    } else if (condition.includes("rain")) {
      return rain_icon;
    } else {
      return cloud_icon;
    }
  }

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      if (response.ok) {
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + '%';
        wind[0].innerHTML = data.wind.speed + ' km/h';
        temperature[0].innerHTML = data.main.temp + '°c';
        location[0].innerHTML = data.name;

        const condition = data.weather[0].description.toLowerCase();
        setWeatherIcon(getWeatherIcon(condition));
      } else {
        toast.error("City not found. Please enter a valid city name.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("An error occurred while fetching the weather data. Please try again later.");
    }
  }

  return (
    <div className='main'>
      <div className='container'>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div className='top-bar'>
          <input type="text" name="cityInput" className="cityInput" placeholder='Search here.....' id="" />
          <div className='search-icon' onClick={search}>
            <img src={search_icon} alt="search" />
          </div>
        </div>
        <div className='weather-image'>
          <img src={weatherIcon} alt="weather icon" />
        </div>
        <div className='weather-temp'>24°c</div>
        <div className='weather-location'>Sri Lanka</div>
        <div className='data-container'>
          <div className='element'>
            <img src={humidity_icon} alt="humidity" className='icon' />
            <div className='data'>
              <div className='humidity-percent'>64%</div>
              <div className='text'>Humidity</div>
            </div>
          </div>
          <div className='element'>
            <img src={wind_icon} alt="wind" className='icon' />
            <div className='data'>
              <div className='wind-rate'>18 km/h</div>
              <div className='text'>Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
