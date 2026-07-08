const { addTask } = require('./modules/taskService.js');

const { initStorage, saveTasks, readTasks } = require('./modules/fileStorage.js');

const tasks = ['Learn Node.js modules ', 'Practice fs module', 'Practice functions'];

const newTasks = tasks.map(addTask);

initStorage();
saveTasks(newTasks);
readTasks();
