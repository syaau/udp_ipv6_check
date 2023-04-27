import dgram from 'dgram';

const sock = dgram.createSocket('udp4');


sock.on('error', (err) => {
  console.error('server error', err);
  sock.close();
})

sock.on('message', (msg, rinfo) => {
  console.log('Rx', msg, rinfo);
});

sock.on('listening', () => {
  const address = sock.address();
  console.log(`Server listening ${address.address}:${address.port}`);
});

sock.bind(3000);
