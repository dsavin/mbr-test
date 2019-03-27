import ConfigsService from '../../services/configs.service';
import { Request, Response } from 'express';

export class Controller {
  check(req: Request, res: Response): void {
    ConfigsService.all().then(r => {
      let response = [];
      if (r.length > 0) {
        r.forEach(campaign => {
          // @ts-ignore
          if (campaign.rules.length === 0) {
            response.push({ id: campaign.id, boosted: 0 })
          } else {
            let rules = {match: 0, boost: 0};
            let bids = {match: 0, boost: 0};
            campaign.rules.forEach(rule => {
              ++rules[rule.behavior];
              for (let key in req.query) {
                if (key === rule.key && req.query[key] === rule.value) ++bids[rule.behavior]
              }
            })
            if (rules.match === bids.match) {
              response.push({ id: campaign.id, boosted: bids.boost })
            }
          }
        })
      }
      res.json(response);
    })
  }
}
export default new Controller();
