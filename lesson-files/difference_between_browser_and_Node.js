// Глобальний об’єкт

console.log(window); // Глобальний об'єкт браузера

console.log(global); // Глобальний об'єкт Node.js

// Приклад
// Браузер
console.log(window.alert); // Є функція alert
console.log(global); // Undefined

// Node.js
console.log(global.setTimeout); // Є функція setTimeout
console.log(window); // ReferenceError: window is not defined

// ------------------------------------------------------------------
// Доступ до DOM

// Браузер
document.querySelector('h1').textContent = 'Привіт, Світ!';

// Браузер
console.log(document.body); // Доступ до елементів DOM

// Node.js
console.log(document); // ReferenceError: document is not defined

// ------------------------------------------------------------------
//Доступ до файлової системи

// У браузері ви не можете безпосередньо читати чи писати файли на диску користувача через обмеження безпеки.
// - У Node.js є модуль fs для роботи з файлами.

const fs = require('fs');
const data = fs.readFileSync('example.txt', 'utf8');
console.log(data);

//Приклад:

// Node.js: Читання файлу
const fs = require('fs');
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
// ------------------------------------------------------------------
// Мережеві запити

// Браузер
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data));

// Node.js
const https = require('https');

https.get('https://api.example.com/data', res => {
    res.on('data', chunk => {
        console.log(chunk.toString());
    });
});

// ------------------------------------------------------------------
// Асинхронність

// І браузер, і Node.js підтримують асинхронні операції через Promises та async/await.

// Асинхронний таймер
setTimeout(() => {
    console.log('Пройшло 2 секунди');
}, 2000);
// ------------------------------------------------------------------
// Модулі

// Браузер
import { greet } from './greet.js';
greet('Світ');

// Node.js
const greet = require('./greet');
greet('Світ');
