// const Glue = require('glue');
// const manifest = {
//   server: {},
//   connections: [
//     { port: 1337, host: '127.0.0.1' }
//   ],
//   plugins: [
//     { 'hello': { path: './plugins/hello.js'} },
//     { 'blipp': {} }
//   ]
// };
//
// Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
//   server.start((err) => {
//     console.log(`Server running at ${server.info.uri}`);
//   });
// });

//can use rejoice as well

const manifest = {
  server: {},
  connections: [
    { port: 5000, host: '127.0.0.1' }
  ],
  registrations: [
    {plugin : './plugins/hello.js',options:{}},
    { plugin:'blip',options: {} }
  ]
};
module.exports = manifest;
