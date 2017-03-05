// const Code = require('code');
// const Lab = require('lab');
// const lab = exports.lab = Lab.script();
// lab.experiment('Testing example', () => {
//   lab.test('fails here', (done) => {
//     Code.expect(false).to.be.true();
//       return done();
//   });
//   lab.test('passes here', (done) => {
//     Code.expect(true).to.be.true();
//     return done();
//   });
// });

const Code = require('code');
const Lab = require('lab');
const Hapi = require('hapi');
const lab = exports.lab = Lab.script();
lab.test('It will return Hello World', (done) => {
  const server = new Hapi.Server();
  server.connection();
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      return reply('Hello World\n');
    }
  });
  server.inject('/', (res) => {
    Code.expect(res.statusCode).to.equal(200);
    Code.expect(res.result).to.equal('Hello World\n');
    done();
  });
});
