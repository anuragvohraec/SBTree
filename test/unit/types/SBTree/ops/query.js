const {expect} = require('chai');
const query = require('../../../../../src/types/SBTree/ops/query');

const fixtures = {
  documents: {
    '5d6ebb7e21f1df6ff7482631': {
      "age": 33,
      "name": "Devan",
      "email": "Devan@Prohaska.com",
      "address":{
        "country":'Russia'
      },
      "_id": "5d6ebb7e21f1df6ff7482631"
    }
  }
};

const calledFn = [];

const fakeSelf = {
  getDocument: (docId) => fixtures.documents[docId],
  getFieldTree: (fieldName) => {
    return {
      find: (key, operator) => {
        calledFn.push([fieldName, 'find', key, operator]);
        return {identifiers:['5d6ebb7e21f1df6ff7482631'],keys:[33]}
      }
    }
  }
};

describe('SBTree - ops - query', () => {
  it('should detect strict operators', async function () {
    const res = await query.call(fakeSelf, {age: 33});
    expect(calledFn[0]).to.deep.equal(['age','find',33, '$eq']);
  });
  it('should detect other operators', async function () {
    const res2 = await query.call(fakeSelf, {age: {$gte:33, $lte:50}});
    expect(calledFn[1]).to.deep.equal(['age','find',33, '$gte']);
    expect(calledFn[2]).to.deep.equal(['age','find',50, '$lte']);
  });
  it('should detect nested object', async function () {
    //TODO
    // const res3 = await query.call(fakeSelf, {address: {country:{$in:['France', 'Russia']}}});

  });
});
