const EventEmitter = require('events');
const { writeLog } = require('./fileStorage');

const eventLogger = new EventEmitter();

eventLogger.on('taskCreated', (taskName) => {
    writeLog('taskCreated', `Task "${taskName}" was created`)
});

eventLogger.on('taskCompleted', (taskName) => {
    writeLog('taskCompleted', `Task "${taskName}" was completed`)
});

eventLogger.on('taskDeleted', (taskName) => {
    writeLog('taskDeleted', `Task "${taskName}" was deleted`)

});

eventLogger.on('appStarted', () => {
    writeLog('appStarted', 'app started')
});

module.exports = eventLogger;