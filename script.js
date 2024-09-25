const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const toggleCompleted = document.getElementById("toggle-completed");
const completedTasks = document.getElementById("completed-tasks");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = "";
  saveData();
}

inputBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.add("checked");

    //TODO: Add dates on completed tasks, cause it's line through

    completedTasks.appendChild(e.target);
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove("");
    saveData();
  }
});

completedTasks.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.remove("checked");
    listContainer.appendChild(e.target);
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove("");
    saveData();
  }
});

toggleCompleted.addEventListener("click", function () {
  completedTasks.classList.toggle("hidden");
  const icon = this.querySelector("i");
  if (completedTasks.classList.contains("hidden")) {
    this.innerHTML =
      '<i class="fa-solid fa-chevron-down"></i> Show Completed Tasks';
  } else {
    this.innerHTML =
      '<i class="fa-solid fa-chevron-up"></i> Hide Completed Tasks';
  }
  this.appendChild(completedTasks);
});

function saveData() {
  localStorage.setItem("listContainer", listContainer.innerHTML);
  localStorage.setItem("completedTasks", completedTasks.innerHTML);
}

function showItem() {
  listContainer.innerHTML = localStorage.getItem("listContainer") || "";
  completedTasks.innerHTML = localStorage.getItem("completedTasks") || "";
}

showItem();
