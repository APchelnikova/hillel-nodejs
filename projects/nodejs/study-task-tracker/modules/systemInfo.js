const os = require('os');

const systemInfo = () => {
    console.log('Операційна система:', os.platform());
    console.log('Вільна пам\'ять:', os.freemem());
    console.log('Час роботи системи (секунди):', os.uptime());
    console.log('Інформація про процесори:', os.cpus());
}

module.exports = {
    systemInfo,
};