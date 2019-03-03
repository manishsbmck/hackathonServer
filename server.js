const hapi = require('hapi');
const { spawn } = require('child_process');

const server = hapi.server({
  host: 'localhost',
  port: 8080,
});

const handlerFn = (req, h) => {
  const process = spawn('python', ['./test.py']);
  return process.stdout.on('data', (data) => {
    h.response(data.toString());
  });
};

server.route([{
  path: '/pythonTest',
  method: 'GET',
  handler: handlerFn,
}]);


const init = () => {
  server.start();
};

init();

module.exports = server;
