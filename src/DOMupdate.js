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
const submitButton = document.querySelector(".find-trips-button");

export const changeUserName = user => {
  userName.innerText = user.name;
}

export const changeUserSummary = (user, destinations, trips) => {
  const points = user.calculateTotalCost(destinations, trips)
  const rank = user.determineRank(points)
  userSummary.innerHTML = `
  <p>Your point total: ${points}</p>
  <p>Your Rank: ${rank.rank}</p>
  `;
  if (rank.pointsToNextRank > 0) {
    userSummary.insertAdjacentHTML("beforeend", `<p>Next Rank: ${rank.pointsToNextRank} points</p>`)
  } else {
    userSummary.insertAdjacentHTML("beforeend", `<p>You have reached the maximum rank! You are a true Wanderer.</p>`)
  }
}

export const changeDisplay = (destinations, trips) => {
  resetTripInputs();
  if (tripSelection.classList.contains("hidden")) {
    newTripButton.toggleAttribute("disabled");
    myTripsButton.setAttribute("disabled", true)
    tripSelection.classList.toggle("hidden");
    tripSelection.classList.toggle("trip-filter-section")
    tripInputs.classList.toggle("hidden");
    tripInputs.classList.toggle("trip-inputs")
    displayUserTrips(destinations, trips);
  } else {
    myTripsButton.setAttribute("disabled", true)
    tripInputs.classList.add("hidden");
    tripInputs.classList.remove("trip-inputs");
    displayUserTrips(destinations, trips);
  }
}

export const displayUserTrips = (destinations, trips) => {
    userTrips.innerHTML = ""
    if (trips.length) {
      trips.forEach(trip => {
        destinations.forEach(destination => {
          addTripCardsToPage(trip, destination)
        });
      });
    } else {
      userTrips.innerHTML = `<p class="trip-type">Uh-oh, no trips of yours fit that criteria</p>`;
    }
  }

const addTripCardsToPage = (trip, destination) => {
  if (trip.destinationID === destination.id) {
    const dates = trip.determineDateRange();
    const price = destination.calculateTripCost(trip)
    userTrips.innerHTML += `
    <article class="trip trip-border" id="${trip.id}">
      <img src="${destination.image}" alt="${destination.alt}">
      <h2>${destination.destination}</h2>
      <p>Dates: ${dates.startDate} - ${dates.endDate}</p>
      <p>Number of Wanderers: ${trip.travelers}</p>
      <p class="trip-price">Points Earned: ${price}</p>
      <p>Status: ${trip.status}</p>
    </article>
    `
  }
}


export const showUserTripInputs = () => {
  userTrips.innerHTML = "";
  myTripsButton.toggleAttribute("disabled");
  newTripButton.toggleAttribute("disabled");
  dateInput.valueAsDate = new Date();
  dateInput.setAttribute("min", new Date().toISOString().slice(0, 10));
  tripSelection.classList.toggle("hidden");
  tripSelection.classList.toggle("trip-filter-section");
  tripInputs.classList.toggle("hidden");
  tripInputs.classList.toggle("trip-inputs")
}

export const setTripInputs = () => {
    dateInput.setAttribute("readonly", true);
    durationInput.setAttribute("readonly", true);
    travelersInput.setAttribute("readonly", true);
    submitButton.innerText = `RESET`;
}

export const resetTripInputs = () => {
  userTrips.innerHTML = "";
  dateInput.removeAttribute("readonly");
  durationInput.removeAttribute("readonly");
  travelersInput.removeAttribute("readonly");
  submitButton.innerText = `Find Trips`;
  dateInput.valueAsDate = new Date();
  travelersInput.value = "1";
  durationInput.value = "1";
}

export const showDestinationOpts = destinations => {
  destinations.forEach(destination => {
    const initialPrice = (destination.estLodgingCostPerDay * durationInput.value * travelersInput.value) + (destination.estFlightCostPerPers * travelersInput.value);
    const priceWithFee = initialPrice + (initialPrice * 0.1);
    userTrips.innerHTML += `
    <article class="destination trip-border" id="${destination.id}">
      <img src="${destination.image}" alt="${destination.alt}">
      <h2>${destination.destination}</h2>
      <p>Departure: ${dateInput.value}</p>
      <p>Days: ${durationInput.value}</p>
      <p>Number of Wanderers: ${travelersInput.value}</p>
      <p class="trip-price">Total Cost: $${priceWithFee.toFixed()}</p>
      <button class="book-trip-button" type="button">BOOK</button>
    </article>
    `
  });
}
