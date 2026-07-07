const {
    addTask,
    completeTask,
    getTasks,
    deleteTask
} = require('./modules/taskService.js');

const newTasks = ['Learn Node.js modules ', 'Practice fs module', 'Practice functions'];

const randomIndex = Math.floor(Math.random() * newTasks?.length);

newTasks.forEach(addTask);
getTasks();
completeTask(randomIndex);
deleteTask(randomIndex);
getTasks();

