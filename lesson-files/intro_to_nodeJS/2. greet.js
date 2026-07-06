// Читання параметрів із командного рядка
const name = process.argv[2]; // Отримуємо перший аргумент
console.log(`Привіт, ${name || 'Користувач'}!`);
console.log(process.argv)