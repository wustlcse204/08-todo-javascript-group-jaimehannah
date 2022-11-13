document.getElementById("addForm").addEventListener('submit', addTask);

function addTask(event){
    event.preventDefault();
    
    // getting task from input
    var task = document.getElementById("addTextBox").value;
    document.getElementById("addTextBox").value = "";
    var data = {
        text: task
    }
}