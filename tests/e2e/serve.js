import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('../../', import.meta.url).pathname.replace(/^\/([a-zA-Z]:)/, '$1');
const port = process.env.PORT || 45678;

const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.850': 'text/plain',
  '.ico': 'image/x-icon',
};

createServer(async (req, res) => {
  const path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const filePath = normalize(join(root, decodeURIComponent(path)));

  if (!filePath.startsWith(normalize(root))) {
    res.writeHead(403);
    res.end();
    return;
  }

  try {
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': types[extname(filePath)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
});
