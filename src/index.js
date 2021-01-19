import "./css/base.scss";
import "./images/plane.png"
import "./images/postcard.png"

import { User } from "./User.js";
import { Trip } from "./Trip.js";
import { Destination } from "./Destination.js";

import * as apiCalls from "./util.js";
import * as domUpdates from "./DOMupdate.js";

const loginPage = document.querySelector(".login-page");
const mainPage = document.querySelector(".main-page");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const userNameLogin = document.querySelector(".username-login");
const passwordLogin = document.querySelector(".password-login");
const loginButton = document.querySelector(".login-button");
const logoutButton = document.querySelector(".logout-button");
const filterTripButtons = document.querySelectorAll(".trip-filter");
const myTripsButton = document.querySelector(".my-trips-button");
const bookTripButton = document.querySelector(".new-trip-button");
const findTrips = document.querySelector(".trip-inputs");
const newDestinations = document.querySelector(".destination-section");
const dateInput = document.querySelector(".start-date-input");
const travelersInput = document.querySelector(".travelers-input");
const durationInput = document.querySelector(".trip-duration");

loginButton.addEventListener("click", loginUser);
logoutButton.addEventListener("click", loginOrLogout)
filterTripButtons.forEach(button => addEventListener("click", filterTrips));
bookTripButton.addEventListener("click", domUpdates.showUserTripInputs);
findTrips.addEventListener("click", displayNewTrips);
newDestinations.addEventListener("click", bookNewTrip);
myTripsButton.addEventListener("click", () => {
  domUpdates.changeDisplay(userDestinations, trips);
});

let user;
let trips = [];
let userDestinations = [];
let allDestinationsOpts = [];

function loginUser() {
  const usernameSplit = userNameLogin.value.split("er");
  const userNumber = usernameSplit[1];
  if (userNameLogin.value.includes("traveler") && passwordLogin.value === "travel2020") {
    loginOrLogout();
    displayInitialPage(userNumber);
  }
}

function loginOrLogout() {
  trips = [];
  userDestinations = [];
  allDestinationsOpts = [];
  userNameLogin.value = "";
  passwordLogin.value = "";
  loginPage.classList.toggle("hidden");
  mainPage.classList.toggle("hidden");
  header.classList.toggle("hidden");
  footer.classList.toggle("hidden");
}

const displayInitialPage = (userNumber) => {
  const singleUser = apiCalls.getSingleUser(userNumber);
  const allTrips = apiCalls.getAllTrips();
  const allDestinations = apiCalls.getAllDestinations();
  Promise.all([singleUser, allTrips, allDestinations])
  .then(orderedData => {
    createNewUser(orderedData[0]);
    createDestinationOptArray(orderedData[2].destinations);
    createMatchingTrips(user, orderedData[1].trips, orderedData[2].destinations);
    loadInitialScreen(user, userDestinations, trips);
  })
  .catch(error => handleError(error));
}

const createNewUser = userData => {
  user = new User(userData);
}

const createDestinationOptArray = allDestinations => {
  allDestinations.forEach(destination => {
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
  destinationsByUserTrips.forEach(destination => createMatchingDestination(destination))
}

const createNewTrip = filteredTrip => {
  const matchingTrip = trips.find(trip => trip.id === filteredTrip.id);
  if (!matchingTrip) {
    const trip = new Trip(filteredTrip);
    trips.push(trip);
  }
}

const createMatchingDestination = filteredDestination => {
  const matchedDestination = userDestinations.find(destination => destination.id === filteredDestination.id)
  if (!matchedDestination) {
    const destination = new Destination(filteredDestination)
    userDestinations.push(destination)
  }
}

const loadInitialScreen = (user, destinations, trips) => {
  domUpdates.changeUserName(user);
  domUpdates.changeDisplay(destinations, trips);
  domUpdates.changeUserSummary(user, destinations, trips);
}

const handleError = error => {
  window.alert("Oh no! Our servers are down right now! If you try back later they'll probably be up.");
  console.log(error);
}

function filterTrips() {
   if (event.target.classList.contains("all-trips")) {
    domUpdates.displayUserTrips(userDestinations, trips);
  } else if (event.target.classList.contains("past-trips")) {
    filterPastTrips();
  } else if (event.target.classList.contains("future-trips")) {
    filterFutureTrips();
  } else if (event.target.classList.contains("present-trips")) {
    filterPresentTrips();
  } else if (event.target.classList.contains("pending-trips")) {
    filterPendingTrips();
  }
}

const matchDestinationsToTrips = (destinations, trips) => {
  return destinations.filter(destination => {
    return trips.find(trip => trip.destinationID == destination.id);
  });
}

const filterPastTrips = () => {
  const pastTrips = trips.filter(trip => {
    const tripDate = new Date(trip.date);
    const today = new Date();
    today.setDate(today.getDate() - trip.duration);
    return today > tripDate && trip.status !== "pending";
  })
  const matchedDestinations = matchDestinationsToTrips(userDestinations, pastTrips);
  domUpdates.displayUserTrips(matchedDestinations, pastTrips);
}

const filterPresentTrips = () => {
  const presentTrips = trips.filter(trip => {
    const tripDate = new Date(trip.date);
    const today = new Date();
    const endDate = new Date(trip.date);
    endDate.setDate(endDate.getDate() + trip.duration);
    return (today > tripDate && today < endDate && trip.status !== "pending");
  })
  const matchedDestinations = matchDestinationsToTrips(userDestinations, presentTrips);
  domUpdates.displayUserTrips(matchedDestinations, presentTrips);
}

const filterFutureTrips = () => {
  const futureTrips = trips.filter(trip => {
    const tripDate = new Date(trip.date);
    const today = new Date();
    return today < tripDate;
  })
  const matchedDestinations = matchDestinationsToTrips(userDestinations, futureTrips);
  domUpdates.displayUserTrips(matchedDestinations, futureTrips);
}

const filterPendingTrips = () => {
  const pendingTrips = trips.filter(trip => trip.status === "pending");
  const matchedDestinations = matchDestinationsToTrips(userDestinations, pendingTrips);
  domUpdates.displayUserTrips(matchedDestinations, pendingTrips);
}

function displayNewTrips() {
  if (event.target.classList.contains("find-trips-button") && event.target.innerText === "Find Trips") {
    if (travelersInput.value < 13 && durationInput.value < 31) {
      domUpdates.setTripInputs();
      domUpdates.showDestinationOpts(allDestinationsOpts);
    } else {
      window.alert("Unfortunately, we at Wander can handle a maximum of 12 people and for no longer than 30 days. Please check your selections and thank you for using Wander!")
      domUpdates.resetTripInputs();
    }
  } else if (event.target.classList.contains("find-trips-button") && event.target.innerText === "RESET") {
    domUpdates.resetTripInputs();
  }
}

function bookNewTrip() {
  const onSuccess = () => {
    displayInitialPage(user.id);
  }
  const eventTarget = event.target
  if (eventTarget.classList.contains("book-trip-button")) {
    const date = dateInput.value.split("-").join("/");
    const options = {
      id: new Date().getTime(),
      userID: user.id,
      destinationID: parseInt(eventTarget.parentElement.parentElement.id),
      travelers: parseInt(travelersInput.value),
      date: date,
      duration: parseInt(durationInput.value),
      status: "pending",
      suggestedActivities: []
    }
    apiCalls.addNewTrip(options, onSuccess);
  }
}

// COME BACK TO IF TIME??? -------------------------------
// const sortTripsByDate = (trips, userDestinations) => {
//   const sortedTrips =  trips.sort((a, b) => {
//     return (new Date(b.date)) - (new Date(a.date))
//   })
// }
