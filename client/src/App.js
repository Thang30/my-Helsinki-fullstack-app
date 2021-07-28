import "./App.css";
import React, { useEffect, useState, Fragment } from "react";
import getDataFromServerServices from "./services/getDataFromServer";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
import MuiTableCell from "@material-ui/core/TableCell";

import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Map, Marker, Overlay } from "pigeon-maps";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { spacing } from "@material-ui/system";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

import { render } from "ejs";
// import randomLogo from "../public/logo192.png";

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

  const handlePageSize = (pageSizeQuery) => {
    if (pageSizeQuery > 50) {
      // console.log("page size should not exceed 50");
      alert("The page size should not exceed 50, please try again!");
    } else {
      setQueryParameters({
        ...queryParameters,
        pageSize: pageSizeQuery,
      });
    }
  };

  const TableCell = withStyles({
    root: {
      border: "2px solid #10B7F3",
    },
  })(MuiTableCell);

  const openNowColor = (openNow) => {
    const openNowBoolean = JSON.parse(openNow);
    console.log("The boolean value is: ", openNowBoolean);
    return openNowBoolean ? "#24D048" : "#E9452B";
  };

  // const [hue, setHue] = useState(0);
  // const color = `hsl(${hue % 360}deg 39% 70%)`;

  // const [displayOverlay, setDisplayOverlay] = useState(false);
  // const showWhenVisible = { display: displayOverlay ? "" : "none" };
  // const handleMarkerClicking = (place) => {
  //   setDisplayOverlay(!displayOverlay);
  //   return (
  //     <div style={showWhenVisible}>
  //       <Overlay
  //         anchor={[place.location.lat, place.location.lon]}
  //         offset={[100, 100]}
  //       >
  //         <img src="./img/logo192.png" width={240} height={158} alt="" />
  //       </Overlay>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <Fragment>
      <h1 style={{ textAlign: "center", color: "#227AD4" }}>
        Our Helsinki Places App
      </h1>
      <h3 style={{ textAlign: "center", color: "#E9452B" }}>
        Notice: Refresh this page (pressing F5) to get all places again!
      </h3>

      <p style={{ textAlign: "center" }}>
        <TextField
          className="inputTagList"
          id="input-tag-list"
          type="text"
          variant="outlined"
          size="small"
          value={tagListQuery}
          onChange={(event) => setTagListQuery(event.target.value)}
        />
        <span>&nbsp;</span>
        <Button
          id="button-tag-list"
          type="button"
          variant="contained"
          color="primary"
          onClick={() =>
            setQueryParameters({
              ...queryParameters,
              tagList: tagListQuery,
            })
          }
        >
          Submit tags seperated by commas
        </Button>
        <p></p>
        <InputLabel>
          Any means places with at least 1 submitted tag. All means places with
          ALL of the submitted tags
        </InputLabel>
        <p></p>
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
        <span>&nbsp;</span>
        <Button
          id="button-any-all"
          type="button"
          variant="contained"
          color="primary"
          onClick={() =>
            setQueryParameters({
              ...queryParameters,
              tagFilterOrNot: tagFilterOrNotQuery,
            })
          }
        >
          Any or All
        </Button>
      </p>

      <h3 style={{ textAlign: "center", color: "#E9452B" }}>
        Notice: The maximum page size is 50!
      </h3>

      <p style={{ textAlign: "center" }}>
        <TextField
          className="inputPageSize"
          id="input-page-size"
          type="text"
          variant="outlined"
          size="small"
          value={pageSizeQuery}
          onChange={(event) => setPageSizeQuery(event.target.value)}
        />
        <span>&nbsp;</span>
        <Button
          type="button"
          id="button-page-size"
          variant="contained"
          color="primary"
          onClick={() => {
            handlePageSize(pageSizeQuery);
          }}
        >
          Submit page size
        </Button>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <Button
          id="button-requested-page"
          type="button"
          variant="contained"
          color="primary"
          onClick={() =>
            setQueryParameters({
              ...queryParameters,
              requestedPage: requestedPageQuery,
            })
          }
        >
          Go to page
        </Button>
        <span>&nbsp;</span>
        <TextField
          id="input-requested-page"
          className="inputRequestedPage"
          type="text"
          variant="outlined"
          size="small"
          value={requestedPageQuery}
          onChange={(event) => setRequestedPageQuery(event.target.value)}
        />
      </p>

      <p style={{ textAlign: "center", fontSize: "20px", color: "#24D048" }}>
        Places found: {numOfPlaces}. Displaying {pageSize} places per page.
        Total number of pages is: {numOfPages}. Currently on page:{" "}
        {requestedPage}.
      </p>

      <h2 style={{ textAlign: "center", color: "#227AD4" }}>Our Map</h2>
      <Container>
        <Map
          mx={20}
          height={300}
          defaultCenter={[60.17114299375396, 24.956196766060668]}
          defaultZoom={11}
        >
          {places.map((place) => (
            <Overlay anchor={[place.location.lat, place.location.lon]}>
              <Marker
                width={30}
                anchor={[place.location.lat, place.location.lon]}
                // color={color}
                offset={[0, 1000]}
              />
              <p>{place.name.en}</p>
            </Overlay>
          ))}
        </Map>
      </Container>

      <h2 style={{ textAlign: "center", color: "#227AD4" }}>
        The Places in Tabular Format
      </h2>

      <Container>
        <TableContainer component={Paper}>
          <Table
            id="table-places"
            className={classes.table}
            aria-label="my-table"
            style={{ border: "3px solid #227AD4" }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={3}
                  style={{ color: "#D3DB1D", fontSize: "20px" }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={3}
                  style={{ color: "#D3DB1D", fontSize: "20px" }}
                >
                  Address
                </TableCell>
                <TableCell
                  align="center"
                  rowSpan={2}
                  style={{ color: "#D3DB1D", fontSize: "20px" }}
                >
                  Open Now
                </TableCell>
              </TableRow>
              <TableCell
                align="center"
                style={{ color: "#C49B25", fontSize: "16px" }}
              >
                English
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "#C49B25", fontSize: "16px" }}
              >
                Finnish
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "#C49B25", fontSize: "16px" }}
              >
                Swedish
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "#C49B25", fontSize: "16px" }}
              >
                Street Address
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "#C49B25", fontSize: "16px" }}
              >
                Postal Code
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "#C49B25", fontSize: "16px" }}
              >
                Locality
              </TableCell>
            </TableHead>
            <TableBody>
              {places.map((place) => (
                <TableRow key={place.id}>
                  <TableCell align="right">{place.name.en}</TableCell>
                  <TableCell align="right">{place.name.fi}</TableCell>
                  <TableCell align="right">{place.name.sv}</TableCell>
                  <TableCell align="right">
                    {place.location.address.street_address}
                  </TableCell>
                  <TableCell align="right">
                    {place.location.address.postal_code}
                  </TableCell>
                  <TableCell align="right">
                    {place.location.address.locality}
                  </TableCell>
                  <TableCell
                    align="center"
                    // style={{
                    //   color: JSON.parse(place.open_now) ? "#24D048" : "#E9452B",
                    // }}
                  >
                    {place.open_now}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Fragment>
  );
};
export default App;
