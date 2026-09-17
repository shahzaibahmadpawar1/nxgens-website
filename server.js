/**
 * cPanel / CloudLinux Passenger startup file.
 * Application startup file must be: server.js
 *
 * After deploy: Run NPM Install → npm run build → Restart
 */
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const isPassenger = typeof PhusionPassenger !== 'undefined';

if (isPassenger) {
  PhusionPassenger.configure({ autoInstall: false });
}

const port = process.env.PORT || 3000;
const app = next({
  dev: false,
  dir: __dirname,
});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    if (isPassenger) {
      server.listen('passenger', () => {
        console.log('Next.js ready (Passenger)');
      });
    } else {
      server.listen(port, () => {
        console.log(`Next.js ready on port ${port}`);
      });
    }
  })
  .catch((err) => {
    console.error('Failed to start Next.js server:', err);
    process.exit(1);
  });
