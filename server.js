const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

console.log(`Starting Shradhanjali Next.js application on ${hostname}:${port}...`);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error handling request:', req.url, err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });

    server.once('error', (err) => {
      console.error('Server startup error:', err);
      process.exit(1);
    });

    server.listen(port, hostname, () => {
      console.log(`> Shradhanjali production server ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error('Fatal error preparing Next.js application:', err);
    process.exit(1);
  });
