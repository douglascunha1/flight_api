import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { routes } from './routes/routes.js';
import { logger } from 'hono/logger';

const app = new Hono();

app.use(
  logger((str, c) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${str}`);
  })
);

routes(app);

serve(app);
