
export class Task {
    constructor(title, dueDate, priority, notes) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isDone = false;
    }

    editTask(title, dueDate, priority, notes) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    toggleComplete(isDone) {
        isDone ? this.isDone = true : this.isDone = false;
    }
}