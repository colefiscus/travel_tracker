import "./css/base.scss";

import { User } from "./User.js";
import { Trip } from "./Trip.js";
import { Destination } from "./Destination.js"

import * as apiCalls from "./util.js";
import * as domUpdates from "./DOMupdate.js";



const dateInput = document.querySelector(".start-date-input");
const travelersInput = document.querySelector(".travelers-input");
const durationInput = document.querySelector(".trip-duration");

const filterTripButtons = document.querySelectorAll(".trip-filter");
const myTripsButton = document.querySelector(".my-trips-button");
const bookTripButton = document.querySelector(".new-trip-button");
const tripInputs = document.querySelector(".trip-inputs")
const newDestinations = document.querySelector(".user-trips")
filterTripButtons.forEach(button => addEventListener("click", filterTrips));
myTripsButton.addEventListener("click", () => {
  domUpdates.addUserTrips(destinations, trips)
});
bookTripButton.addEventListener("click", domUpdates.showUserTripInputs);
tripInputs.addEventListener("click", displayNewTrips);
newDestinations.addEventListener("click", bookNewTrip);

let user;
const trips = [];
const destinations = [];
const allDestinationsOpts = [];

window.onload = displayInitialPage;

function displayInitialPage() {
  const singleUser = apiCalls.getSingleUser(48);
  const allTrips = apiCalls.getAllTrips();
  const allDestinations = apiCalls.getAllDestinations();
  Promise.all([singleUser, allTrips, allDestinations])
    .then(orderedData => {
      createNewUser(orderedData[0]);
      createDestinationOptArray(orderedData[2]);
      createMatchingTrips(user, orderedData[1].trips, orderedData[2].destinations)
      loadInitialScreen(user, destinations, trips)
      // console.log(orderedData[0])
      // console.log(orderedData[1])
      // console.log(orderedData[2])
    })
    .catch(error => {
      window.alert("Oh no! Our servers are down right now! If you try back later they'll probably be up.");
      console.log(error);
    })
  }

const matchDestinationsToTrips = (destinations, trips) => {
  return destinations.filter(destination => {
    return trips.find(trip => trip.destinationID == destination.id)
  })
}

const loadInitialScreen = (user, destinations, trips) => {
  domUpdates.changeUserName(user);
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

const createUserDestination = filteredDestination => {
  const destination = new Destination(filteredDestination)
  destinations.push(destination)
}

const createDestinationOptArray = allDestinations => {
  allDestinations.destinations.forEach(destination => {
    const destinationOpt = new Destination(destination);
    allDestinationsOpts.push(destinationOpt);
  })
}

const createMatchingTrips = (user, tripData, destinationData) => {
  const tripsByUser = tripData.filter(trip => trip.userID === user.id);
  const destinationsByUserTrips = tripsByUser.map(trip => {
     return destinationData.find(destination => destination.id === trip.destinationID)
  })
  tripsByUser.forEach(trip => createNewTrip(trip))
  destinationsByUserTrips.forEach(destination => createUserDestination(destination))
}

function filterTrips() {
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
      today.setDate(today.getDate() - trip.duration)
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
  else if (event.target.classList.contains("present-trips")) {
    const presentTrips = trips.filter(trip => {
      const tripDate = new Date(trip.date)
      const today = new Date()
      const endDate = new Date(trip.date)
      endDate.setDate(endDate.getDate() + trip.duration)
      return (today > tripDate && today < endDate)
    })
    const matchedDestinations = matchDestinationsToTrips(destinations, presentTrips)
    domUpdates.addUserTrips(matchedDestinations, presentTrips)
  }
}

function displayNewTrips() {
  if (event.target.classList.contains("submit-button") && event.target.innerText === "Find Trips") {
    domUpdates.setTripInputs()
    domUpdates.showDestinationOpts(allDestinationsOpts)
  } else if (event.target.classList.contains("submit-button") && event.target.innerText === "RESET") {
    domUpdates.resetTripInputs()
  }
}

function bookNewTrip() {
  const onSuccess = () => {

    displayInitialPage()
  }
  const eventTarget = event.target
  if (eventTarget.classList.contains("book-trip-button")) {
    const date = dateInput.value.split('-').join("/")
    const options = {
      id: new Date().getTime(),
      userID: user.id,
      destinationID: parseInt(eventTarget.parentElement.id),
      travelers: parseInt(travelersInput.value),
      date: date,
      duration: parseInt(durationInput.value),
      status: "pending",
      suggestedActivities: []
    }
    apiCalls.addNewTrip(options, onSuccess)
  }
}

// COME BACK TO IF TIME??? -------------------------------
// const sortTripsByDate = (trips, destinations) => {
//   const sortedTrips =  trips.sort((a, b) => {
//     return (new Date(b.date)) - (new Date(a.date))
//   })
// }
