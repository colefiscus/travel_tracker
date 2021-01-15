const userName = document.querySelector(".user-account");
const userTrips = document.querySelector(".user-trips");
const userSummary = document.querySelector(".user-summary")

// NEED FOR CALCULATING FUTURE TRIP COST???
// const travelersInput = document.querySelector(".");
// const durationInput = document.querySelector(".");

export const changeUserName = user => {
  userName.innerText = user.name;
}

export const changeUserSummary = (destinations, trips) => {
  userSummary.innerHTML = `
  <p>Nice job! This year you've earned ${calculateTotalCost(destinations, trips)} points!</p>
  <p>Your Rank: Explorer</p>
  <p>Next Rank: 454 points</p>
  `
}

const calculateTotalCost = (destinations, trips) => {
  let totalPoints = 0;
  destinations.forEach(destination => {
    trips.forEach(trip => {
      if (trip.destinationID === destination.id) {
        totalPoints += destination.calculateTripCost(trip)
      }
    })
  })
  console.log(totalPoints)
  return totalPoints
}

export const addUserTrips = (trips, destinations) => {
  for (var i = 0; i < trips.length; i++) {
    const price = destinations[i].calculateTripCost(trips[i])
    userTrips.innerHTML += `
    <article class="trip" id="${trips[i].id}">
      <img src="${destinations[i].image}" alt="${destinations[i].alt}">
      <h2>${destinations[i].destination}</h2>
      <p>Start Date: ${trips[i].date}</p>
      <p>Days: ${trips[i].duration}</p>
      <p># of Travelers: ${trips[i].travelers}</p>
      <p class="trip-price">Total Cost: $${price}</p>
      <p>Status: ${trips[i].status}</p>
    </article>
    `
  }
}
