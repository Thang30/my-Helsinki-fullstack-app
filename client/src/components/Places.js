// this script plays no role in the current applicationCache, just something written as experimenting before

import React from "react";
import { useSelector } from "react-redux";
// import places from "../services/getDataFromServer";
import Place from "./SinglePlace";

const Places = () => {
  const allPlaces = useSelector((state) => state);
  return (
    <ul>
      {allPlaces.map((place) => (
        <Place key={place.id} place={place} />
      ))}
    </ul>
  );
};

export default Places;
