import chai from 'chai';
const expect = chai.expect;
import { testData } from "./data/test-data.js";
import { Trip } from "../src/Trip.js";

describe("Trip", function() {

  let trip

  beforeEach(() => {
    trip = new Trip(testData[1].trips[0]);
  });

  it("Should be an instance of Trip", () => {
    expect(trip).to.be.an.instanceOf(Trip);
  });

  it("Should have an id", () => {
    expect(trip.id).to.equal(1);
  });

  it("Should have a userID", () => {
    expect(trip.userID).to.equal(1);
  });

  it("Should have a destinationID", () => {
    expect(trip.destinationID).to.equal(1);
  });

  it("Should have an amount of travelers", () => {
    expect(trip.travelers).to.equal(1);
  });

  it("Should have a departure date", () => {
    expect(trip.date).to.equal("2019/09/16");
  });

  it("Should have a duration", () => {
    expect(trip.duration).to.equal(8);
  });

  it("Should have a status", () => {
    expect(trip.status).to.equal("pending");
  });

  it("Should have a list of suggested activities", () => {
    expect(trip.suggestedActivities).to.deep.equal([]);
  });

  it("Should be able to determine a trip's date range", () => {
    const dates = trip.determineDateRange()
    expect(dates).to.deep.equal({startDate: "Mon Sep 16 2019", endDate: "Tue Sep 24 2019"});
  });
});
