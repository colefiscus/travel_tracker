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

  determineRank(points) {
    let rank;
    switch (true) {
      case points < 10000:
        rank = "Explorer";
        break;
      case points >= 10000 && points < 24999:
        rank = "Pioneer";
        break;
      case points >= 25000 && points < 39999:
        rank = "Adventurer";
        break;
      case points >= 40000 && points < 54999:
        rank = "Pathfinder";
        break;
      case points >= 55000:
        rank = "Trailblazer";
        break;
      default:
        rank = "Invalid Data";
        return;
    }
    return rank;
  }
}
