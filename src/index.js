import "./css/base.scss";

import { User } from "./User.js";
import { Trip } from "./Trip.js";
import { Destination } from "./Destination.js"

import * as apiCalls from "./util.js";

import * as domUpdates from "./DOMupdate.js";

const singleUser = apiCalls.getSingleUser(21);
const allTrips = apiCalls.getAllTrips();
const allDestinations = apiCalls.getAllDestinations();

let user;
const trips = [];
const destinations = [];

Promise.all([singleUser, allTrips, allDestinations])
  .then(orderedData => {
    // console.log(orderedData);
    createNewUser(orderedData[0]);
    domUpdates.changeUserName(orderedData[0]);
    createMatchingTrips(user, orderedData[1].trips, orderedData[2].destinations)
    domUpdates.addUserTrips(trips, destinations);
    domUpdates.changeUserSummary(user, destinations, trips);
    // console.log(user)
    // console.log(trips)
    // console.log(destinations)
  })
  // .catch(error => {
  //   window.alert("Oh no! Our servers are down right now! If you try back later they'll probably be up.");
  //   console.log(error);
  // });

const loadInitialScreen = user => {

}

const createNewUser = userData => {
  user = new User(userData);
}

const createMatchingTrips = (user, tripData, destinationData) => {
  const tripsByUser = tripData.filter(trip => trip.userID === user.id);
  const destinationsByUserTrips = tripsByUser.map(trip => {
     return destinationData.find(destination => destination.id === trip.destinationID)
  })
  tripsByUser.forEach(trip => createNewTrip(trip))
  destinationsByUserTrips.forEach(destination => createDestination(destination))
}

const createNewTrip = filteredTrip => {
  const trip = new Trip(filteredTrip)
  trips.push(trip)
}

const createDestination = filteredDestination => {
  const destination = new Destination(filteredDestination)
  destinations.push(destination)
}
