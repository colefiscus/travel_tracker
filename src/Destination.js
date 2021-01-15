export class Destination {
  constructor(destination) {
    this.id = destination.id;
    this.destination = destination.destination;
    this.estLodgingCostPerDay = destination.estLodgingCostPerDay;
    this.estFlightCostPerPers = destination.estFlightCostPerPers;
    this.image = destination.image;
    this.alt = destination.alt;
  }

  calculateTotalTripCost(input) {
    const lodgingPrice = this.estLodgingCostPerDay * input.duration;
    const flightPrice = this.estFlightCostPerPers * input.travelers;
    const initialTotal = lodgingPrice + flightPrice;
    const finalPrice = intitialTotal + (initialTotal * 0.1)
    return finalPrice
  }
}
