document.addEventListener('DOMContentLoaded', function () {
  const todoList = document.getElementById('todo-list');
  const addItemBtn = document.getElementById('add-item-btn');
  const newItemInput = document.getElementById('new-item-input');
  const searchBar = document.getElementById('search-bar');

  let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

  function saveItems() {
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }

  function renderItems(items) {
      todoList.innerHTML = '';
      items.forEach((item, index) => {
          const li = document.createElement('li');
          li.className = `todo-item ${item.completed ? 'completed' : ''}`;

          const itemText = document.createElement('span');
          itemText.className = 'item-text';
          itemText.textContent = item.text;
          itemText.contentEditable = true;

          itemText.addEventListener('input', () => {
              item.text = itemText.textContent;
              saveItems();
          });

          const actions = document.createElement('div');
          actions.className = 'actions';

          const doneBtn = document.createElement('button');
          doneBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M9 16.17l-3.88-3.88a.996.996 0 111.41-1.41L9 13.34l7.47-7.47a.996.996 0 111.41 1.41L9 16.17z"></path></svg>`;
          doneBtn.addEventListener('click', () => {
              item.completed = !item.completed;
              renderItems(todoItems);
              saveItems();
          });

          const upBtn = document.createElement('button');
          upBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M7 14l5-5 5 5H7z"></path></svg>`;
          upBtn.addEventListener('click', () => {
              if (index > 0) {
                  [todoItems[index], todoItems[index - 1]] = [todoItems[index - 1], todoItems[index]];
                  renderItems(todoItems);
                  saveItems();
              }
          });

          const downBtn = document.createElement('button');
          downBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"></path></svg>`;
          downBtn.addEventListener('click', () => {
              if (index < todoItems.length - 1) {
                  [todoItems[index], todoItems[index + 1]] = [todoItems[index + 1], todoItems[index]];
                  renderItems(todoItems);
                  saveItems();
              }
          });

          const deleteBtn = document.createElement('button');
          deleteBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1z"></path></svg>`;
          deleteBtn.addEventListener('click', () => {
              todoItems.splice(index, 1);
              renderItems(todoItems);
              saveItems();
          });

          actions.append(doneBtn, upBtn, downBtn, deleteBtn);
          li.append(itemText, actions);
          todoList.appendChild(li);
      });
  }

  addItemBtn.addEventListener('click', () => {
      const newItemText = newItemInput.value.trim();
      if (newItemText !== '') {
          todoItems.push({ text: newItemText, completed: false });
          renderItems(todoItems);
          saveItems();
          newItemInput.value = '';
      }
  });

  searchBar.addEventListener('input', () => {
      const searchText = searchBar.value.toLowerCase();
      const filteredItems = todoItems.filter(item => item.text.toLowerCase().includes(searchText));
      renderItems(filteredItems);
  });

  renderItems(todoItems);
});
