function showUsers(usersList) {
  const parent = document.querySelector('#grid');
  clearElement(parent);
  parent.addEventListener('click', gridClickHandler)

  // dataset data-* (data-attributes)

  for (let user of usersList) {
    const userRow = document.createElement('div');
    userRow.classList.add('user_row');
    userRow.setAttribute('data-id', user.id);

    const userWrapper = createElement('div', { className: 'user-wrapper' }, '', userRow);

    createElement('div', { className: 'user_id' }, user.id, userWrapper);
    createElement('div', { className: 'user_name' }, user.name, userWrapper);

    const divButtons = createElement('div', { className: 'user_buttons' }, '', userRow);
    createElement('input', { type: 'button', value: 'View', 'data-action': 'view' }, '', divButtons);
    //createElement('input', { type: 'button', value: 'Close', 'data-action': 'close' }, '', divButtons);

    createElement('input', { type: 'button', value: 'Edit', 'data-action': 'edit' }, '', divButtons);
    createElement('input', { type: 'button', value: 'Delete', 'data-action': 'delete' }, '', divButtons);

    parent.appendChild(userRow);
  }
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
  parent.appendChild(element);

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
        showEditForm(user);
        break;
      case 'delete':
        alert("DELETE button" + userId);
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
  document.querySelector('#view').classList.remove('hidden');
  const recipientElement = document.querySelector('#view');

  clearElement(recipientElement);

  const userInfoWrapper = createElement('div', { 'className': 'user-info-wrapper' }, '', recipientElement);
  createElement('div', {}, 'User information', userInfoWrapper);
  createElement('input', { type: 'button', value: 'Close', 'data-action': 'close' }, '', userInfoWrapper);


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

function hideUserData(event) {
  const dataAction = event.target.getAttribute('data-action');
  if (dataAction === 'close') {
    const viewElement = document.querySelector('#view');
    clearElement(viewElement);
    viewElement.classList.add('hidden');
  }

}


{/* <p>User information</p>
<p>Id: 1</p>
<p>Name: 1</p>
<p>Login: 1</p>
<p>Email: 1</p>
<p>Age: 1</p>
<input type="button" value="Close"> */}

// При клике на кнопку “View” - сбоку открываются данные пользователя
// При клике на кнопку “Edit” появляется возможность редактировать данные пользователя в блоке под списком.
// Данные валидируются (на пустоту) и сохраняются при клике на кнопку “Save” и обновляют данные в списке



function showEditForm(user) {
  document.querySelector('#view').classList.remove('hidden');
  const recipientElement = document.querySelector('#view');

  clearElement(recipientElement);

  const userInfoWrapper = createElement('div', { 'className': 'user-info-wrapper' }, '', recipientElement);
  createElement('div', {}, 'User information', userInfoWrapper);
  createElement('input', { type: 'button', value: 'Close', 'data-action': 'close' }, '', userInfoWrapper);

  const formElement = createElement('form', { 'className': 'user-form', name: 'editform', 'data-user-id': user.id }, '', recipientElement);

  for (const key in user) {
    if (user.hasOwnProperty.call(user, key)) {
      let keyName = key;
      let firstLetterCapitalized = keyName.charAt(0).toUpperCase() + keyName.slice(1);
      let innerText = `${firstLetterCapitalized} `
      const label = createElement('label', {}, innerText, formElement);
      const inputWrapper = createElement('div', { 'className': 'input-wrapper' }, '', label);


      createElement('input', { type: 'text', name: key, value: user[key] }, '', inputWrapper);

    }
  }
  createElement('input', { type: 'button', value: 'Save', 'data-action': 'save' }, '', formElement);

}


function saveUserData(event) {

  const dataAction = event.target.getAttribute('data-action');
  const userId = event.target.closest('.user-form').getAttribute('data-user-id');
  const user = getUserById(userId);
  const userIndex = users.findIndex(u => u.id === user.id);

  if (dataAction === 'save') {

    const form = document.forms.editform;
    for (const key in user) {
      user[key] = form[key].value;
    }



    console.log(user);
    //console.log(userIndex);

    const inputFields = document.querySelectorAll('input');
    alertInputsIfNotFilled(inputFields)


    if (isFieldsFilled(user)) {

      if (userIndex !== -1) {
        users[userIndex] = user;
        console.log('Данные пользователя успешно обновлены.');
        showUsers(users);
      } else {
        console.error('Пользователь не найден в массиве пользователей.');
      }

    }

  }
  //return users[userIndex]
}



function alertInputsIfNotFilled(inputFields) {
  inputFields.forEach(input => {
    if (!input.value) {
      // Если поле не заполнено, добавляем div с сообщением об ошибке
      if (!input.nextElementSibling || input.nextElementSibling.className !== 'error-message') {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'This is a required field';
        input.parentNode.insertBefore(errorMessage, input.nextElementSibling);
      }
    } else {
      // Если поле заполнено, удаляем сообщение об ошибке (если оно было)
      if (input.nextElementSibling && input.nextElementSibling.className === 'error-message') {
        input.nextElementSibling.remove();
      }
    }
  });
};


function isFieldsFilled(user) {
  for (const key in user) {
    if (!user[key] && user[key] !== 0) {
      // Если значение пусто или undefined, возвращаем false
      return false;
    }
  }
  // Если все значения не пустые, возвращаем true
  return true;
};
