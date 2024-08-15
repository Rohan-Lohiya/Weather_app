import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = () => {
  const apiKey = import.meta.env.VITE_API_KEY; // Ensure you have the API key stored in environment variables
  const layer = 'temp';
  const x = '500'; 
  const y = '260000'; 
  const z = '8';  // Replace with desired layer, e.g., 'precipitation', 'clouds', 'pressure', etc.

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url={`https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${apiKey}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default WeatherMap;
