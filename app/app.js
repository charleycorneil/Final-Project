const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const userDisplay = document.getElementById("user-display");
const logoutBtn = document.getElementById("logout-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  let errorMessage = "";

  if (username === "") {
    errorMessage += "Username is required.\n";
  }
  if (password.length < 8) {
    errorMessage += "Password must be at least 8 characters.\n";
  }

  if (errorMessage) {
    alert(errorMessage.trim());
  } else {
    userDisplay.textContent = `Welcome, ${username}`;
    loginSection.style.display = "none";
    dashboardSection.style.display = "block";
  }
});

logoutBtn.addEventListener("click", function () {
  loginSection.style.display = "block";
  dashboardSection.style.display = "none";
  usernameInput.value = "";
  passwordInput.value = "";
});

addTaskBtn.addEventListener("click", function () {
  const taskName = prompt("Enter task description:");
  if (taskName) {
    createTask(taskName, "Indoor"); // Default category
  }
});

function createTask(taskName, category) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const taskTitle = document.createElement("h4");
  taskTitle.textContent = `${taskName} (${category})`;
  taskTitle.addEventListener("click", function () {
    taskTitle.classList.toggle("done");
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", function () {
    taskList.removeChild(taskDiv);
  });

  const changeTextBtn = document.createElement("button");
  changeTextBtn.textContent = "Change Text";
  changeTextBtn.addEventListener("click", function () {
    const newText = prompt("Update task text:", taskName);
    if (newText) {
      taskTitle.textContent = `${newText} (${category})`;
    }
  });

  const categorySelect = document.createElement("select");
  ["Indoor", "Outdoor"].forEach(function (option) {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    if (option === category) {
      optionElement.selected = true;
    }
    categorySelect.appendChild(optionElement);
  });

  categorySelect.addEventListener("change", function () {
    taskTitle.textContent = `${taskName} (${categorySelect.value})`;
  });

  taskDiv.appendChild(taskTitle);
  taskDiv.appendChild(removeBtn);
  taskDiv.appendChild(changeTextBtn);
  taskDiv.appendChild(categorySelect);
  taskList.appendChild(taskDiv);
}
