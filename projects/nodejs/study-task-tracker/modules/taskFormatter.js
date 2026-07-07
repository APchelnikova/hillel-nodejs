const formatTask = (task) => {
    if (!task) {
        return;
    }

    const { id, title, completed } = task;
    const status  = completed ? 'completed' : 'in progress';

    return `[${id}] ${title} — ${status}`;
}

module.exports = { formatTask };