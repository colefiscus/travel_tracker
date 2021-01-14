export function getSingleUser(id) {
  const specificUser = fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => response.json());
    return specificUser;
}

export function getAllTrips() {
  const trips = fetch("http://localhost:3001/api/v1/trips")
    .then(response => response.json());
    return trips;
}

export function getAllDestinations() {
  const destinations = fetch("http://localhost:3001/api/v1/destinations")
    .then(response => response.json());
    return destinations;
}
