var xhttp = new XMLHttpRequest();

document.getElementById("addForm").addEventListener('submit', sendToDo);

function sendToDo(event){
    event.preventDefault();
    
    // Setting variable for form input (get from HTML form)
    var textEntered = document.getElementById("addTextBox").value;
    document.getElementById("addTextBox").value = "";
    var data = {
        text: textEntered
    }
    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();
    // Response handler
    xhttp2.onreadystatechange = function() {
        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {
            // parse JSON response
            var todo = JSON.parse(this.responseText);
            displayTasks();
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };
    xhttp2.open("POST", "https://cse204.work/todos", true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "81420b-2873f1-f94a25-5559d5-84d164");
    xhttp2.send(JSON.stringify(data));
}

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(this.responseText);
        console.log(todos);
    }
};
xhttp.open("GET", "https://cse204.work/todos", true);
xhttp.setRequestHeader("x-api-key","81420b-2873f1-f94a25-5559d5-84d164");
xhttp.send();


function displayTasks(){
    var taskList = document.getElementById("taskList");

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var todos = JSON.parse(this.responseText);
            for(var i=0; i<todos.length; i++){
                var addTaskBox = document.createElement("div");
                addTaskBox.className = "taskDiv";
                adding.appendChild(addTaskBox);
            
                var addChecked = document.createElement("input");
                addChecked.type = "checkbox";
                addChecked.id = "check" + i;
                addChecked.value = "checked"+i;
                addTaskBox.appendChild(addChecked);
                addChecked.setAttribute("display",todos[i]["id"]);
                addChecked.addEventListener("click", updateTask);
                if(todos[i]["completed"]){
                    addTaskBox.style.color = "gray";
                    addChecked.checked = true;
                }
            
                var addText = document.createElement("span");
               addText.className = "taskText";
               addText.innerText = todos[i]["text"];
                addTaskBox.appendChild(addText);
            
                var addAside = document.createElement("aside");
                addAside.className = "deleteButtons"
                addTaskBox.appendChild(addAside);

                var addDeleteButton = document.createElement("input");
               addDeleteButton.type = "button";
               addDeleteButton.className = "deleteTask";
               addDeleteButton.id = "delete"+1;
               addDeleteButton.value = "Delete";
               addAside.appendChild(addDeleteButton);
               addDeleteButton.setAttribute("deleteTask",todos[i]["id"])
               addDeleteButton.addEventListener("click", removeTask);
            }
        }
    };
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key","81420b-2873f1-f94a25-5559d5-84d164");
    xhttp.send();
}

window.addEventListener('load', () => {
    displayTasks();
})

function updateTask(event){
    var id = event.target.getAttribute("display");
    var data3 = {
        completed: true
    }

    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };
    xhttp2.open("PUT", "https://cse204.work/todos/" + id, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key","81420b-2873f1-f94a25-5559d5-84d164");
    xhttp2.send(JSON.stringify(data3));
}

function removeTask(event){
    var id = event.target.getAttribute("deleteTask");

    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            event.target.parentNode.parentNode.remove();
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };
    xhttp3.open("DELETE", "https://cse204.work/todos/"+id, true);
    xhttp3.setRequestHeader("Content-type", "application/json");
    xhttp3.setRequestHeader("x-api-key","81420b-2873f1-f94a25-5559d5-84d164");
    xhttp3.send();
}

var adding = document.getElementById("taskList");