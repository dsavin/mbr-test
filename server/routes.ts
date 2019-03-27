import { Application } from 'express';
import configsRouter from './api/controllers/configs/router'
import bidsRouter from './api/controllers/bids/router'
export default function routes(app: Application): void {
  app.use('/api/v1/config', configsRouter);
  app.use('/api/v1/bid', bidsRouter);
};
