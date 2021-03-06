const {cloneDeep} = require('lodash');

module.exports = async function saveDatabase(){
  const leafs = cloneDeep(this.leafs)
  const tree = this.getParent().toJSON();
  const db = {
    leafs,
    tree
  }
  const job = await this.queue.add('File.create', `${this.path}/sbtree.meta`, db);
  await job.execution();
  this.lastSave = Date.now();
}
