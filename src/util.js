export const getSingleUser = id => {
  const specificUser = fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => response.json());
    return specificUser;
}

export const getAllTrips = () => {
  const trips = fetch("http://localhost:3001/api/v1/trips")
    .then(response => response.json());
    return trips;
}

export const getAllDestinations = () => {
  const destinations = fetch("http://localhost:3001/api/v1/destinations")
    .then(response => response.json());
    return destinations;
}

export const addNewTrip = options => {
  const options = {
    id: new Date(),
    userID: user.id,
    destinationID: ,
    travelers: ,
    date: ,
    duration: ,
    status: "Pending",
    suggestedActivities: []
  }
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  })
  .then(response => response.json())
  .then(data => console.log(data))
}

// {
//   id: <number>,
//   userID: <number>,
//   destinationID: <number>,
//   travelers: <number>,
//   date: <string 'YYYY/MM/DD'>,
//   duration: <number>,
//   status: <string 'approved' or 'pending'>,
//   suggestedActivities: <array of strings>
// }
