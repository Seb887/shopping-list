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

  // checkfilter();
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    const liElement = e.target.parentElement.parentElement;
    liElement.remove();
    // checkUI();
  }

  checkUI();
}

function clearAll() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }

  checkUI();
}

function checkUI() {
  if (itemList.firstChild === null) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Events
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAll);
