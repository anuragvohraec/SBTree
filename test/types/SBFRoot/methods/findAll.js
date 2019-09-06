const {expect} = require('chai');
const SFBLeaf = require('../../../../src/types/SBFLeaf/SBFLeaf');
const MemoryAdapter = require('../../../../src/adapters/MemoryAdapter/MemoryAdapter');
const findAll = require('../../../../src/types/SBFRoot/methods/findAll');
const fixtures = {
  documents: {
    // '5d6ebb7e21f1df6ff7482631': {
    //   "age": 33,
    //   "name": "Devan",
    //   "email": "Devan@Prohaska.com",
    //   "address":{
    //     "country":'Russia'
    //   },
    //   "_id": "5d6ebb7e21f1df6ff7482631"
    // },
    '5d6ebb7e21f1df6ff7482631':{
      "age": 33,
      "name": "Devan",
      "_id": "5d6ebb7e21f1df6ff7482631"
    },
    '5d6ebb7e21f1df6ff7482621':{
      "age": 17,
      "name": "Silvio",
      "_id": "5d6ebb7e21f1df6ff7482621"
    },
    "5d6ebb7e21f1df6ff7482641":{
      "age": 45,
      "name": "Patricia",
      "_id": "5d6ebb7e21f1df6ff7482641"
    }
  }
};

const calledFn = [];

const adapter = new MemoryAdapter();
adapter.documents = {
  '5d6ebb7e21f1df6ff7482621': {_id: '5d6ebb7e21f1df6ff7482621', age: 17},
  '5d6ebb7e21f1df6ff7482631': {_id: '5d6ebb7e21f1df6ff7482631', age: 33},
  '5d6ebb7e21f1df6ff7482641': {_id: '5d6ebb7e21f1df6ff7482641', age: 45}
};
adapter.addInLeaf('16d075318572b', 'age', '5d6ebb7e21f1df6ff7482621', 17)
adapter.addInLeaf('16d07531858f6', 'age', '5d6ebb7e21f1df6ff7482631', 33)
adapter.addInLeaf('16d07531858f6', 'age', '5d6ebb7e21f1df6ff7482641', 45)
const fakeAgeTreeParent = {
  field:'age',
  getAdapter:()=> adapter,
  find:(key)=>{
    console.log('findkey',key)
  },

};
const fakeSelf = {
  keys:[33],
  childrens:[
    new SFBLeaf({ name: '16d075318572b', type: 'leaf' , parent:fakeAgeTreeParent}),
    new SFBLeaf({ name: '16d07531858f6', type: 'leaf' , parent:fakeAgeTreeParent}),
  ],
};

describe('SBFTree - methods - findAll', () => {
  it('should find all identifiers', async function () {
    const res = await findAll.call(fakeSelf);
    expect(res).to.deep.equal(Object.keys(adapter.documents));
  });
});