import React, { useState, useEffect } from "react";

const Todayweather = () => {
  const [todaydata, settodaydata] = useState(null);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [cityname, setCityname] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const handleStorageChange = () => {
      const selectedCityName = localStorage.getItem("selectedCityName");
      const selectedCityLat = localStorage.getItem("selectedCityLat");
      const selectedCityLon = localStorage.getItem("selectedCityLon");
  
      if (selectedCityName && selectedCityLat && selectedCityLon) {
        setCityname(selectedCityName);
        setLat(selectedCityLat);
        setLon(selectedCityLon);
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    handleStorageChange();
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (lat && lon) {
      todayinfo();
    }
  }, [lat, lon]);

  const todayinfo = async () => {
    const searchurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(searchurl);
      const data = await response.json();
      console.log("API Response:", data);

      if (data && data.main) {
        settodaydata(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-[90%] flex flex-col gap-[10px]">
      {todaydata && (
        <div className="w-full rounded-xl bg-red-500">
          <div className="flex justify-between bg-zinc-600 p-[10px] rounded-tl-xl rounded-tr-xl">
            <span>{cityname}</span>
            <span>{new Date(todaydata.dt * 1000).toLocaleTimeString()}</span>
          </div>
          <div className="flex p-[10px]">
            <div className="w-[80%]">
              <div className="text-8xl">
                {Math.round(todaydata.main.temp)}°C
              </div>
              <div className="text-xl">
                Feels Like {Math.round(todaydata.main.feels_like)}°C
              </div>
              <div className="flex gap-[10px]">
                <span>Max {Math.round(todaydata.main.temp_max)}°C</span>
                <span>Min {Math.round(todaydata.main.temp_min)}°C</span>
              </div>
            </div>
            <div className="w-[20%] flex items-center justify-center">
              <img
                className="w-[80%]"
                src={`https://openweathermap.org/img/wn/${todaydata.weather[0].icon}@2x.png`}
                alt={todaydata.weather[0].description}
              />
            </div>
          </div>
        </div>
      )}
      {todaydata && (
        <div className="w-full rounded-xl bg-red-500 flex justify-between p-[10px]">
          <div className="flex flex-col justify-around h-full">
            <div className="flex items-center justify-center gap-[10px]">
              <span>
                <img className="h-[20px]" src="/pressure.png" alt="Pressure" />
              </span>
              <span>Pressure</span>
              <span>{todaydata.main.pressure} hPa</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <span>
                <img className="h-[20px]" src="/wind.png" alt="Wind" />
              </span>
              <span>Wind</span>
              <span>{todaydata.wind.speed} km/h</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <span>
                <img
                  className="h-[20px]"
                  src="/visibility.png"
                  alt="Visibility"
                />
              </span>
              <span>Visibility</span>
              <span>{todaydata.visibility / 1000} km</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <span>
                <img className="h-[20px]" src="/drop.png" alt="Humidity" />
              </span>
              <span>Humidity</span>
              <span>{todaydata.main.humidity}%</span>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img className="h-[100px]" src="/sun.png" alt="Sun" />
            </div>
            <div className="flex gap-[20px] justify-center items-center">
              <span className="flex flex-col justify-center items-center">
                <div>
                  <img className="h-[20px]" src="/sunrise.png" alt="Sunrise" />
                </div>
                <div>
                  {new Date(todaydata.sys.sunrise * 1000).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </div>
              </span>
              <span className="flex flex-col justify-center items-center">
                <div>
                  <img className="h-[20px]" src="/sunset.png" alt="Sunset" />
                </div>
                <div>
                  {new Date(todaydata.sys.sunset * 1000).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todayweather;
