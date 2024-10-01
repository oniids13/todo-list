
export class Task {
    constructor(title, dueDate, priority, notes) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    setTask(title, dueDate, priority, notes) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
}