const express = require('express');
const { URL } = require('url');

const app = express();
const PORT = process.env.PROXY_PORT || 8080;

// Cabeçalhos que o servidor de origem costuma exigir
const FORWARD_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://embedcanais.com/',
  'Origin': 'https://embedcanais.com',
  'Accept': '*/*',
  'Accept-Language': 'en-US,en;q=0.9,pt-BR;q=0.8',
  'Connection': 'keep-alive',
};

// Permitir CORS (conveniência)
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Utilitário: baixa como texto (m3u8) ou binário (segmentos)
async function proxyFetch(res, targetUrl, asBinary = false) {
  const resp = await fetch(targetUrl, {
    redirect: 'follow',
    headers: FORWARD_HEADERS,
  });

  if (!resp.ok) {
    res.status(resp.status).send(`Upstream error ${resp.status}`);
    return;
  }

  // Copiar alguns cabeçalhos úteis
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

// Resolve URL relativa em relação à base
function resolveUrl(base, maybeRelative) {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return maybeRelative;
  }
}

// Reescreve o playlist m3u8: torna URLs absolutas e roteia segmentos pelo proxy
function rewriteM3U8(content, baseUrl, selfOrigin) {
  const lines = content.split('\n');
  const out = [];

  for (let line of lines) {
    const trimmed = line.trim();

    // Linhas de comentário/diretiva ficam como estão
    if (!trimmed || trimmed.startsWith('#')) {
      out.push(line);
      continue;
    }

    // É uma URI (playlist variante ou segmento)
    const absolute = resolveUrl(baseUrl, trimmed);

    // Roteamos TUDO pelo /seg (binário) exceto quando for outro m3u8 (roteamos pelo /hls)
    if (absolute.endsWith('.m3u8')) {
      const proxied = `${selfOrigin}/hls?url=${encodeURIComponent(absolute)}`;
      out.push(proxied);
    } else {
      const proxied = `${selfOrigin}/seg?url=${encodeURIComponent(absolute)}`;
      out.push(proxied);
    }
  }

  return out.join('\n');
}

// Endpoint para playlists (.m3u8)
app.get('/hls', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('missing url');

  try {
    const upstream = await fetch(target, {
      redirect: 'follow',
      headers: FORWARD_HEADERS,
    });

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
    res.status(500).send(`Proxy error: ${e.message}`);
  }
});

// Endpoint para segmentos (.ts/.m4s/etc.)
app.get('/seg', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('missing url');
  try {
    await proxyFetch(res, target, true);
  } catch (e) {
    res.status(500).send(`Proxy error: ${e.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`HLS proxy on http://127.0.0.1:${PORT}`);
});
