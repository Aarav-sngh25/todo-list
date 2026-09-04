const todoList = JSON.parse(localStorage.getItem("todo")) || [];
let editingIndex;

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((todo, i) => {
    const { name, dueDate } = todo;
    const html = `
      <div>${
        editingIndex === i
          ? `<input class="edit-input js-edit-input" 
        value=${name}>`
          : name
      }</div>
      <div>${dueDate}</div>
      ${
        editingIndex === i
          ? `<button class="confirm-button js-confirm-button">Confirm</button>`
          : `<button class="edit-button js-edit-button">Edit</button>`
      }
      <button class="delete-button js-delete-button">Delete</button>
      `;
    todoListHTML += html;
  });

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;

  localStorage.setItem("todo", JSON.stringify(todoList));

  document.querySelectorAll(".js-delete-button").forEach((deleteButton, i) => {
    deleteButton.addEventListener("click", () => {
      todoList.splice(i, 1);
      renderTodoList();
    });
  });

  document.querySelectorAll(".js-edit-button").forEach((editButton, i) => {
    editButton.addEventListener("click", () => {
      editingIndex = i;
      renderTodoList();
    });
  });

  if (editingIndex || editingIndex === 0) {
    document
      .querySelector(".js-confirm-button")
      .addEventListener("click", () => {
        todoList[editingIndex].name =
          document.querySelector(".js-edit-input").value;
        editingIndex = undefined;
        renderTodoList();
      });
  }
}

function addTodo() {
  const inputElem = document.querySelector(".js-name-input");
  const name = inputElem.value;

  const dateInputElem = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElem.value;

  if (!name) {
    return;
  }

  todoList.push({
    name: name,
    dueDate: dueDate,
  });

  inputElem.value = "";
  dateInputElem.value = "";

  renderTodoList();
}

function handleEnterButton(event) {
  if (event.key === "Enter") {
    addTodo();
  }
}

document.querySelector(".js-add-button").addEventListener("click", () => {
  addTodo();
});

document.querySelectorAll(".js-input").forEach((input) => {
  input.addEventListener("keydown", (event) => {
    handleEnterButton(event);
  });
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Delete") {
    todoList.splice(todoList.length - 1, 1);
    renderTodoList();
  }
});
