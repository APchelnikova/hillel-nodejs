const { formatTask, createHash } = require('./taskFormatter');
const { saveTasks} = require('./fileStorage');
const eventLogger = require('./eventLogger');

const taskList = [];

const addTask = (list) => {
    list.forEach((title) => {
        const id = taskList.length + 1;
        const createdAt = new Date().toISOString();

        const newTask = {
            id: taskList.length + 1,
            title,
            completed: false,
            createdAt,
            hash: createHash(id, title, createdAt),
        };

        taskList.push(newTask);

        eventLogger.emit('taskCreated', title);
        console.log(formatTask(newTask));
    });

    saveTasks(taskList);
};

const getTasks = () => {
    taskList.map(task => {
        console.log(formatTask(task));
    });

    return taskList;
}

const completeTask = (id) => {
    const task = taskList.find((task) => task.id === id);

    if (!task) {
        console.log(`Task with id ${id} not found.`);
        return null;
    }

    task.completed = true;

    eventLogger.emit('taskCompleted', task.title);
    console.log(formatTask(task), 'завершено');
    saveTasks(taskList);

    return task;
}

const deleteTask = (id) => {
    const index = taskList.findIndex(task => task.id === id);

    if (index === -1) {
        console.log(`Task with id ${id} not found.`);
        return null;
    }

    const deletedTask = taskList.splice(index, 1)[0];

    eventLogger.emit('taskDeleted', deletedTask.title);
    console.log(formatTask(deletedTask), 'видалено');
    saveTasks(taskList);

    return deletedTask;
}


module.exports = {
    addTask,
    getTasks,
    completeTask,
    deleteTask
}
