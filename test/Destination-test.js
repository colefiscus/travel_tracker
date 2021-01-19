import chai from 'chai';
const expect = chai.expect;
import { testData } from "../src/data/test-data.js";
import { Destination } from "../src/Destination.js";
import { Trip } from "../src/Trip.js";

describe("Destination", function() {

  let destination, trip

  beforeEach(() => {
    destination = new Destination(testData[2].destinations[0]);
    trip = new Trip(testData[1].trips[0]);
  });

  it("Should be an instance of Destination", () => {
    expect(destination).to.be.an.instanceOf(Destination);
  });

  it("Should have an id", () => {
    expect(destination.id).to.equal(1);
  })
})
