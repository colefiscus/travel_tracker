const userName = document.querySelector(".user-account");

export const changeUserName = (user) => {
  console.log(user)
  userName.innerText = user.name;
}

export const changeUserSummary = (user) => {

}
