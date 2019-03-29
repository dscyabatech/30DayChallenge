let lis = document.querySelectorAll("li");
for (let i = 0; i < lis.length; i++) {
  lis[i].addEventListener("click", function () {
    this.classList.toggle("completed");
  });
}

let spans = document.querySelectorAll("span");
for (let i = 0; i < spans.length; i++) {
  spans[i].addEventListener("click", function (event) {
    fadeOut(this.parentNode);
    event.stopPropagation();
  });
}

function fadeOut(element) {
  let fadeEffect = setInterval(function () {
    if (!element.style.opacity) {
      element.style.opacity = 1;
    }
    if (element.style.opacity < 0.1) {
      clearInterval(fadeEffect);
      element.remove();

      let todos = JSON.parse(localStorage.getItem("todo"));
      todos.forEach((item, index) => {
        if (element.textContent === item) {
          todos.splice(index, 1);
          localStorage.removeItem("todo");
          localStorage.setItem("todo", JSON.stringify(todos));
        }
      });
    } else {
      element.style.opacity -= 0.1;
    }
  }, 50);
}

if (localStorage.getItem("todo") === null) {
  inputTask();
} else {
  JSON.parse(localStorage.getItem("todo")).forEach(item => {
    createTaskItem(item);
  });
  inputTask();
}

function inputTask() {
  document
    .querySelector("input[type=text]")
    .addEventListener("keypress", function (event) {
      if (event.which === 13) {
        let todoText = this.value;
        this.value = "";
        createTaskItem(todoText);
        storeTaskInLocalStorage(todoText);
      }
    });

  document.querySelector(".fa-plus").addEventListener("click", function () {
    document.querySelector("input[type=text]").classList.toggle("display");
  });
}

function createTaskItem(item) {
  let todoText = item;
  let newTodo = document.createElement("li");
  let newSpan = document.createElement("span");
  newSpan.innerHTML = '<i class="fa fa-trash"></i>';
  newTodo.innerHTML = todoText;
  newTodo.insertAdjacentElement("afterbegin", newSpan);
  document.querySelector("ul").appendChild(newTodo);

  newTodo.addEventListener("click", function () {
    this.classList.toggle("completed");
  });

  newSpan.addEventListener("click", function (event) {
    fadeOut(this.parentNode);
    event.stopPropagation();
  });
  if (localStorage.getItem("todo") === null) {
  }
}

function storeTaskInLocalStorage(todoText) {
  let todo;
  if (localStorage.getItem("todo") === null) {
    todo = [];
  } else {
    todo = JSON.parse(localStorage.getItem("todo"));
  }
  todo.push(todoText);
  localStorage.setItem("todo", JSON.stringify(todo));
  console.log(todo);
}
