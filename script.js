function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value !== "") {
    var taskItem = document.createElement("div");
    taskItem.className = "task";

    var taskText = document.createElement("span");
    taskText.innerText = taskInput.value;

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function () {
      taskList.removeChild(taskItem);
    };

    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);

    taskInput.value = "";
  }
}
