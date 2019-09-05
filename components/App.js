import React, { useState } from 'react';
import EnturService from "@entur/sdk";
import getLocation from '../lib/Location';

const service = new EnturService({ clientName: "sprouty-naar" });

function App() {
  const distance = 500;
  const timeRange = 60 * 30;
  const departures = 10;

  const [stops, setStops] = useState([]);

  const showStops = async () => {
    const location = await getLocation();
    const stopPlaces = await service.getStopPlacesByPosition(location.coords, distance);
    console.log(stopPlaces);
    
    const stopIds = stopPlaces.map(stop => stop.id);

    const options = {
      timeRange: timeRange,
      departures: departures
    };
    const stopPlaceDepartures = await service.getStopPlaceDepartures(stopIds, options);
    console.log(stopPlaceDepartures);

    setStops(stopPlaces);
  };

  return (
    <div>
      <button onClick={showStops}>Show Stops</button>
      <ul>
        {stops.map(stop => (
          <li key={stop.id}>{stop.name} ({stop.id})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;