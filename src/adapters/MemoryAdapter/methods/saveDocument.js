async function saveDocument(doc){
  if(!this.documents[doc._id]){
    this.documents[doc._id] = doc;
  }
}
module.exports = saveDocument;
