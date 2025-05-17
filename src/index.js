import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { routes } from './routes/routes.js';

const app = new Hono();

routes(app);

serve(app);