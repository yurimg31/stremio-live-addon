const { addonBuilder } = require('stremio-addon-sdk');
const channels = require('./channels');

const manifest = {
  id: 'org.meuaddon.live',
  version: '1.0.0',
  name: 'Canais Ney vs Fadas Sensatas',
  description: 'Coleção de canais ao vivo 24h',
  logo: 'https://i.ibb.co/ynmbqwYc/neyfadas.png',
  resources: ['catalog', 'stream'],
  types: ['tv'],
  catalogs: [
    {
      type: 'tv',
      id: 'live-channels',
      name: 'Canais ao vivo'
    }
  ],
  idPrefixes: ['live:']
};

const builder = new addonBuilder(manifest);

// catálogo
builder.defineCatalogHandler(({ type, id }) => {
  if (type !== 'tv' || id !== 'live-channels') return { metas: [] };
  const metas = channels.map(ch => ({
    id: ch.id,
    type: 'tv',
    name: ch.name,
    poster: ch.logo || null,
    posterShape: 'landscape',
    description: 'Transmissão ao vivo 24h'
  }));
  return Promise.resolve({ metas });
});

// streams
builder.defineStreamHandler(({ id }) => {
  const ch = channels.find(c => c.id === id);
  if (!ch) return Promise.resolve({ streams: [] });
  return Promise.resolve({
    streams: [{ title: ch.name, url: ch.url }]
  });
});

// EXPORTAÇÃO CORRETA:
module.exports = builder.getInterface();