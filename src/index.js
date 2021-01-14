// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

import { User } from './User.js'

import * as apiCalls from './util.js'

const singleUser = apiCalls.getSingleUser(5)
const allTrips = apiCalls.getAllTrips()
const allDestinations = apiCalls.getAllDestinations()

Promise.all([singleUser, allTrips, allDestinations])
  .then(orderedData => {
    console.log("orderedData", orderedData)
    createNewUser(orderedData[0])
  })
  // .catch(error => {
  //   window.alert("Oh no! Our servers are down right now! If you try back later they'll probably be up.")
  //   console.log(error)
  // })


const createNewUser = userData => {
  const newUser = new User(userData);
  console.log("userrrr", newUser)
}
