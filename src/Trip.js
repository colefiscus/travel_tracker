export class Trip {
  constructor(trip) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities;
  }

  determineDateRange() {
    let endDate = new Date(this.date);
    endDate.setDate(endDate.getDate() + this.duration);
    let finalEndDate = endDate.toLocaleDateString()
    console.log({startDate: this.date, endDate: finalEndDate})
    // return {startDate: startDate, endDate: endDate};
  }
}
