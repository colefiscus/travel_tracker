export const testData = [
  {"travelers": [
  {id: 1, name: "Cole Fiscus", travelerType: "relaxer"}
  ]},

  {"trips": [
    {id: 1, userID: 1, destinationID: 1, travelers: 1, date: "2019/09/16", duration: 8, status: "pending", suggestedActivities: []},
    {id: 2, userID: 1, destinationID: 2, travelers: 5, date: "2020/10/04", duration: 18, status: "approved", suggestedActivities: []},
    {id: 3, userID: 1, destinationID: 3, travelers: 4, date: "2020/05/22", duration: 17, status: "approved", suggestedActivities: []}
    ]},

  {"destinations": [
    {id: 1, destination: "Lima, Peru", estimatedLodgingCostPerDay: 50, estimatedFlightCostPerPerson: 100, image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80", alt: "overview of city buildings with a clear sky"},
    {id: 2, destination: "Stockholm, Sweden", estimatedLodgingCostPerDay: 100, estimatedFlightCostPerPerson: 200, image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", alt: "city with boats on the water during the day time"},
    {id: 3, destination: "Sydney, Austrailia", estimatedLodgingCostPerDay: 150, estimatedFlightCostPerPerson: 300, image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", alt: "opera house and city buildings on the water with boats"}
]}]
