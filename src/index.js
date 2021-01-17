import "./css/base.scss";

import { User } from "./User.js";
import { Trip } from "./Trip.js";
import { Destination } from "./Destination.js"

import * as apiCalls from "./util.js";
import * as domUpdates from "./DOMupdate.js";

const singleUser = apiCalls.getSingleUser(9);
const allTrips = apiCalls.getAllTrips();
const allDestinations = apiCalls.getAllDestinations();

const pendingTrips = document.querySelectorAll(".trip-filter");

pendingTrips.forEach(button => addEventListener("click", filterTrips))

let user;
const trips = [];
const destinations = [];

Promise.all([singleUser, allTrips, allDestinations])
  .then(orderedData => {
    createNewUser(orderedData[0]);
    createMatchingTrips(user, orderedData[1].trips, orderedData[2].destinations)
    loadInitialScreen(orderedData[0], user, destinations, trips)
    // console.log(orderedData[0])
    // console.log(orderedData[1])
    // console.log(orderedData[2])
  })
  .catch(error => {
    window.alert("Oh no! Our servers are down right now! If you try back later they'll probably be up.");
    console.log(error);
  })

function filterTrips(event) {
  if (event.target.classList.contains("pending-trips")) {
    const pendingTrips = trips.filter(trip => trip.status === "pending");
    const matchedDestinations = matchDestinationsToTrips(destinations, pendingTrips)
    domUpdates.addUserTrips(matchedDestinations, pendingTrips);
  } else if (event.target.classList.contains("all-trips")) {
    domUpdates.addUserTrips(destinations, trips);
  } else if (event.target.classList.contains("past-trips")) {
    const pastTrips = trips.filter(trip => {
      const tripDate = new Date(trip.date)
      const today = new Date
      return today > tripDate
    })
    const matchedDestinations = matchDestinationsToTrips(destinations, pastTrips)
    domUpdates.addUserTrips(matchedDestinations, pastTrips)
  } else if (event.target.classList.contains("future-trips")) {
    const futureTrips = trips.filter(trip => {
      const tripDate = new Date(trip.date)
      const today = new Date
      return today < tripDate
    })
    const matchedDestinations = matchDestinationsToTrips(destinations, futureTrips)
    domUpdates.addUserTrips(matchedDestinations, futureTrips)
  }
}

const matchDestinationsToTrips = (destinations, trips) => {
  return destinations.filter(destination => {
    return trips.find(trip => trip.destinationID == destination.id)
  })
}

const loadInitialScreen = (data, user, destinations, trips) => {
  domUpdates.changeUserName(data);
  domUpdates.addUserTrips(destinations, trips);
  domUpdates.changeUserSummary(user, destinations, trips)
}

const createNewUser = userData => {
  user = new User(userData);
}

const createNewTrip = filteredTrip => {
  const trip = new Trip(filteredTrip)
  trips.push(trip)
}

const createDestination = filteredDestination => {
  const destination = new Destination(filteredDestination)
  destinations.push(destination)
}

const createMatchingTrips = (user, tripData, destinationData) => {
  const tripsByUser = tripData.filter(trip => trip.userID === user.id);
  const destinationsByUserTrips = tripsByUser.map(trip => {
     return destinationData.find(destination => destination.id === trip.destinationID)
  })
  tripsByUser.forEach(trip => createNewTrip(trip))
  destinationsByUserTrips.forEach(destination => createDestination(destination))
}

// COME BACK TO IF TIME??? -------------------------------
// const sortTripsByDate = (trips, destinations) => {
//   const sortedTrips =  trips.sort((a, b) => {
//     return (new Date(b.date)) - (new Date(a.date))
//   })
// }
