
const todoList = JSON.parse(localStorage.getItem('todo')) || [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    const {name, dueDate} = todo;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${i}, 1);
        renderTodoList();      
      " class="delete-button">Delete</button>
      `;
    todoListHTML += html;
  }
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  localStorage.setItem('todo', JSON.stringify(todoList));
}

function addTodo() {
  const inputElem = document.querySelector('.js-name-input');
  const name = inputElem.value;

  const dateInputElem = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElem.value;

  if(!name) {
    return;
  }
    
  todoList.push({
    name: name,
    dueDate: dueDate
    });

  inputElem.value = '';
  
	renderTodoList();
}

function enterButton(event) {
  if(event.key === 'Enter') {
    addTodo()
  }
}