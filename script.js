const addItemBtn = document.querySelector('#btn');
const itemForm = document.querySelector('#item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.querySelector('#item-list');
const removeBtn = itemList.querySelectorAll('button');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItemsAfterReload() {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  let newItem = itemInput.value;

  if (newItem === '') {
    alert('Please insert new Item!');
    return; // Funktion wird bei einem "return" sofort gestoppt
  }

  newItem = firstLetterToUpperCase(itemInput.value);

  addItemToDOM(newItem);

  addToLocalStorage(newItem);

  checkUI();

  itemInput.value = '';
}

// Set first letter to upper case and the rest to lower case
function firstLetterToUpperCase(string) {
  if (string === undefined) {
    return;
  } else {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }
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

  // checkIfItemExists();
}

function addToLocalStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
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
    localStorage.removeItem(item);
  }

  checkUI();
}

function clearAll() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }

  localStorage.clear();

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

// FIXME:
// function checkIfItemExists() {
//   const items = getItemsFromStorage();

//   items.forEach((item) => {
//     const itemName = item.firstChild.textContent.toLowerCase();

//     // indexof sucht im String nach dem was eingeben wird,
//     // wenn nicht vorhanden, wird -1 zurückgegeben
//     if (itemName.indexOf(itemInput.value.toLowerCase()) === -1) {
//       alert('Item already exists!');
//       itemInput.value = '';
//       return;
//     }

//     // itemInput.value = '';
//   });
// }

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
document.addEventListener('DOMContentLoaded', displayItemsAfterReload);
// console.log('getItemsFormStorage', getItemsFromStorage());
