const express = require('express');
const app = express();


app.get("/", (request, response) => {
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

app.get("/user/:id", (request, response) => {
    response.send('user ' + request.params.id);
});

app.get("/search", (request, response) => {
    if (!request.query.q) {
        return response.status(400).send('Не вказано пошуковий запит');
    }

    response.send('Ви шукали:' + request.query.q);
});

app.get("/user/:id/orders", (request, response) => {
    const { id } = request.params;
    const { status } = request.query;

    response.send(`Замовлення користувача: ${id} зі статусом: ${status}`);
});

app.get("/{*any}", (request, response) => {
    response.send('Сторінку не знайдено. Код 404.');
});

app.listen(3000);
