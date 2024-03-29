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
    const startDate = new Date(this.date);
    const formattedStartDate = startDate.toDateString();
    const endDate = new Date(this.date);
    endDate.setDate(endDate.getDate() + this.duration);
    const formattedEndDate = endDate.toDateString()
    return {startDate: formattedStartDate, endDate: formattedEndDate};
  }
}
