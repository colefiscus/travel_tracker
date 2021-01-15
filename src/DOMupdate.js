const userName = document.querySelector(".user-account");
const userTrips = document.querySelector(".user-trips")

export const changeUserName = user => {
  userName.innerText = user.name;
}

export const changeUserSummary = user => {
  
}

export const addUserTrips = (trips, destinations) => {
  for (var i = 0; i < trips.length; i++) {
    userTrips.innerHTML += `
    <article class="trip" id="${trips[i].id}">
      <img src="${destinations[i].image}" alt="${destinations[i].alt}">
      <h2>${destinations[i].destination}</h2>
      <p>Start Date: ${trips[i].date}</p>
      <p>Days: ${trips[i].duration}</p>
      <p># of Travelers: ${trips[i].travelers}</p>
      <p>Total Cost: $?</p>
      <p>Status: ${trips[i].status}</p>
    </article>
    `
  }
}
