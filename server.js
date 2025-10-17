const { serveHTTP } = require('stremio-addon-sdk');
const addonInterface = require('./index');

const PORT = process.env.PORT || 7000;
serveHTTP(addonInterface, { port: PORT });

console.log(`Add-on rodando em: http://127.0.0.1:${PORT}/manifest.json`);
