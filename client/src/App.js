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

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";

const App = () => {
  const [places, setPlaces] = useState([]);
  // const dispatch = useDispatch();
  const [pageSizeQuery, setPageSizeQuery] = useState();
  const [requestedPageQuery, setRequestedPageQuery] = useState();
  const [tagListQuery, setTagListQuery] = useState();
  const [tagFilterOrNotQuery, setTagFilterOrNotQuery] = useState();
  const [queryParameters, setQueryParameters] = useState(
    getDataFromServerServices.initialQueryParameters
  );

  const [pageSize, setPageSize] = useState(10);
  const [numOfPlaces, setNumOfPlaces] = useState();
  const [numOfPages, setNumOfPages] = useState();
  const [requestedPage, setRequestedPage] = useState();

  useEffect(() => {
    const fetchDataAgain = async () => {
      const fetchResult = await getDataFromServerServices.getFilteredPlaces(
        queryParameters
      );

      console.log("The meta data:", fetchResult.meta);
      setPlaces(fetchResult.data);
      setPageSize(fetchResult.meta.pageSize);
      setNumOfPlaces(fetchResult.meta.numOfPlaces);
      setNumOfPages(fetchResult.meta.numOfPages);
      setRequestedPage(fetchResult.meta.requestedPage);
    };

    fetchDataAgain();
  }, [queryParameters]);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  return (
    <Fragment>
      <p style={{ textAlign: "center" }}>
        Refresh this page (pressing F5) to get all places again.
      </p>

      <p style={{ textAlign: "center" }}>
        <input
          className="inputTagList"
          id="input-tag-list"
          type="text"
          value={tagListQuery}
          onChange={(event) => setTagListQuery(event.target.value)}
        />
        <button
          id="button-tag-list"
          type="button"
          onClick={() =>
            setQueryParameters({
              ...queryParameters,
              tagList: tagListQuery,
            })
          }
        >
          Submit tags seperated by commas
        </button>
        <InputLabel>
          Any means places with at least 1 submitted tag. All means places with
          ALL of the submitted tags
        </InputLabel>
        <Select
          id="select-any-all"
          value={tagFilterOrNotQuery}
          onChange={(event) => {
            setTagFilterOrNotQuery(event.target.value);
          }}
        >
          <MenuItem value={"false"}>Any</MenuItem>
          <MenuItem value={"true"}>All</MenuItem>
        </Select>
        <button
          id="button-any-all"
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
      </p>

      <p style={{ textAlign: "center" }}>
        <input
          className="inputPageSize"
          id="input-page-size"
          type="text"
          value={pageSizeQuery}
          onChange={(event) => setPageSizeQuery(event.target.value)}
        />

        <button
          type="button"
          id="button-page-size"
          onClick={() =>
            setQueryParameters({ ...queryParameters, pageSize: pageSizeQuery })
          }
        >
          Submit page size
        </button>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <button
          id="button-requested-page"
          type="button"
          onClick={() =>
            setQueryParameters({
              ...queryParameters,
              requestedPage: requestedPageQuery,
            })
          }
        >
          Go to page
        </button>
        <input
          id="input-requested-page"
          className="inputRequestedPage"
          type="text"
          value={requestedPageQuery}
          onChange={(event) => setRequestedPageQuery(event.target.value)}
        />
      </p>

      <p style={{ textAlign: "center" }}>
        Places found: {numOfPlaces}. Displaying {pageSize} places per page.
        Total number of pages is: {numOfPages}. Currently on page:{" "}
        {requestedPage}.{" "}
      </p>

      <TableContainer component={Paper}>
        <Table
          id="table-places"
          className={classes.table}
          aria-label="my-table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Name
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Address
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Open Now
              </TableCell>
            </TableRow>
            <TableCell align="center">English</TableCell>
            <TableCell align="center">Finnish</TableCell>
            <TableCell align="center">Swedish</TableCell>
            <TableCell align="center">Street Address</TableCell>
            <TableCell align="center">Postal Code</TableCell>
            <TableCell align="center">Locality</TableCell>
          </TableHead>
          <TableBody>
            {places.map((place) => (
              <TableRow key={place.id}>
                <TableCell alight="right">{place.name.en}</TableCell>
                <TableCell alight="right">{place.name.fi}</TableCell>
                <TableCell alight="right">{place.name.sv}</TableCell>
                <TableCell alight="right">
                  {place.location.address.street_address}
                </TableCell>
                <TableCell alight="right">
                  {place.location.address.postal_code}
                </TableCell>
                <TableCell alight="right">
                  {place.location.address.locality}
                </TableCell>
                <TableCell alight="center">{place.open_now}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};
export default App;
