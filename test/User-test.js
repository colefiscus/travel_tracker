import chai from 'chai';
const expect = chai.expect;
import { testData } from "./data/test-data.js";
import { User } from "../src/User.js";
import { Destination } from "../src/Destination.js";
import { Trip } from "../src/Trip.js";

describe("User", function() {

  let user;
  let destinations = [];
  let trips = [];

  testData[2].destinations.forEach(destination => {
    const destinationInstance = new Destination(destination);
    destinations.push(destinationInstance);
  });
  testData[1].trips.forEach(trip => {
    const tripInstance = new Trip(trip);
    trips.push(tripInstance);
  })

  beforeEach(() => {
    user = new User(testData[0].travelers[0]);

  });

  it("Should be an instance of User", () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it("Should have an ID", () => {
    expect(user.id).to.equal(1);
  });

  it("Should have a name", () => {
    expect(user.name).to.equal("Cole Fiscus");
  });

  it("Should have a traveler type", () => {
    expect(user.travelerType).to.equal("relaxer");
  });

  it("Should be able to calculate the total cost for all of their trips", () => {
    const totalPrice = user.calculateTotalCost(destinations, trips)
    expect(totalPrice).to.equal(23540)
  });

  it("Should be able to tell a user their rank based on their point total", () => {
    const totalPrice = user.calculateTotalCost(destinations, trips);
    const rank = user.determineRank(totalPrice);
    expect(rank).to.deep.equal({rank: "Pioneer", pointsToNextRank: 6460})
  });
})
