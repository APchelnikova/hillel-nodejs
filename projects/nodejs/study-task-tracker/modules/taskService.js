const { formatTask } = require("./taskFormatter");
const taskList = [];

const addTask = (title) => {
    const newTask = {
        id: taskList?.length + 1,
        title,
        completed: false,
        createdAt: new Date(),
    };

    taskList.push(newTask);

    console.log(formatTask(newTask));

    return newTask;
}

const getTasks = () => {
    taskList.map(task => {
        console.log(formatTask(task));
    });

    return taskList;
}

const completeTask = (id) => {
    const task = taskList.find(task => task.id === id);

    if (task) {
        task.completed = true;
    }

    console.log(formatTask(task));

    return task;
}

const deleteTask = (id) => {
    const index = taskList.findIndex(task => task.id === id);

    if (index === -1) {
        return null;
    }

    const deletedTask = taskList.splice(index, 1)[0];

    console.log(formatTask(deletedTask));

    return deletedTask;
}


module.exports = {
    addTask,
    getTasks,
    completeTask,
    deleteTask
}
