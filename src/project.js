
export class Project {
    constructor(name) {
        this.name = name
        this.tasks = [];
    }

    addTask(taskName){
    this.tasks.push(taskName);
    }

    deleteTask(taskName) {
        const index = this.tasks.indexOf(taskName);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }

}