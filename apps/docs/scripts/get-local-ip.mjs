import { networkInterfaces } from 'node:os';

function getLocalIp() {
  const nets = networkInterfaces();
  const fallback = '127.0.0.1';
  const privateRanges = [/^192\.168\./];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (
        net.family === 'IPv4' &&
        !net.internal &&
        privateRanges.some((r) => r.test(net.address))
      ) {
        return net.address;
      }
    }
  }

  return fallback;
}

console.log(getLocalIp());
