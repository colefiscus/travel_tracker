export class Destination {
  constructor(destination) {
    this.id = destination.id;
    this.destination = destination.destination;
    this.estLodgingCostPerDay = destination.estimatedLodgingCostPerDay;
    this.estFlightCostPerPers = destination.estimatedFlightCostPerPerson;
    this.image = destination.image;
    this.alt = destination.alt;
  }

  calculateTripCost(info) {
    const lodgingPrice = this.estLodgingCostPerDay * info.duration;
    const flightPrice = this.estFlightCostPerPers * info.travelers;
    const initialTotal = lodgingPrice + flightPrice;
    const finalPrice = initialTotal + (initialTotal * 0.1)
    return finalPrice
  }
}
