const {expect} = require('chai');
const {mocha, done} = require('mocha');
const SBTree = require("../../src/types/SBTree/SBTree");


describe("Test Update document and then delete", async (done)=>{
    const sbtree = new SBTree({order: 3});

    //Inserting a doc
    const t1 = await sbtree.insertDocuments({
        id: 'KqXIhr',
        key: 'KqXIhr',
        value: {
          _id: 'KqXIhr',
          _rev: '1-85e8ff864ae6d157217ad2e4d4117f5e',
        },
        ts: 1589885726633,
        _id: '5ec3bb1e299eb9b64166ebbb'
      });

      //finding the doc
    const [t2] = await sbtree.findDocuments({key: 'KqXIhr'});
    console.log("Found: ",t2);
    
    //updating the doc and replacing it 
    t2.value.count=1;
    let time_now = new Date().getTime();
    const t3 = await sbtree.replaceDocuments({...t2 , ts: new Date().getTime()});
    console.log("replaced: ",t3);
    
    //trying to delete the doc
    const t4 = await sbtree.deleteDocuments({ts: {$lte: time_now+1000}});
    console.log("deleted: ", t4)
})