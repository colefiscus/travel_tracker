import chai from 'chai';
const expect = chai.expect;
import { testData } from "./data/test-data.js";
import { Destination } from "../src/Destination.js";
import { Trip } from "../src/Trip.js";

describe("Destination", function() {

  let destination

  beforeEach(() => {
    destination = new Destination(testData[2].destinations[0]);
  });

  it("Should be an instance of Destination", () => {
    expect(destination).to.be.an.instanceOf(Destination);
  });

  it("Should have an id", () => {
    expect(destination.id).to.equal(1);
  });

  it("Should have an destination", () => {
    expect(destination.destination).to.equal("Lima, Peru");
  });

  it("Should have an price for lodging each day", () => {
    expect(destination.estLodgingCostPerDay).to.equal(50);
  });

  it("Should have an price for flights per person", () => {
    expect(destination.estFlightCostPerPers).to.equal(100)});

  it("Should have an image link to display", () => {
    expect(destination.image).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80")});

  it("Should have an an alternate description for the image", () => {
    expect(destination.alt).to.equal("overview of city buildings with a clear sky")});

  it("Should be able to calculate the cost of a trip given trip details", () => {
    const trip = new Trip(testData[1].trips[0]);
    const tripPrice = destination.calculateTripCost(trip);
    expect(tripPrice).to.equal(550)
  });
})
