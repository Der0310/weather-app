
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import axios, { Axios } from 'axios';
import WeatherCard from './components/WeatherCard';

function App() {

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, settemp] = useState();
  const [isLoading, setIsLoading] = useState(true);


  const success = (pos) => {
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    }
    setCoords(obj);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);


  useEffect(() => {
    if (coords) {
      const apiKey = 'c5917c7a526f33477fcf55471479c709';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;
      axios.get(url)
        .then(res => {
          const cel = (res.data.main.temp - 273.15).toFixed(2);
          const fah = (cel * 9 / 5 + 32).toFixed(2);
          settemp({ cel, fah });
          setWeather(res.data)
        })
        .catch(err => console.log(err))
        .finally(()=> {
          setIsLoading(false);
        });
    }
  }, [coords]);



  return (
    <div className='App'>
      {
        isLoading ?
        <h2>Loading...</h2>
        :
        <WeatherCard
          weather={weather}
          temp={temp}
        />
      } 
    </div>
  )
}

export default App
