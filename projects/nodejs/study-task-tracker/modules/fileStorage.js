const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const filePath = path.join(dataDir, 'tasks.json');

const saveTasks = (tasks) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
        console.log('Файл успішно записано!');
    } catch (err) {
        console.error('Помилка запису файлу:', err);
    }
}

const readTasks = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log('Вміст файлу:', data);
    } catch (err) {
        console.error('Помилка читання файлу:', err);
    }
}

const initStorage = () => {
    if (fs.existsSync(dataDir)) {
        console.log('Папка вже існує.');
    } else {
        fs.mkdirSync(dataDir);
        console.log('Папка успішно створена!');
    }

    if (fs.existsSync(filePath)) {
        console.log('Файл вже існує.');
    } else {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2));
        console.log('Файл успішно створено!');
    }
}

module.exports = {
    initStorage,
    saveTasks,
    readTasks
}
