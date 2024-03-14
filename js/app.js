document.addEventListener('DOMContentLoaded', () => {
  showUsers(users);
});

document.querySelector('.add_btn').addEventListener('click', () => {
  document.querySelector('#form').classList.remove('hidden');
});

