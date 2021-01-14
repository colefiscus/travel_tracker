export function getSingleUser(id) {
  fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => response.json())
    .then(data => console.log(data))
}
