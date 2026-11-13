import http from 'node:http';
import { createHash } from 'node:crypto';

const fingerprint = (value) =>
  value ? createHash('sha256').update(value).digest('hex').slice(0, 8) : null;

const report = {
  environment: process.env.RAILWAY_ENVIRONMENT_NAME ?? null,
  databaseUrl: fingerprint(process.env.DATABASE_URL),
  sessionSecret: fingerprint(process.env.SESSION_SECRET)
};

http
  .createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(report));
  })
  .listen(process.env.PORT || 3000);
