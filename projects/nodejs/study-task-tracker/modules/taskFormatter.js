const crypto = require('crypto');

const formatTask = (task) => {
    if (!task) {
        return;
    }

    const { id, title, completed } = task;
    const status  = completed ? 'completed' : 'in progress';

    return `[${id}] ${title} — ${status}`;
}

const formatLog = (event, message) => {
    return `${new Date().toISOString()} | ${event} | ${message}\n`;
};

const createHash = (id, title, createdAt) => {
   return crypto
        .createHash('sha256')
        .update(`${id}-${title}-${createdAt}`)
        .digest('hex')
}

module.exports = { formatTask, createHash, formatLog };