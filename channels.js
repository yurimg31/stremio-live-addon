const PROXY = 'https://stremio-proxy-0ws0.onrender.com/hls?url=';

module.exports = [
  {
    id: 'live:espn',
    name: 'ESPN (ao vivo)',
    logo: 'https://embedcanais.com/images/espn.png',
    //url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/espn/index.m3u8')
    url: PROXY + encodeURIComponent('https://embedcanais.canaistv.site/espn/index.m3u8')
  },

  // adicione um canal de teste público (funciona sempre)
  {
    id: 'live:shaka',
    name: 'Shaka Demo (teste público)',
    logo: 'https://storage.googleapis.com/shaka-demo-assets/77.jpg',
    //url: PROXY + encodeURIComponent('https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8')
    url: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8'

  },

   {
    id: 'live:cazetv',
    name: 'Caze TV (ao vivo)',
    logo: 'https://embedcanais.com/images/cazetv.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/cazetv/index.m3u8')
  },

  {
    id: 'live:primevideo',
    name: 'Amazon Prime Video (ao vivo)',
    logo: 'https://embedcanais.com/images/amazonprimevideo.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/amazonprimevideo/index.m3u8')
  },

  {
    id: 'live:combate',
    name: 'Combate (ao vivo)',
    logo: 'https://embedcanais.com/images/combate.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/combate/index.m3u8')
  },

  {
    id: 'live:dazn',
    name: 'DAZN (ao vivo)',
    logo: 'https://embedcanais.com/images/dazn.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/dazn/index.m3u8')
  },

  {
    id: 'live:espn2',
    name: 'ESPN2 (ao vivo)',
    logo: 'https://embedcanais.com/images/espn.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/espn2/index.m3u8')
  },

  {
    id: 'live:espn3',
    name: 'ESPN3 (ao vivo)',
    logo: 'https://embedcanais.com/images/espn.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/espn3/index.m3u8')
  },

  {
    id: 'live:espn4',
    name: 'ESPN4 (ao vivo)',
    logo: 'https://embedcanais.com/images/espn.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/espn4/index.m3u8')
  },

  {
    id: 'live:espn5',
    name: 'ESPN5 (ao vivo)',
    logo: 'https://embedcanais.com/images/espn.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/espn5/index.m3u8')
  },

  {
    id: 'live:espn6',
    name: 'ESPN6 (ao vivo)',
    logo: 'https://embedcanais.com/images/espn.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/espn6/index.m3u8')
  },

  {
    id: 'live:nsports',
    name: 'N Sports (ao vivo)',
    logo: 'https://embedcanais.com/images/nsports.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/nsports/index.m3u8')
  },

  {
    id: 'live:premiereclubes',
    name: 'Premiere Clubes (ao vivo)',
    logo: 'https://embedcanais.com/images/premiere.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/premiereclubes/index.m3u8')
  },

  {
    id: 'live:premiere2',
    name: 'Premiere 2 (ao vivo)',
    logo: 'https://embedcanais.com/images/premiere.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/premiere2/index.m3u8')
  },

   {
    id: 'live:premiere3',
    name: 'Premiere 3 (ao vivo)',
    logo: 'https://embedcanais.com/images/premiere.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/premiere3/index.m3u8')
  },

   {
    id: 'live:premiere4',
    name: 'Premiere 4 (ao vivo)',
    logo: 'https://embedcanais.com/images/premiere.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/premiere4/index.m3u8')
  },

   {
    id: 'live:premiere5',
    name: 'Premiere 5 (ao vivo)',
    logo: 'https://embedcanais.com/images/premiere.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/premiere5/index.m3u8')
  },

 {
    id: 'live:premiere6',
    name: 'Premiere 6 (ao vivo)',
    logo: 'https://embedcanais.com/images/premiere.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/premiere6/index.m3u8')
  },

   {
    id: 'live:premiere7',
    name: 'Premiere 7 (ao vivo)',
    logo: 'https://embedcanais.com/images/premiere.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/premiere7/index.m3u8')
  },

   {
    id: 'live:premiere8',
    name: 'Premiere 8 (ao vivo)',
    logo: 'https://embedcanais.com/images/premiere.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/premiere8/index.m3u8')
  },

  {
    id: 'live:sportv',
    name: 'Sportv (ao vivo)',
    logo: 'https://embedcanais.com/images/sportv.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/sportv/index.m3u8')
  },

  {
    id: 'live:sportv2',
    name: 'Sportv 2 (ao vivo)',
    logo: 'https://embedcanais.com/images/sportv.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/sportv2/index.m3u8')
  },

  {
    id: 'live:sportv3',
    name: 'Sportv 3 (ao vivo)',
    logo: 'https://embedcanais.com/images/sportv.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/sportv3/index.m3u8')
  },

  {
    id: 'live:ufcfightpass',
    name: 'UFC Fight Pass (ao vivo)',
    logo: 'https://embedcanais.com/images/ufcfightpass.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/ufcfightpass/index.m3u8')
  },

  {
    id: 'live:xsports',
    name: 'X SPORTS (ao vivo)',
    logo: 'https://embedcanais.com/images/xsports.png',
    url: 'http://127.0.0.1:8080/hls?url=' + encodeURIComponent('https://embedcanais.canaistv.site/xsports/index.m3u8')
  }
];
