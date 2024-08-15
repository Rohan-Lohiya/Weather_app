import { useState } from "react";
import "./App.css";
import Todayweather from "./components/Todayweather";
import WeatherMap from "./components/WeatherMap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-4/5 flex  justify-center gap-[10px]">
          <div className="w-[70%] flex flex-col justify-center items-center"><Todayweather/></div>
          <div className="w-[30%] bg-gray-400"><WeatherMap/></div>
        </div>
      </div>
    </>
  );
}

export default App;
