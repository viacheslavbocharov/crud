const users = JSON.parse(localStorage.getItem('users')) || defaultUsers;

document.addEventListener('DOMContentLoaded', () => {
  showUsers(users);
});

document.querySelector('.add_btn').addEventListener('click', () => {
  createNewUser (users);
});

 