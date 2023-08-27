const addItemBtn = document.querySelector('#btn');
const itemForm = document.querySelector('#item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.querySelector('#item-list');

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please insert new Item!');
  }

  addItemToDOM(newItem);

  itemInput.value = '';
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = document.createElement('button');
  button.classList.add('remove-item', 'btn-link', 'text-red');

  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-xmark');

  button.appendChild(icon);
  li.appendChild(button);
  itemList.appendChild(li);
}

itemForm.addEventListener('submit', onAddItemSubmit);
