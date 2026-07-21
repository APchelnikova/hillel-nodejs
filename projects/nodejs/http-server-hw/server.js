const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use(express.json());

app.use(express.static('public'));

app.use((request, response, next) => {
    const { method, url } = request;
    const timestamp = new Date().toLocaleString('uk-UA');

    console.log(`${method} ${url} ${timestamp}`);
    next();
});

app.get("/", (request, response) =>{
    response.send('Головна сторінка. Код 200 — успіх.');
});

app.get("/about", (request, response) => {
    response.send('Сторінка "Про нас".');
});

app.get("/time", (request, response) => {
    response.send('Поточний час: ' + new Date().toLocaleString('uk-UA'));
});

app.get("/error", (request, response) => {
    response.send('Помилка сервера. Код 500.');
});

app.get("/user/:id",  (request, response) => {
    response.send('user ' + request.params.id);
});

app.get("/search", (request, response) => {
    if (!request.query.q) {
        return response.status(400).send('Не вказано пошуковий запит');
    }

    response.send('Ви шукали:' + request.query.q);
});

app.get("/crash", (req, res) => {
    throw new Error('Тестова помилка');
});

app.post("/feedback", (request, response) => {
    const { name, message } = request.body;

    if(!name) {
        return response.status(400).send('Поле name є обов\'язковим.');
    }

    response.send(`Дякуємо, ${name}! Ваш відгук отримано.`);
});

app.get("/user/:id/orders", (request, response) => {
    const { id } = request.params;
    const { status } = request.query;

    response.send(`Замовлення користувача: ${id} зі статусом: ${status}`);
});

app.get("/profile", (request, response) => {
    response.render('profile', {
        name: 'Ваше ім\'я',
        role: 'Студент курсу Node.js',
        isOnline: true,
        hobbies: ['хобі 1', 'хобі 2', 'хобі 3']
    });
});

app.get("/students", (request, response) => {
    const students = [
        { name: 'Оля', level: 'junior' },
        { name: 'Максим', level: 'middle' },
        { name: 'Ірина', level: 'senior' }
    ];

    response.render('students', { students });
});

app.use((request, response) => {
    response.status(404).render('not-found', {
        url: request.url
    });
});

app.use((error, request, response, next) => {
    response.status(500).send('Щось пішло не так!');
});

app.listen(3000);
