import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import morgan from 'morgan';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine({enablePerformanceProfiler: true});

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  
  // Middlewares
  server.use(morgan(':method :url :status :res[content-length] B - :response-time ms'));

  // Example Express Rest API endpoints
  // server.all('/api/**', (req, res) => { });

  // Serve static files from /browser folder
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Serve index.html file for CSR routes
  server.get(['/', '/csr', '/csr/**'], (req, res) => res.sendFile(indexHtml));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        inlineCriticalCss: false
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
