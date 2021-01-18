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
        if (trip.destinationID === destination.id && trip.status === "approved") {
          totalPoints += destination.calculateTripCost(trip)
        }
      })
    })
    return totalPoints;
  }

  determineRank(points) {
    let rank, pointsToNextRank;
    switch (true) {
      case points < 10000:
        rank = "Explorer";
        pointsToNextRank = 10000 - points;
        break;
      case points >= 10000 && points < 24999:
        rank = "Pioneer";
        pointsToNextRank = 25000 - points;
        break;
      case points >= 25000 && points < 39999:
        rank = "Adventurer";
        pointsToNextRank = 40000 - points;
        break;
      case points >= 40000 && points < 54999:
        rank = "Pathfinder";
        pointsToNextRank = 55000 - points;
        break;
      case points >= 55000:
        rank = "Trailblazer";
        pointsToNextRank = 100000 - points;
        break;
      default:
        rank = "Invalid Data";
        return;
    }
    return {rank: rank, pointsToNextRank: pointsToNextRank};
  }
}
