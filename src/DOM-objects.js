import { Task } from "./tasks.js";
import { Project } from "./project.js"
import "./styles.css";

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
const taskSection = document.querySelector(".task-section");
footerYear.textContent = new Date().getFullYear();



let allTask = document.createElement("option");
allTask.text = "All Task";
allTask.value = "allTask";
prjctSelect.add(allTask);


 // setting default project
 let defaultProject = new Project("default");
 let defaultOption = document.createElement("option");
 defaultOption.text = defaultProject.name;
 defaultOption.value = defaultProject.name;
 prjctSelect.add(defaultOption);
 const taskOption = document.createElement("option");
 taskOption.text = defaultProject.name;
 taskOption.value = defaultProject.name;
 taskProjectSelect.add(taskOption);



 const sampleTask = new Task("Sample", "12-08-2024", "high", "Hello there!");
 defaultProject.addTask(sampleTask);

let projectList = [defaultProject];


export function showModal() {
    // shows add project and task modal
    prjctBtn.addEventListener("click", () => {
        projectModal.style.display = "block";

    })

    taskBtn.addEventListener("click", () => {
        taskModal.style.display = "block";
    })

}

export function addProjectForm() {
    // Add project form
    projectForm.addEventListener("submit", function (event) {
        const projectName = document.getElementById("project-name").value;
        if (projectName === "") {
            alert("Enter a Project Name");
        } else {
            event.preventDefault();
        
            const newProject = new Project(projectName);
            projectList.push(newProject);

            const option = document.createElement("option");
            option.text = newProject.name;
            option.value = newProject.name;
            prjctSelect.add(option);


            const taskProjectOption = document.createElement("option");
            taskProjectOption.text = newProject.name;
            taskProjectOption.value = newProject.name;
            taskProjectSelect.add(taskProjectOption);

            

            projectForm.reset();
            projectModal.style.display = "none";

            alert("New Project successfully created!")
            }
    })
}

export function addTaskForm() {
    // Add task form
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskName = document.getElementById("task-name").value;
        const dueDate = document.getElementById("task-date").value;
        const priorityLevel = document.getElementById("task-priority").value;
        const taskNote = document.getElementById("task-notes").value;
        const selectedProjectName = document.getElementById("project-select").value;


        if (taskName === "" || dueDate === "" || priorityLevel === "") {
            alert("Please don't leave the input fields blank.");
        } 
        else {
            
            const newTask = new Task(taskName, dueDate, priorityLevel, taskNote);

            const selectedProject = projectList.find(project => project.name === selectedProjectName);

            selectedProject.addTask(newTask);
            alert(`New task successfully added to ${selectedProjectName}!`);

            const taskDiv = document.createElement("div");
            taskColor(newTask, taskDiv);
            
            const nameOfTask = document.createElement("h2");
            const dateOfTask = document.createElement("p");
            const priorityofTask = document.createElement("p");
            const notesOfTask = document.createElement("p");
            const status = document.createElement("p");

            nameOfTask.textContent = newTask.title;
            dateOfTask.textContent = `Due Date: ${newTask.dueDate}`;
            priorityofTask.textContent = `Priority level: ${newTask.priority}`;
            notesOfTask.innerHTML = `Notes: </br> ${newTask.notes}`;
            status.textContent = "Status: On-going";

            taskDiv.appendChild(nameOfTask);
            taskDiv.appendChild(dateOfTask);
            taskDiv.appendChild(priorityofTask);
            taskDiv.appendChild(notesOfTask);
            taskDiv.appendChild(status);

            taskSection.appendChild(taskDiv);

            const toggleBtn = document.createElement("button");
            toggleBtn.classList.add("toggleBtn");
            toggleBtn.textContent = "Change Status";
            taskDiv.appendChild(toggleBtn);

            toggleBtn.addEventListener("click", () => {
                if (newTask.isDone === false) {
                    newTask.toggleComplete(true);
                    taskDiv.classList.toggle("taskList-done");
                    status.textContent = "Status: Completed";
                }
                else if(newTask.isDone === true) {
                    newTask.toggleComplete(false);
                    taskDiv.classList.toggle("taskList-done");
                    status.textContent = "Status: On-going";
                }
            })
            

        }
            taskForm.reset();
            taskModal.style.display = "none";
        
    });
}

export function closeModal() {
        // close project modal
    closeModalbtn.addEventListener("click", () =>{
        projectModal.style.display = "none";
        document.getElementById("project-name").value = "";
    })

    // close task modal
    closeTaskBtn.addEventListener("click", () => {
        taskModal.style.display = "none";
        document.getElementById("task-name").value = "";
        document.getElementById("task-date").value = "";
        document.getElementById("task-priority").value = "";
        document.getElementById("task-notes").value = "";
    })
}

export function showTasks() {
    // showing tasks

    prjctSelect.addEventListener("change", function() {
        const selectedProjectName = prjctSelect.value;
        const selectedProject = projectList.find(project => project.name === selectedProjectName);

        taskSection.innerHTML = "";

        if(selectedProject) {

            const tasks = selectedProject.getTasks();
            tasks.forEach((task) => {
                const taskDiv = document.createElement("div");
                taskColor(task, taskDiv);
                
                const nameOfTask = document.createElement("h2");
                const dateOfTask = document.createElement("p");
                const priorityofTask = document.createElement("p");
                const notesOfTask = document.createElement("p");
                const status = document.createElement("p");

        
                nameOfTask.textContent = task.title;
                dateOfTask.textContent = `Due Date: ${task.dueDate}`;
                priorityofTask.textContent = `Priority level: ${task.priority}`;
                notesOfTask.innerHTML = `Notes: </br> ${task.notes}`;
                status.textContent = "Status: On-going";
        
                taskDiv.appendChild(nameOfTask);
                taskDiv.appendChild(dateOfTask);
                taskDiv.appendChild(priorityofTask);
                taskDiv.appendChild(notesOfTask);
                taskDiv.appendChild(status);

                taskSection.appendChild(taskDiv);

                const toggleBtn = document.createElement("button");
                toggleBtn.classList.add("toggleBtn");
                toggleBtn.textContent = "Change Status";
                taskDiv.appendChild(toggleBtn);

                toggleBtn.addEventListener("click", () => {
                    if (task.isDone === false) {
                        task.toggleComplete(true);
                        taskDiv.classList.toggle("taskList-done");
                        status.textContent = "Status: Completed";
                    }
                    else if(task.isDone === true) {
                        task.toggleComplete(false);
                        taskDiv.classList.toggle("taskList-done");
                        status.textContent = "Status: On-going";
                    }
                })
        });
        }

        if (prjctSelect.value === "allTask") {
           createAllTask();
        
        }

    });
}

export function showallTask() {

    if (prjctSelect.value === "allTask") {
        createAllTask();
    
    }
}


function getAllTasksFromProjects() {
    let allTasks = [];

    projectList.forEach(project => {
        const tasks = project.getTasks(); 
        allTasks = allTasks.concat(tasks);
    });

    return allTasks;
}

function createAllTask() {
    const allTasks = getAllTasksFromProjects();

    allTasks.forEach((task) => {
        const taskDiv = document.createElement("div");

        taskColor(task, taskDiv);

        
        taskSection.appendChild(taskDiv);
        const nameOfTask = document.createElement("h2");
        const dateOfTask = document.createElement("p");
        const priorityofTask = document.createElement("p");
        const notesOfTask = document.createElement("p");
        const status = document.createElement("p");
        

        nameOfTask.textContent = task.title;
        dateOfTask.textContent = `Due Date: ${task.dueDate}`;
        priorityofTask.textContent = `Priority level: ${task.priority}`;
        notesOfTask.innerHTML = `Notes: </br> ${task.notes}`;
        status.textContent = "Status: On-going";



        taskDiv.appendChild(nameOfTask);
        taskDiv.appendChild(dateOfTask);
        taskDiv.appendChild(priorityofTask);
        taskDiv.appendChild(notesOfTask);
        taskDiv.appendChild(status);


        const toggleBtn = document.createElement("button");
        toggleBtn.classList.add("toggleBtn");
        toggleBtn.textContent = "Change Status";
        taskDiv.appendChild(toggleBtn);

        toggleBtn.addEventListener("click", () => {
            if (task.isDone === false) {
                task.toggleComplete(true);
                taskDiv.classList.toggle("taskList-done");
                status.textContent = "Status: Completed";
            }
            else if(task.isDone === true) {
                task.toggleComplete(false);
                taskDiv.classList.toggle("taskList-done");
                status.textContent = "Status: On-going";
            }
        })

        })
    
    }

    function taskColor(task, taskDiv) {
        if (task.priority === "low") {
            taskDiv.classList.add("taskList-low");
        }
        else if (task.priority === "medium") {
            taskDiv.classList.add("taskList-medium");
        }

        else {
            taskDiv.classList.add("taskList-high");
        }
    }