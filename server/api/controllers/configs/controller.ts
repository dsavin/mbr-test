import ConfigsService from '../../services/configs.service';
import { Request, Response } from 'express';

export class Controller {
  create(req: Request, res: Response): void {
    ConfigsService.createAll(req.body).then(r => res.json(r))
  }
}
export default new Controller();
