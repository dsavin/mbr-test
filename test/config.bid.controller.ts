import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

const testCampaigns = [
  {
    id: 'campaign1',
    rules: [
      {key: 'a', value: 'a1', behavior: 'match'},
      {key: 'b', value: 'b1', behavior: 'boost'}
    ]
  },
  {
    id: 'campaign2',
    rules: [
      {key: 'c', value: 'c1', behavior: 'match'}
    ]
  }
];

describe('Config And Bids', () => {
  it('should check empty config', () =>
    request(Server)
      .get('/api/v1/bid')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .to.eql([]);
      }));

  it('should add new configs', () =>
    request(Server)
      .post('/api/v1/config')
      .send(testCampaigns)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .to.deep.equal(testCampaigns);
      }));

  it('return first campaign with 0 boosted', () =>
    request(Server)
      .get('/api/v1/bid?a=a1')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .to.deep.equal([{id: 'campaign1', boosted: 0}]);
      }));

  it('return first campaign with 1 boosted', () =>
    request(Server)
      .get('/api/v1/bid?a=a1&b=b1')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .to.deep.equal([{id: 'campaign1', boosted: 1}]);
      }));

  it('return second campaign with 0 boosted', () =>
    request(Server)
      .get('/api/v1/bid?c=c1&b=b1')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .to.deep.equal([{id: 'campaign2', boosted: 0}]);
      }));

  it('return both campaigns with 0 boosted', () =>
    request(Server)
      .get('/api/v1/bid?a=a1&c=c1')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .to.deep.equal([{id: 'campaign1', boosted: 0}, {id: 'campaign2', boosted: 0}]);
      }));

});
