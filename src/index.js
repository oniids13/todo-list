import "./styles.css";
import { Task } from "./tasks.js";
import { Project } from "./project.js"

const footerYear = document.querySelector(".footer");
const prjctSelect = document.getElementById("project-selection");
const taskProjectSelect = document.getElementById("project-select");
const prjctBtn = document.querySelector(".add-project-btn");
const taskBtn = document.querySelector(".add-task-btn");
const projectModal = document.getElementById("addProjectModal");
const taskModal = document.getElementById("addTaskModal");
const closeModalbtn = document.querySelector(".close-modal-btn");
const closeTaskBtn = document.querySelector(".close-task-btn");
const projectForm = document.querySelector("#project-form");
const taskForm = document.querySelector("#task-form");
footerYear.textContent = new Date().getFullYear();


let defaultProject = new Project("default");
let defaultOption = document.createElement("option");
defaultOption.text = defaultProject.name;
defaultOption.value = defaultProject.name;
prjctSelect.add(defaultOption);
const taskOption = document.createElement("option");
taskOption.text = defaultProject.name;
taskOption.value = defaultProject.name;
taskProjectSelect.add(taskOption);


let projectList = [];



prjctBtn.addEventListener("click", () => {
    projectModal.style.display = "block";

})

taskBtn.addEventListener("click", () => {
    taskModal.style.display = "block";
})



projectForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const projectName = document.getElementById("project-name").value;
    const newProject = new Project(projectName);
    projectList.push(newProject);
    

    const option = document.createElement("option");
    option.text = newProject.name;
    option.value = newProject.name;
    prjctSelect.add(option);

    projectList.forEach((project) => {
        const option = document.createElement("option");
        option.text = project.name;
        option.value = project.name;
        taskProjectSelect.add(option);
    })
    

    projectForm.reset();
})


taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const dueDate = document.getElementById("task-date").value;
    const priorityLevel = document.getElementById("task-priority").value;
    const taskNote = document.getElementById("task-notes").value;

    const newTask = new Task(taskName, dueDate, priorityLevel, taskNote);

    taskForm.reset();
    
})


closeModalbtn.addEventListener("click", () =>{
    projectModal.style.display = "none";
    document.getElementById("project-name").value = "";
})

closeTaskBtn.addEventListener("click", () => {
    taskModal.style.display = "none";
    document.getElementById("task-name").value = "";
    document.getElementById("task-date").value = "";
    document.getElementById("task-priority").value = "";
    document.getElementById("task-notes").value = "";
})




    


