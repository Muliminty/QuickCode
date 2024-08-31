const si = require('systeminformation');

si.cpuTemperature()
  .then(data => {
    console.log(`当前 CPU 温度: ${data.main}°C`);
    console.log(`最大 CPU 温度: ${data.max}°C`);
    console.log(`各核心 CPU 温度: ${data.cores.join('°C, ')}°C`);
  })
  .catch(error => console.error(error));
``