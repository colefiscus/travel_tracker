export class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
  }

  calculateTotalCost(destinations, trips) {
    let totalPoints = 0;
    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (trip.destinationID === destination.id) {
          totalPoints += destination.calculateTripCost(trip)
        }
      })
    })
    return totalPoints
  }
}
