const addItemBtn = document.querySelector('#btn');
const itemForm = document.querySelector('#item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.querySelector('#item-list');
const removeBtn = itemList.querySelectorAll('button');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please insert new Item!');
    return; // Funktion wird hier sofort gestoppt
  }

  addItemToDOM(newItem);

  addToLocalStorage(newItem);

  checkUI();

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

  checkIfItemExists();
}

function addToLocalStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  }

  itemsFromStorage.push(item);
}

function getItemsFromStorage() {
  const itemsFromStorage = localStorage.getItem('items');
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  }

  checkUI();
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove();
  }

  checkUI();
}

function clearAll() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }

  checkUI();
}

function filterItems() {
  const items = itemList.querySelectorAll('li');
  const inputText = document.querySelector('#filter').value;

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    // indexof sucht im String nach dem was eingeben wird,
    // wenn nicht vorhanden, wird -1 zurückgegeben
    if (itemName.indexOf(inputText.toLowerCase()) === -1) {
      item.style.display = 'none';
    } else {
      item.style.display = 'flex';
    }
  });
}

function checkIfItemExists() {
  const items = itemList.querySelectorAll('li');

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    // indexof sucht im String nach dem was eingeben wird,
    // wenn nicht vorhanden, wird -1 zurückgegeben
    if (itemName.indexOf(itemInput.value.toLowerCase()) === -1) {
      alert('Item already exists!');
      itemInput.value = '';
      return;
    }

    // itemInput.value = '';
  });
}

function checkUI() {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Events
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearAll);
itemFilter.addEventListener('input', filterItems);
