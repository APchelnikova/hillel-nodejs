const {
    addTask,
    getTasks,
    deleteTask,
    completeTask,
} = require('./modules/taskService.js');
const {
    initStorage,
    saveTasks,
    readTasks,
} = require('./modules/fileStorage.js');
const eventLogger = require('./modules/eventLogger');
const { systemInfo } = require('./modules/systemInfo');

eventLogger.emit('appStarted');

systemInfo();
initStorage();

const tasks = ['Learn Node.js modules ', 'Practice fs module', 'Practice functions'];
const randomIndex = Math.floor(Math.random() * tasks?.length + 1);

addTask(tasks);
completeTask(randomIndex);
deleteTask(randomIndex);
readTasks();
