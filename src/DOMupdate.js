const userName = document.querySelector(".user-account");
const userTrips = document.querySelector(".user-trips");
const userSummary = document.querySelector(".user-summary")

// NEED FOR CALCULATING FUTURE TRIP COST???
// const travelersInput = document.querySelector(".");
// const durationInput = document.querySelector(".");

export const changeUserName = user => {
  userName.innerText = user.name;
}

export const changeUserSummary = (user, destinations, trips) => {
  const points = user.calculateTotalCost(destinations, trips)
  const rank = user.determineRank(points)
  userSummary.innerHTML = `
  <p>Nice job! You've earned ${points} points this year!</p>
  <p>Your Rank: ${rank.rank}</p>
  <p>Next Rank: ${rank.pointsToNextRank} points</p>
  `
}

export const addUserTrips = (destinations, trips) => {
  for (var i = 0; i < trips.length; i++) {
    const dates = trips[i].determineDateRange();
    const price = destinations[i].calculateTripCost(trips[i])
    userTrips.innerHTML += `
    <article class="trip" id="${trips[i].id}">
      <img src="${destinations[i].image}" alt="${destinations[i].alt}">
      <h2>${destinations[i].destination}</h2>
      <p>Dates: ${dates.startDate} - ${dates.endDate}</p>
      <p># of Travelers: ${trips[i].travelers}</p>
      <p class="trip-price">Total Cost: $${price}</p>
      <p>Status: ${trips[i].status}</p>
    </article>
    `
  }
}
