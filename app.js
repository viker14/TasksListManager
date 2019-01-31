// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('ul.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all Event Listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    // Dom Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task
    form.addEventListener('submit', addTask);
    //Remove task Event
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTask);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks form LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        //Create List Item
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create Textnode and appenf to li
        li.appendChild(document.createTextNode(task));

        //create link / delete
        const link = document .createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        //Append link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    });

}

// Add Task
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a Task');
    }

    //Create List Item
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create Textnode and appenf to li
    li.appendChild(document.createTextNode(taskInput.value));

    //create link
    const link = document .createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //STORE task in LS
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you Sure.?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }       
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks)); 

}

//Clear Tasks
function clearTask(e) {
    // taskList.innerHTML = '';

    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    } 

    //  Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) !== -1) {
                task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
        }
    );
}