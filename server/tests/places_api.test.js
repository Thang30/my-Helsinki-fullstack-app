const nockBack = require("nock").back;
const nock = require("nock");
const supertest = require("supertest");
const path = require("path");
// const placeDisplayController = require("./controllers/placeDisplayController");
const app = require("../app");
const backEndApi = supertest(app);

nockBack.fixtures = path.join(__dirname, "__nock-fixtures__");
nockBack.setMode("record");

describe("get the  data of all 2399 places, including the metadata", () => {
  test("should set up the mock api and save the mock api response for getting all places, also requires that: exactly all 2399 places are returned", async () => {
    const { nockDone } = await nockBack("getAllPlacesData.json");

    nock.enableNetConnect(/127\.0\.0\.1/);

    // const scope = nock("http://localhost:4000/")
    //   .get("/api/places")
    //   .times(4)
    //   .reply(200, "persist please");

    const response = await backEndApi.get("/api/places");
    expect(response.body.meta.numOfPlaces).toMatch("2399");
    // expect(response.body.meta.numOfPages).toEqual(
    //   Math.ceil(response.body.meta.numOfPlaces / response.body.meta.pageSize)
    // );

    nockDone();
  });

  test("the places are returned in json", async () => {
    const { nockDone } = await nockBack("getAllPlacesData.json");

    nock.enableNetConnect(/127\.0\.0\.1/);

    await backEndApi
      .get("/api/places")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    nockDone();
  });

  test("should verify that the number of pages is caculated correctly", async () => {
    const { nockDone } = await nockBack("getAllPlacesData.json");

    nock.enableNetConnect(/127\.0\.0\.1/);
    const response = await backEndApi.get("/api/places");
    expect(response.body.meta.numOfPages).toEqual(
      Math.ceil(response.body.meta.numOfPlaces / response.body.meta.pageSize)
    );

    nockDone();
  });
});

describe("get the  data of from a complex query string, including the metadata", () => {
  test("should set up the mock api and save the mock api response for getting the filtered places, check if the returned data in json", async () => {
    const { nockDone } = await nockBack("getFilteredPlacesData.json");

    nock.enableNetConnect(/127\.0\.0\.1/);

    await backEndApi
      .get(
        "/api/places/?tagList=Vietnamese,Asian&tagFilterOrNot=true&pageSize=3&requestedPage=2"
      )
      .expect(200)
      .expect("Content-Type", /application\/json/);

    nockDone();
  });

  test("should verify that the number of pages is caculated correctly", async () => {
    const { nockDone } = await nockBack("getFilteredPlacesData.json");

    nock.enableNetConnect(/127\.0\.0\.1/);

    const response = await backEndApi.get(
      "/api/places/?tagList=Vietnamese,Asian&tagFilterOrNot=true&pageSize=3&requestedPage=2"
    );

    expect(response.body.meta.numOfPages).toEqual(
      Math.ceil(response.body.meta.numOfPlaces / response.body.meta.pageSize)
    );

    nockDone();
  });

  test("should verify that the number of pages is caculated correctly", async () => {
    const { nockDone } = await nockBack("getFilteredPlacesData.json");

    nock.enableNetConnect(/127\.0\.0\.1/);

    const response = await backEndApi.get(
      "/api/places/?tagList=Vietnamese,Asian&tagFilterOrNot=true&pageSize=3&requestedPage=2"
    );

    expect(response.body.meta.numOfPages).toEqual(
      Math.ceil(response.body.meta.numOfPlaces / response.body.meta.pageSize)
    );

    nockDone();
  });

  test("should verify that the places have BOTH of the queried tags", async () => {
    const { nockDone } = await nockBack("getFilteredPlacesData.json");

    nock.enableNetConnect(/127\.0\.0\.1/);

    const response = await backEndApi.get(
      "/api/places/?tagList=Vietnamese,Asian&tagFilterOrNot=true&pageSize=3&requestedPage=2"
    );

    const places = response.body.data;
    places.forEach((place) => {
      const tagsList = place.tags.map((tag) => tag.name);
      console.log(tagsList);
      expect(tagsList).toContain("Vietnamese");
      expect(tagsList).toContain("Asian");
    });

    nockDone();
  });
});
