function showUsers(usersList) {

  const parent = document.querySelector('#grid');
  clearElement(parent);
  parent.addEventListener('click', gridClickHandler)

  for (let user of usersList) {
    const userRow = createUserRow(user);
    parent.appendChild(userRow);
  }
}



function createUserRow(user) {
  // const userRow = document.createElement('div');
  // userRow.classList.add('user_row');
  // userRow.setAttribute('data-id', user.id);
  const userRow = createElement('div', { className: 'user_row', 'data-id': user.id }, '');

  // const userWrapper = createElement('div', { className: 'user-wrapper' }, '', userRow);

  // createElement('div', { className: 'user_id' }, user.id, userWrapper);
  // createElement('div', { className: 'user_name' }, user.name, userWrapper);

  // const divButtons = createElement('div', { className: 'user_buttons' }, '', userRow);
  // createElement('input', { type: 'button', value: 'View', 'data-action': 'view' }, '', divButtons);

  // createElement('input', { type: 'button', value: 'Edit', 'data-action': 'edit' }, '', divButtons);
  // createElement('input', { type: 'button', value: 'Delete', 'data-action': 'delete' }, '', divButtons);
  createUserRowContent(userRow, user);
  return userRow;
}


function createUserRowContent(userRow, user) {

  const userWrapper = createElement('div', { className: 'user-wrapper' }, '', userRow);

  createElement('div', { className: 'user_id' }, user.id, userWrapper);
  createElement('div', { className: 'user_name' }, user.name, userWrapper);

  const divButtons = createElement('div', { className: 'user_buttons' }, '', userRow);
  createElement('input', { type: 'button', value: 'View', 'data-action': 'view' }, '', divButtons);
  //createElement('input', { type: 'button', value: 'Close', 'data-action': 'close' }, '', divButtons);

  createElement('input', { type: 'button', value: 'Edit', 'data-action': 'edit' }, '', divButtons);
  createElement('input', { type: 'button', value: 'Delete', 'data-action': 'delete' }, '', divButtons);

}



// attributes: { value: 'Delete', type: 'button', className: 'delete_btn' }
// eventHandlers: { click: () => {}, mouseover: () => {}... }
function createElement(tagName, attributes, content, parent, eventHandlers) {
  const element = document.createElement(tagName);

  for (let key in attributes) {
    const attribute = key === 'className' ? 'class' : key;
    element.setAttribute(attribute, attributes[key]);
  }

  for (let event in eventHandlers) {
    element.addEventListener(event, eventHandlers[event]);
  }

  element.textContent = content;

  if (parent) {
    parent.appendChild(element);
  }

  return element;
}



function gridClickHandler(event) {
  if (event.target.nodeName === 'INPUT') {
    const dataAction = event.target.getAttribute('data-action');
    // const userId = event.target.parentNode.parentNode.getAttribute('data-id');
    const userId = event.target.closest('.user_row').getAttribute('data-id');

    const user = getUserById(userId);
    switch (dataAction) {
      case 'view':
        showUserData(user);
        break;
      case 'edit':
        showForm(user, 'Edit user information');

        break;
      case 'delete':
        deleteUser(user)
        break;
      // case 'close':
      //   clearElement(document.querySelector('#view'));
      //   break;
    }
  }
}



function getUserById(id) {
  return users.find(user => user.id === id);
}



function showUserData(user) {
  document.querySelector('#info').classList.remove('hidden');
  const recipientElement = document.querySelector('#info');

  clearElement(recipientElement);

  const userInfoWrapper = createElement('div', { 'className': 'user-info-wrapper' }, '', recipientElement);
  createElement('div', {}, 'User information', userInfoWrapper);
  createElement('input', { type: 'button', value: 'Close', 'data-action': 'close' }, '', userInfoWrapper, { click: () => { closeAndHideInfoElement(event) } });

  for (const key in user) {
    if (user.hasOwnProperty.call(user, key)) {
      let keyName = key;
      let firstLetterCapitalized = keyName.charAt(0).toUpperCase() + keyName.slice(1);
      let innerText = `${firstLetterCapitalized}: ${user[key]}`
      createElement('p', {}, innerText, recipientElement);
    }
  }
}



function clearElement(element) {
  element.innerHTML = '';
}



function closeAndHideInfoElement(event) {
  const dataAction = event.target.getAttribute('data-action');
  if (dataAction === 'close') {
    const viewElement = document.querySelector('#info');
    clearElement(viewElement);
    viewElement.classList.add('hidden');
  }

}



// При клике на кнопку “View” - сбоку открываются данные пользователя
// При клике на кнопку “Edit” появляется возможность редактировать данные пользователя в блоке под списком.
// Данные валидируются (на пустоту) и сохраняются при клике на кнопку “Save” и обновляют данные в списке

function showForm(user, formName) {

  document.querySelector('#info').classList.remove('hidden');
  const recipientElement = document.querySelector('#info');

  clearElement(recipientElement);

  const userInfoWrapper = createElement('div', { 'className': 'user-info-wrapper' }, '', recipientElement);
  createElement('div', {}, formName, userInfoWrapper);
  createElement('input', { type: 'button', value: 'Close', 'data-action': 'close' }, '', userInfoWrapper, { click: () => { closeAndHideInfoElement(event) } });

  const formElement = createElement('form', { 'className': 'user-form', name: 'userform', 'data-user-id': user.id }, '', recipientElement);

  for (const key in user) {
    if (user.hasOwnProperty.call(user, key)) {
      if (key === 'id') {
        continue;
      }
      let keyName = key;
      let firstLetterCapitalized = keyName.charAt(0).toUpperCase() + keyName.slice(1);
      let innerText = `${firstLetterCapitalized} `
      const label = createElement('label', {}, innerText, formElement);
      const inputWrapper = createElement('div', { 'className': 'input-wrapper' }, '', label);

      createElement('input', { type: 'text', name: key, value: user[key] }, '', inputWrapper);
    }
  }
  createElement('input', { type: 'button', value: 'Save', 'data-action': 'save', 'data-id': user.id }, '', formElement, { click: () => { saveUserData(event); } });
}



function generateId() {
  const chars = '0123456789'; // Возможные символы для номера
  let newId = ''; // Переменная для хранения сгенерированного номера
  
  // Генерируем 8 случайных цифр и добавляем их к строке номера
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    newId += chars[randomIndex];
  }

  if (getUserById(newId) === undefined){
    return newId;
  } else {
    return generateId()
  }
 
}


function createNewUser() {

  const newUser = {
    id: generateId(),
    name: '',
    login: '',
    email: '',
    age: '',
    phone: '',
    card: ''
  }

  showForm(newUser, 'Add new user')
}



function saveUserData(event) {

  const userId = event.target.getAttribute('data-id');
  let user = {};
  const form = document.forms.userform;
  
  if (getUserById(userId) === undefined) {
    user = {
      id: userId,
      name: form.name.value,
      login: form.login.value,
      email: form.email.value,
      age: form.age.value,
      phone: form.phone.value,
      card: form.card.value,
    }

  } else {

    user = getUserById(userId);

    for (const key in user) {
      if (key === 'id') {
        continue;
      }
      user[key] = form[key].value;
    }
  }


  const inputFields = form.querySelectorAll('input[type="text"]');
  let qtyOfCorrectFilledInputs = verifyInputFields(inputFields)
  let qtyOfUserProp = countUserProperties(user)

  if (qtyOfCorrectFilledInputs === (qtyOfUserProp - 1)) {

    if (getUserById(userId) === undefined) {
      users.push(user);
      pushUsersToLocalStorage(users);
      const grid = document.querySelector('#grid');
      const userRow = createUserRow(user)
      grid.appendChild(userRow);

    } else {

      const userIndex = users.findIndex(u => u.id === user.id);

      if (userIndex !== -1) {
        users[userIndex] = user;
        const userRow = document.querySelector(`.user_row[data-id="${user.id}"]`);
        userRow.innerHTML = '';
        createUserRowContent(userRow, user)
        pushUsersToLocalStorage(users);

      } else {
        console.error('The user did not find');
      }
    }
    const info = document.querySelector('#info');
    clearElement(info);
    info.classList.add('hidden');
  }
}

function countUserProperties(user) {
  let count = 0;
  for (let prop in user) {
    if (user.hasOwnProperty(prop)) {
      count++;
    }
  }
  return count;
}

function pushUsersToLocalStorage(users) {
  localStorage.setItem('users', JSON.stringify(users));
}



function verifyInputFields(inputFields) {
  let qtyOfTrueChecks = 0;
  inputFields.forEach(input => {

    let result;
    let pattern;
    let errorText;

    switch (input.name) {
      case 'name':
        pattern = /^[A-Z][a-z]{1,}$/;
        result = pattern.test(input.value);
        errorText = 'Wrong format'
        break;
      case 'login':
        pattern = /^(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z0-9]).{8,}$/;
        result = pattern.test(input.value);
        errorText = 'min 8 char including min 1 special char.'
        break;
      case 'email':
        pattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        result = pattern.test(input.value);
        errorText = 'Wrong email format'
        break;
      case 'age':
        pattern = /^(1[6-9]|[2-9][0-9]|1[0-0][0-9]|110)$/;
        result = pattern.test(input.value);
        errorText = 'Only digits. You must be at least 16'
        break;
      case 'phone':
        pattern = /^\+380\d{9}$/;
        result = pattern.test(input.value);
        errorText = 'Wrong format. Use +380XXXXXXXXX'
        break;
      case 'card':
        pattern = /^(?:\d{4}[-_ ]?){3}\d{4}$/;
        result = pattern.test(input.value);
        errorText = 'Wrong format. Use XXXX XXXX XXXX XXXX'
        break;

      default:
        break;
    }
    if (result === true) {
      qtyOfTrueChecks++
    }

    if (!result) {

      if (input.nextElementSibling && input.nextElementSibling.className === 'error-message') {
        input.nextElementSibling.remove();
      }
      // Если поле не заполнено, добавляем div с сообщением об ошибке
      if (!input.nextElementSibling || input.nextElementSibling.className !== 'error-message') {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = input.value === '' ? `This is a required field!` : `${errorText}`;
        input.parentNode.insertBefore(errorMessage, input.nextElementSibling);
      }
    } else {
      // Если поле заполнено, удаляем сообщение об ошибке (если оно было)
      if (input.nextElementSibling && input.nextElementSibling.className === 'error-message') {
        input.nextElementSibling.remove();
      }
    }
  })
  return qtyOfTrueChecks;
};


function deleteUser(user) {
  let isDelete = window.confirm('Are you shure?');
  if (isDelete) {
    const userIndex = users.findIndex(u => u.id === user.id);
    users.splice(userIndex, 1);
    localStorage.setItem('users', JSON.stringify(users));
    const elementToRemove = document.querySelector(`[data-id="${user.id}"]`);
    if (elementToRemove) {
      elementToRemove.parentNode.removeChild(elementToRemove);
    } else {
      console.log("Элемент с указанным data-id не найден.");
    }
  }
}
