// document.querySelector('.save_btn').addEventListener('click', () => {
//   // TBD: Validation
  
//   document.querySelector('#form').classList.add('hidden');
// })

document.querySelector('#wrapper').addEventListener('click', (event) => {
  hideUserData(event);
  saveUserData(event);
 })