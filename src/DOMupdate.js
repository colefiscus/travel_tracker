const loginPage = document.querySelector(".login-page");
const mainPage = document.querySelector(".main-page");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const loginButton = document.querySelector(".login-button");
const userNameLogin = document.querySelector(".username-login");
const passwordLogin = document.querySelector(".password-login");
const userName = document.querySelector(".user-account");
const userTrips = document.querySelector(".user-trips");
const filterTripButtons = document.querySelectorAll(".trip-filter");
const destinationCardSection = document.querySelector(".destination-section")
const userSummary = document.querySelector(".user-summary");
const myTripsButton = document.querySelector(".my-trips-button");
const newTripButton = document.querySelector(".new-trip-button");
const tripSelection = document.querySelector(".trip-filter-section");
const tripInputs = document.querySelector(".trip-inputs");
const dateInput = document.querySelector(".start-date-input");
const travelersInput = document.querySelector(".travelers-input");
const durationInput = document.querySelector(".trip-duration");
const submitButton = document.querySelector(".find-trips-button");

export const changeScreensAfterLogin = () => {
  userNameLogin.value = "";
  passwordLogin.value = "";
  loginPage.classList.toggle("hidden");
  mainPage.classList.toggle("hidden");
  header.classList.toggle("hidden");
  footer.classList.toggle("hidden");
}

export const changeLoginButtonBack = () => {
  loginButton.innerText = "SUBMIT";
  loginButton.removeAttribute("disabled")
}

export const alertUserOfLoginError = () => {
  userNameLogin.value = "";
  passwordLogin.value = "";
  loginButton.innerText = "TRY AGAIN";
  loginButton.setAttribute("disabled", true)
}

export const changeUserName = user => {
  userName.innerText = user.name;
}

export const changeUserSummary = (user, destinations, trips) => {
  let points = user.calculateTotalCost(destinations, trips);
  const rank = user.determineRank(points);
  points = points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  userSummary.innerHTML = `
    <div class="user-info">
      <p class="user-rank-and-points">${points}</p>
      <hr>
      <p><b>Your Point Total</b></p>
    </div>
    <div class="user-info">
      <p class="user-rank-and-points">${rank.rank}</p>
      <hr>
      <p><b>Your Rank</b></p>
    </div>
  `;
  addPointsToNextRank(rank);
}

const addPointsToNextRank = rank => {
  if (rank.pointsToNextRank > 0) {
    const pointsToNextRank = rank.pointsToNextRank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    userSummary.insertAdjacentHTML("beforeend", `
    <div class="user-info">
      <p class="user-rank-and-points">${pointsToNextRank}</p>
      <hr>
      <p><b>Points to Next Rank</b></p>
    </div
    `);
  } else {
    userSummary.insertAdjacentHTML("beforeend", `
    <div class="user-info">
      <p class="user-rank-and-points">Max Rank</p>
      <hr>
      <p><b>Points to Next Rank</b></p>
    </div`);
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
  destinationCardSection.innerHTML = "";
  userTrips.innerHTML = "";
  if (trips.length) {
    trips.forEach(trip => {
      destinations.forEach(destination => {
        addTripCardsToPage(trip, destination);
      });
    });
  } else {
    userTrips.innerHTML = `<p class="trip-border trip no-matching-trips">Uh-oh, no trips of yours fit that criteria</p>`;
  }
}

const addTripCardsToPage = (trip, destination) => {
  if (trip.destinationID === destination.id) {
    const dates = trip.determineDateRange();
    const price = destination.calculateTripCost(trip).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    userTrips.innerHTML += `
    <article class="trip trip-border" id="${trip.id}">
      <img src="${destination.image}" alt="${destination.alt}">
      <div class="trip-card-info">
        <h2 class="destination-label">${destination.destination}</h2>
        <div class="trip-card-details">
          <p><b>Dates:</b> ${dates.startDate} - ${dates.endDate}</p>
          <p><b>Number of Wanderers:</b> ${trip.travelers}</p>
          <p class="trip-price"><b>Points Earned:</b> ${price}</p>
          <p><b>Status:</b> ${trip.status}</p>
        </div>
      </div>
    </article>
    `
  }
}

export const selectFilter = () => {
  filterTripButtons.forEach(button => button.removeAttribute("disabled"))
  event.target.setAttribute("disabled", true);
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
  destinationCardSection.innerHTML = "";
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
    const priceWithFee = (initialPrice + (initialPrice * 0.1)).toFixed();
    const formattedPrice = priceWithFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    createDestinationCards(destination, formattedPrice);
  });
}

const createDestinationCards = (destination, price) => {
  destinationCardSection.innerHTML += `
  <article class="destination" id="${destination.id}">
    <img class="destination-images" src="${destination.image}" alt="${destination.alt}">
    <div class="destination-details">
      <div>
        <h2>${destination.destination}</h2>
        <p>Departure: ${dateInput.value}</p>
        <p>Days: ${durationInput.value}</p>
        <p>Number of Wanderers: ${travelersInput.value}</p>
        <p class="trip-price">Total Cost: $${price}</p>
      </div>
      <button class="book-trip-button" type="button">BOOK IT</button>
    </div>
  </article>
  `
};
