const http = require('http');
const eventLogger = require('./modules/eventLogger');
const { readTasks, saveTasks, initStorage} = require('./modules/fileStorage');
const {createHash} = require("./modules/taskFormatter");

initStorage();

const sendJson = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

const handleHome = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    res.end('<h1>Study Task Tracker API</h1>');
};

const server = http.createServer((req, res) => {
    const { method, url } = req;
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const status = parsedUrl.searchParams.get('status');
    const tasks = readTasks();

    if (url === '/') {
        return handleHome(req, res);
    }

    // GET /tasks
    if (method === 'GET' && url === '/tasks') {
        return sendJson(res, 200, tasks);
    }

    // GET /tasks?status
    if (method === 'GET' && url.startsWith('/tasks?status=')) {
        let result = [];

        if (status === 'completed') {
            result = tasks.filter(task => task.completed);
        }

        if (status === 'active') {
            result = tasks.filter(task => !task.completed);
        }

        return sendJson(res, 200, result);
    }

    // GET /tasks/:id
    if (method === 'GET' && url.startsWith('/tasks/')) {
        const id = Number(url.split('/')[2]);
        const task = tasks.find(task => task.id === id);

        if (!task) {
            return sendJson(res, 404, { message: 'Task not found' });
        }

        return sendJson(res, 200, task);
    }

    //POST /tasks
    if (method === 'POST' && url === '/tasks') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const title = data.title;
                const id = tasks.length + 1;
                const createdAt = new Date().toISOString();

                if (!title) {
                    return sendJson(res, 400, { message: 'Title is required' });
                }

                const newTask = {
                    id,
                    title,
                    completed: false,
                    hash: createHash(id, title, createdAt),
                };

                tasks.push(newTask);
                saveTasks(tasks);
                eventLogger.emit('taskCreated', title);

                sendJson(res, 201, newTask);
            } catch (err) {
                return sendJson(res, 400, {
                    message: 'Invalid JSON',
                });
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Сервер працює на порту 3000');
});