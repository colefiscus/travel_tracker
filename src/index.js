import "./css/base.scss";

import { User } from "./User.js";

import * as apiCalls from "./util.js";

import * as domUpdates from "./DOMupdate.js";

const singleUser = apiCalls.getSingleUser(5);
const allTrips = apiCalls.getAllTrips();
const allDestinations = apiCalls.getAllDestinations();

let user;

Promise.all([singleUser, allTrips, allDestinations])
  .then(orderedData => {
    console.log(orderedData);
    createNewUser(orderedData[0]);
    domUpdates.changeUserName(orderedData[0]);
  })
  .catch(error => {
    window.alert("Oh no! Our servers are down right now! If you try back later they'll probably be up.");
    console.log(error);
  });

const loadInitialScreen = user => {

}

const createNewUser = userData => {
  user = new User(userData);
  console.log("userrrr", user);
}

const createMatchingTrips = (user, tripData) => {

}

const createDestination = (trips, desinationData) => {

}
