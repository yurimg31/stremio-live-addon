// proxy.js — versão com headers dinâmicos, logs e reescrita completa (HLS + URI="...")
const express = require('express');
const { URL } = require('url');

const app = express();
// No Render, ele injeta PORT; localmente pode usar PROXY_PORT
const PORT = process.env.PORT || process.env.PROXY_PORT || 8080;

// Ajuste a origem do referer de acordo com o site que gerou o m3u8
// Você pode mudar no Render (Settings > Environment): REFERER_BASE=https://futemax.wales/
const REFERER_BASE = process.env.REFERER_BASE || 'https://futemax.wales/';

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

function buildHeaders(targetUrl) {
  const u = new URL(targetUrl);
  return {
    // finge ser navegador moderno
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    // MUITO IMPORTANTE: Host do destino e Referer/Origin coerentes
    'Host': u.host,
    'Referer': REFERER_BASE,
    'Origin': REFERER_BASE.replace(/\/$/, ''),
    // cabeçalhos comuns
    'Accept': '*/*',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8',
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site'
  };
}

async function proxyFetch(res, targetUrl, asBinary = false) {
  const headers = buildHeaders(targetUrl);
  const resp = await fetch(targetUrl, { redirect: 'follow', headers });
  if (!resp.ok) {
    console.log('[SEG] upstream status', resp.status, '->', targetUrl);
    res.status(resp.status).send(`Upstream error ${resp.status}`);
    return;
  }
  const ct = resp.headers.get('content-type') || '';
  res.setHeader('Content-Type', ct);
  res.setHeader('Cache-Control', 'no-cache');

  if (asBinary) {
    const buf = Buffer.from(await resp.arrayBuffer());
    res.end(buf);
  } else {
    const text = await resp.text();
    res.send(text);
  }
}

// Resolve URL relativa
function resolveUrl(base, maybeRelative) {
  try { return new URL(maybeRelative, base).toString(); }
  catch { return maybeRelative; }
}

// Reescreve playlist: trata URIs em linhas e também atributos URI="..."
function rewriteM3U8(content, baseUrl, selfOrigin) {
  const lines = content.split('\n');
  const out = [];

  for (let line of lines) {
    const trimmed = line.trim();

    // 1) Diretivas com URI="..." (áudio/legendas/iframe-variant)
    if (trimmed.startsWith('#') && /URI="([^"]+)"/i.test(line)) {
      line = line.replace(/URI="([^"]+)"/gi, (_, u) => {
        const absolute = resolveUrl(baseUrl, u);
        const isM3U8 = absolute.toLowerCase().includes('.m3u8');
        const proxied = isM3U8
          ? `${selfOrigin}/hls?url=${encodeURIComponent(absolute)}`
          : `${selfOrigin}/seg?url=${encodeURIComponent(absolute)}`;
        return `URI="${proxied}"`;
      });
      out.push(line);
      continue;
    }

    // 2) Comentários/diretivas sem URI -> mantém
    if (!trimmed || trimmed.startsWith('#')) {
      out.push(line);
      continue;
    }

    // 3) Linhas de URI (playlist variante ou segmento)
    const absolute = resolveUrl(baseUrl, trimmed);
    const isM3U8 = absolute.toLowerCase().includes('.m3u8');
    const proxied = isM3U8
      ? `${selfOrigin}/hls?url=${encodeURIComponent(absolute)}`
      : `${selfOrigin}/seg?url=${encodeURIComponent(absolute)}`;
    out.push(proxied);
  }

  return out.join('\n');
}

// Endpoint para playlists (.m3u8)
app.get('/hls', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('missing url');
  console.log('[HLS] ->', target);

  try {
    const upstream = await fetch(target, { redirect: 'follow', headers: buildHeaders(target) });
    console.log('[HLS] status', upstream.status);
    if (!upstream.ok) {
      return res.status(upstream.status).send(`Upstream error ${upstream.status}`);
    }

    const baseUrl = new URL(target).toString();
    const text = await upstream.text();

    const selfOrigin = `${req.protocol}://${req.get('host')}`;
    const rewritten = rewriteM3U8(text, baseUrl, selfOrigin);

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(rewritten);
  } catch (e) {
    console.log('[HLS] error', e.message);
    res.status(500).send(`Proxy error: ${e.message}`);
  }
});

// Endpoint para segmentos (.ts/.m4s/…)
app.get('/seg', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('missing url');
  try {
    await proxyFetch(res, target, true);
  } catch (e) {
    console.log('[SEG] error', e.message);
    res.status(500).send(`Proxy error: ${e.message}`);
  }
});

app.get('/', (_, res) => res.send('OK')); // conveniência

app.listen(PORT, () => {
  console.log(`HLS proxy on http://127.0.0.1:${PORT} (REFERER_BASE=${REFERER_BASE})`);
});
