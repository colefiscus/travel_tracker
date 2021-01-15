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
