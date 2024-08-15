import React, { useState, useEffect } from "react";

const SearchCity = () => {
  const [cityResults, setCityResults] = useState([]);
  const [query, setQuery] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;
  const [cityname, setCityname] = useState("");

  useEffect(() => {
    const fetchAndStore = async () => {
      try {
        const city = localStorage.getItem("selectedCityName");

        if (!city) {
          setCityname("Delhi");
          await fetchCityData("Delhi");

          const cityname = cityResults.find((citi) => citi.name === "Delhi");
          if (cityname) {
            const { lat, lon } = cityname;

            localStorage.setItem("selectedCityName", "Delhi");
            localStorage.setItem("selectedCityLat", lat);
            localStorage.setItem("selectedCityLon", lon);
          }
        } else {
          setCityname(city);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAndStore();
  }, [cityResults]);

  const fetchCityData = async (query) => {
    const searchurl = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

    try {
      const response = await fetch(searchurl);
      const data = await response.json();
      console.log("API Response:", data);

      if (Array.isArray(data)) {
        setCityResults(data);
      } else {
        console.error("Unexpected data format:", data);
        setCityResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setCityResults([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      fetchCityData(value);
    } else {
      setCityResults([]);
    }
  };

  const handleCityClick = (city) => {
    setQuery(city);
    setCityResults([]);
    setCityname(city);

    const cityname = cityResults.find((citi) => citi.name === city);
    if (cityname) {
      const { lat, lon } = cityname;

      localStorage.setItem("selectedCityName", city);
      localStorage.setItem("selectedCityLat", lat);
      localStorage.setItem("selectedCityLon", lon);
      
      window.dispatchEvent(new Event("storage"));
    } else {
      console.error("City not found in fetch results");
    }
  };

  return (
    <div className="w-full flex items-center p-[10px] gap-[10px] relative ">
      <div className="w-1/4">{cityname}</div>
      <div>
        <input
          placeholder="Search City..."
          className="input shadow-lg px-5 py-2 rounded-xl w-56 transition-all focus:w-64 outline-none"
          name="search"
          type="search"
          onChange={handleChange}
          value={query}
        />
        {cityResults.length > 0 && (
          <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-lg w-56 max-h-48 overflow-y-auto">
            {cityResults.map((city, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleCityClick(city.name)}
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchCity;
