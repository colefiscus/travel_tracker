const userName = document.querySelector(".user-account");
const userTrips = document.querySelector(".user-trips");
const userSummary = document.querySelector(".user-summary");
const myTripsButton = document.querySelector(".my-trips-button");
const newTripButton = document.querySelector(".new-trip-button");
const tripSelection = document.querySelector(".trip-filter-section");
const tripInputs = document.querySelector(".trip-inputs");
const dateInput = document.querySelector(".start-date-input");
const travelersInput = document.querySelector(".travelers-input");
const durationInput = document.querySelector(".trip-duration");

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
  if (tripSelection.classList.contains("hidden")) {
    newTripButton.toggleAttribute("disabled")
    tripSelection.classList.toggle("hidden");
    tripSelection.classList.toggle("trip-filter-section")
  }
  myTripsButton.setAttribute("disabled", true)
  myTripsButton.classList.toggle("selected-button")
  tripInputs.classList.add("hidden");
  tripInputs.classList.remove("trip-inputs");
  userTrips.innerHTML = ""
  if (trips.length) {
    for (var i = 0; i < trips.length; i++) {
      const dates = trips[i].determineDateRange();
      const price = destinations[i].calculateTripCost(trips[i])
      userTrips.innerHTML += `
      <article class="trip trip-border" id="${trips[i].id}">
        <img src="${destinations[i].image}" alt="${destinations[i].alt}">
        <h2>${destinations[i].destination}</h2>
        <p>Dates: ${dates.startDate} - ${dates.endDate}</p>
        <p># of Travelers: ${trips[i].travelers}</p>
        <p class="trip-price">Total Cost: $${price}</p>
        <p>Status: ${trips[i].status}</p>
      </article>
      `
    }
  } else {
    userTrips.innerHTML = `<p class="trip-type">Uh-oh, no trips of yours fit that criteria</p>`
  }
}

export const showUserTripInputs = () => {
  myTripsButton.toggleAttribute("disabled");
  newTripButton.toggleAttribute("disabled");
  tripSelection.classList.toggle("hidden");
  tripSelection.classList.toggle("trip-filter-section");
  tripInputs.classList.toggle("hidden");
  tripInputs.classList.toggle("trip-inputs")
  userTrips.innerHTML = "";
}

export const displayNewTrips = (destinations, trips) => {
  if (dateInput.value) {
    console.log(dateInput.value);
  }
}
