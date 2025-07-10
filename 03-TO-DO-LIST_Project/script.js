const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add new task
function addTask() {
  const task = inputBox.value.trim();
  if (task === "") {
    alert("Please enter a task.");
  } else {
    const li = document.createElement("li");
    li.textContent = task;

    const span = document.createElement("span");
    span.innerHTML = "\u00d7"; 
    li.appendChild(span);

    listContainer.appendChild(li);
    saveData();
  }
  inputBox.value = "";
}

// Add with Enter key
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Handle clicks: check or delete
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

// Save data to localStorage
function saveData() {
  localStorage.setItem("todoList", listContainer.innerHTML);
}

// Load data from localStorage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("todoList");
}
showTask();
