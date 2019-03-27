import Promise from 'bluebird';
import L from '../../common/logger'

interface Config {
  id: string,
  rules: [
    {
      key: string,
      value: string,
      behavior: string
    }
    ]
}

const configs: Config[] = [];

export class ConfigsService {
  createAll(campaigns): Promise<Config[]> {
    campaigns.forEach(campaign => {
      L.info(`create config with id ${campaign.id}`);
      const config: Config = {
        id: campaign.id,
        rules: campaign.rules
      };
      configs.push(config);
    });
    return Promise.resolve(configs);
  }

  all(): Promise<Config[]> {
    L.info(configs, 'fetch all configs');
    return Promise.resolve(configs);
  }
}

export default new ConfigsService();