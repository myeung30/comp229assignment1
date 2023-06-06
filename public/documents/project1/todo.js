/*
File name:
Student's name: Man Chun Yeung
StudentID: 301251548
Date: 28 May 2023
*/

var numberOfItem = 0;
 var input = document.getElementById("todoinput");
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter"){
      document.getElementById("todo-list").innerHTML += "<li class='task' id='completeitem" + numberOfItem + "' onClick='completeTask(this.id)'>" + input.value + "<div class = 'remove-task' id='item" + numberOfItem + "'onClick='removeTask(this.id)'>remove</div></li>";
      input.value = "";
      numberOfItem ++;
    }
  });

function removeTask(id) {
  document.getElementById(id).remove();
  document.getElementById("complete"+ id).remove();
  }

function completeTask(id) {
  document.getElementById(id).className =="task"? document.getElementById(id).className="task task-complete": document.getElementById(id).className="task";
}
