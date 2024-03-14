document.addEventListener('DOMContentLoaded', () => {
  showUsers(users);
});

document.querySelector('.add_btn').addEventListener('click', () => {
  document.querySelector('#form').classList.remove('hidden');
});

document.querySelector('#wrapper').addEventListener('click', (event) => {
  hideUserData(event);
  saveUserData(event);
  showUsers(users);
})