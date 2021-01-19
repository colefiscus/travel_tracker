export const testData = [
  {"travelers": [
  {id: 1, name: "Cole Fiscus", travelerType: "relaxer"},
  {id: 2, name: "Brianna Callahan", travelerType: "relaxer"},
  {id: 3, name: "Olivia Schneider", travelerType: "discoverer"}]},

  {"trips": [
    {id: 1, userID: 1, destinationID: 4, travelers: 1, date: "2019/09/16", duration: 8, status: "pending", suggestedActivities: []},
    {id: 2, userID: 2, destinationID: 3, travelers: 5, date: "2020/10/04", duration: 18, status: "pending", suggestedActivities: []},
    {id: 3, userID: 3, destinationID: 4, travelers: 4, date: "2020/05/22", duration: 17, status: "approved", suggestedActivities: []},
    {id: 4, userID: 3, destinationID: 2, travelers: 2, date: "2020/02/25", duration: 10, status: "approved", suggestedActivities: []},
    {id: 5, userID: 2, destinationID: 4, travelers: 3, date: "2020/04/30", duration: 18, status: "approved", suggestedActivities: []},
    {id: 6, userID: 2, destinationID: 2, travelers: 3, date: "2020/06/29", duration: 9, status: "approved", suggestedActivities: []},
    {id: 7, userID: 1, destinationID: 3, travelers: 5, date: "2020/05/28", duration: 20, status: "approved", suggestedActivities: []},
    {id: 8, userID: 3, destinationID: 1, travelers: 6, date: "2021/02/07", duration: 4, status: "approved", suggestedActivities: []},
    {id: 9, userID: 2, destinationID: 2, travelers: 5, date: "2019/12/19", duration: 19, status: "approved", suggestedActivities: []},
    {id: 10, userID: 1, destinationID: 3, travelers: 6, date: "2020/07/23", duration: 17, status: "approved", suggestedActivities: []}]},

  {"destinations": [
    {id: 1, destination: "Lima, Peru", estimatedLodgingCostPerDay: 50, estimatedFlightCostPerPerson: 100, image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80", alt: "overview of city buildings with a clear sky"},
    {id: 2, destination: "Stockholm, Sweden", estimatedLodgingCostPerDay: 100, estimatedFlightCostPerPerson: 200, image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", alt: "city with boats on the water during the day time"},
    {id: 3, destination: "Sydney, Austrailia", estimatedLodgingCostPerDay: 150, estimatedFlightCostPerPerson: 300, image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", alt: "opera house and city buildings on the water with boats"},
    {id: 4, destination: "Cartagena, Colombia", estimatedLodgingCostPerDay: 200, estimatedFlightCostPerPerson: 400, image: "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80", alt: "boats at a dock during the day time"}
]}]
