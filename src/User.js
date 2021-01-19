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
    case points >= 10000 && points < 29999:
      rank = "Pioneer";
      pointsToNextRank = 30000 - points;
      break;
    case points >= 30000 && points < 49999:
      rank = "Adventurer";
      pointsToNextRank = 50000 - points;
      break;
    case points >= 50000 && points < 74999:
      rank = "Pathfinder";
      pointsToNextRank = 75000 - points;
      break;
    case points >= 75000 && points < 99999:
      rank = "Trailblazer";
      pointsToNextRank = 100000 - points;
      break;
    case points >= 100000:
      rank = "WANDRER";
      pointsToNextRank = 0
      break;
    default:
      rank = "Invalid Data";
      pointsToNextRank = "Invalid Data"
      return;
  }
    return {rank: rank, pointsToNextRank: pointsToNextRank};
  }
}
