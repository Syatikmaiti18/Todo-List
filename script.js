let todoList = [
  {
    item: 'Buy Milk',
    dueDate: '2026-09-21',
    completed: false
  },
  {
    item: 'Go to College',
    dueDate: '2026-09-22',
    completed: false
  }
];

let today = new Date();

let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');

let currentDate = `${year}-${month}-${day}`;

document.querySelector('#todo-date').min = currentDate;

displayItems();

function addTodo() {
  let inputElement = document.querySelector('#todo-input');
  let dateElement = document.querySelector('#todo-date');
  let errorElement = document.querySelector('#error-message');

  let todoItem = inputElement.value;
  let todoDate = dateElement.value;

  if (todoItem == '' || todoDate == '') {
    errorElement.innerText = 'Please enter both task and date!';
    return;
  }

  todoList.push({
    item: todoItem,
    dueDate: todoDate,
    completed: false
  });

  inputElement.value = '';
  dateElement.value = '';
  errorElement.innerText = '';

  displayItems();
}

function displayItems() {
  let containerElement = document.querySelector('.todo-container');
  let countElement = document.querySelector('#task-count');

  let newHtml = '';

  for (let i = 0; i < todoList.length; i++) {

    let item = todoList[i].item;
    let dueDate = todoList[i].dueDate;
    let completed = todoList[i].completed;

    let taskClass = '';

    if (completed == true) {
      taskClass = 'completed';
    }

    newHtml += `
      <div class="todo-row grid-container">
        <span class="${taskClass}">${item}</span>

        <span class="${taskClass}">${dueDate}</span>

        <div class="buttons">
          <button class="btn-done" onclick="completeTodo(${i})">
            ✓
          </button>

          <button class="btn-delete" onclick="deleteTodo(${i})">
            Delete
          </button>
        </div>
      </div>
    `;
  }

  if (todoList.length == 0) {
    newHtml = `
      <p class="empty-message">
        No tasks available. Add your first task!
      </p>
    `;
  }

  containerElement.innerHTML = newHtml;

  countElement.innerText = `Total Tasks: ${todoList.length}`;
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  displayItems();
}

function completeTodo(index) {
  if (todoList[index].completed == false) {
    todoList[index].completed = true;
  } else {
    todoList[index].completed = false;
  }

  displayItems();
}

function clearAll() {
  todoList = [];
  displayItems();
}