import "./App.css";
import React, { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import Places from "./components/Places";
import Place from "./components/SinglePlace";
import {
  initializePlaces,
  getQueryFilteredPlaces,
} from "./reducers/placeReducer";
import getDataFromServerServices from "./services/getDataFromServer";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const App = () => {
  const [places, setPlaces] = useState([]);
  const dispatch = useDispatch();
  const [pageSizeQuery, setPageSizeQuery] = useState();
  const [requestedPageQuery, setRequestedPageQuery] = useState();
  const [languageFilterQuery, setLanguageFilterQuery] = useState();
  const [tagListQuery, setTagListQuery] = useState();
  const [tagFilterOrNotQuery, setTagFilterOrNotQuery] = useState();
  const [queryParameters, setQueryParameters] = useState(
    getDataFromServerServices.initialQueryParameters
  );

  // useEffect(() => {
  //   const initializeAllPlaces = async () => {
  //     const allPlaces = await getDataFromServerServices.getAllPlaces();

  //     console.log("the data is:", allPlaces.data);
  //     setPlaces(allPlaces.data);
  //   };

  //   initializeAllPlaces();
  // }, []);

  useEffect(() => {
    const fetchDataAgain = async () => {
      const fetchResult = await getDataFromServerServices.getFilteredPlaces(
        queryParameters
      );

      console.log("Places count:", fetchResult.meta.numOfPlaces);
      setPlaces(fetchResult.data);
    };

    fetchDataAgain();
  }, [queryParameters]);

  // return <div>{<Places />}</div>;
  // return null;
  return (
    <Fragment>
      <ul>
        {places.map((place) => (
          <li>
            <Place key={place.id} place={place} />
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={pageSizeQuery}
        onChange={(event) => setPageSizeQuery(event.target.value)}
      />

      <button
        type="button"
        onClick={() =>
          setQueryParameters({ ...queryParameters, pageSize: pageSizeQuery })
        }
      >
        Submit page size
      </button>

      <input
        type="text"
        value={requestedPageQuery}
        onChange={(event) => setRequestedPageQuery(event.target.value)}
      />

      <button
        type="button"
        onClick={() =>
          setQueryParameters({
            ...queryParameters,
            requestedPage: requestedPageQuery,
          })
        }
      >
        Submit current page
      </button>

      <input
        type="text"
        value={languageFilterQuery}
        onChange={(event) => setLanguageFilterQuery(event.target.value)}
      />

      <button
        type="button"
        onClick={() =>
          setQueryParameters({
            ...queryParameters,
            languageFilter: languageFilterQuery,
          })
        }
      >
        Submit language
      </button>

      <input
        type="text"
        value={tagListQuery}
        onChange={(event) => setTagListQuery(event.target.value)}
      />

      <button
        type="button"
        onClick={() =>
          setQueryParameters({
            ...queryParameters,
            tagList: tagListQuery,
          })
        }
      >
        Submit tags
      </button>
      <InputLabel>Any or all tags</InputLabel>
      <Select
        // labelId="demo-simple-select-label"
        // id="demo-simple-select"
        value={tagFilterOrNotQuery}
        onChange={(event) => {
          setTagFilterOrNotQuery(event.target.value);
        }}
      >
        <MenuItem value={"false"}>Any</MenuItem>
        <MenuItem value={"true"}>All</MenuItem>
      </Select>

      <button
        type="button"
        onClick={() =>
          setQueryParameters({
            ...queryParameters,
            tagFilterOrNot: tagFilterOrNotQuery,
          })
        }
      >
        Any or All
      </button>
    </Fragment>
  );
};
export default App;
