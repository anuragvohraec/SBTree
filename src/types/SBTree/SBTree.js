const EventEmitter = require('events');
const {MemoryAdapter, FsAdapter} = require('../../adapters');
const {generateTreeId} = require('../../utils/crypto');
const {waitFor} = require('../../utils/fn');
const {each}=require('lodash');
// const SBFTree = require('../SBFTree/SBFTree');

const Adapters = {MemoryAdapter, FsAdapter};
const parseAdapter = (_adapterOpts) =>{
  if(!Adapters[_adapterOpts.name]){
    throw new Error(`Unknown adapter ${_adapterOpts.name}`);
  }
  return new Adapters[_adapterOpts.name](_adapterOpts)
}

/**
 * SBTree
 *
 */
class SBTree extends EventEmitter {
  #emitter = new EventEmitter();
  constructor(props = {}) {
    super();
    const self = this;
    Object.assign(SBTree.prototype, {
      setFieldTree: require('./methods/setFieldTree')
    });
    const defaultProps = {
      order: 511,
      // FillFactor should not be less than half.
      fillFactor: 0.5,
      verbose:false,
      fieldTrees:{},
      size:0,
      exclude:[],
      uniques:[],
    };
    this.adapter = (props.adapter) ? parseAdapter(props.adapter) : new MemoryAdapter();
    this.isReady = true;

    if(this.adapter.name !== 'MemoryAdapter'){
      // We will need to sync up first
      this.isReady = false;
      waitFor(self.adapter,'isReady', ()=> self.isReady = true);
    }

    this.order= (props.order) ? props.order : defaultProps.order;
    this.fillFactor= (props.fillFactor) ? props.fillFactor : defaultProps.fillFactor;
    this.verbose= (props.verbose) ? props.verbose : defaultProps.verbose;

    this.id = (props.id) ? props.id : generateTreeId();

    this.uniques = (props.uniques) ? props.uniques : defaultProps.uniques;
    this.exclude = (props.exclude) ? props.exclude : defaultProps.exclude;
    this.size = (props.size!==undefined) ? props.size : defaultProps.size;

    this.fieldTrees = (props.fieldTrees!==undefined) ? {} : defaultProps.fieldTrees;
    if(props.fieldTrees){
      each(props.fieldTrees, (_fieldTree, _fieldTreeName)=>{
        this.setFieldTree(_fieldTree);
      })
    }
    if(this.adapter.attachParent){
      this.adapter.attachParent(this).then(()=>{
        this.emit('ready');
      })
    }else{
      setTimeout(()=>{
        this.emit('ready');
      },10)
    }

  }
  on(){
    this.#emitter.on(...arguments)
  }
  emit(){
    this.#emitter.emit(...arguments)
  }
  getOptions(){
    const {order, fillFactor, verbose}= this;
    return {
      order, fillFactor, verbose
    }
  }
}


SBTree.prototype.deleteDocuments = require('./methods/deleteDocuments')
SBTree.prototype.findDocuments = require('./methods/findDocuments')
SBTree.prototype.getAdapter = require('./methods/getAdapter');
SBTree.prototype.getDocument = require('./methods/getDocument')
SBTree.prototype.getFieldTree = require('./methods/getFieldTree')
SBTree.prototype.insertDocuments = require('./methods/insertDocuments')
SBTree.prototype.replaceDocuments = require('./methods/replaceDocuments')
SBTree.prototype.loadState = require('./methods/loadState')
SBTree.prototype.setFieldTree = require('./methods/setFieldTree')
SBTree.prototype.toJSON = require('./methods/toJSON')
module.exports = SBTree;
