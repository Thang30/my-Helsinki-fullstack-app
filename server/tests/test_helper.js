// const nockBack = require("nock").back;
// const path = require("path");
// const placeDisplayController = require("./controllers/placeDisplayController");
// const app = require("./app");

// nockBack.fixtures = path.join(__dirname, "__nock-fixtures__");
// nockBack.setMode("record");

// test("should get the data of all 2399 places, including the metadata", async () => {
//   const { nockDone } = await nockBack("getAllPlacesData.json");

//   const data = await app.use("/api/places", placeDisplayController);

//   expect(data.data.length).toEqual(2399);

//   nockDone();
// });
