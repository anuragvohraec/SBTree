## SBTree API 

```js
const tree = new SBTree([props]);
```

- Constructor options :
  - `adapter` Adapter - (def: MemoryAdapter) : Allow to specific another adapter to use
  - `order` Number - (def: 511) : Primordial for the performance, the closest to L1 the better. Chose below 2^n. 
  - `fillFactor` Float - (def: 0.5) : Used for balancing the tree. Should not be less than 0.5 (50%). 
  - `verbose` Bool - (def: false)
  - `uniques` Array - (def: []) - Allow to set some field unique by adding them to this array
  - `exclude` Array - (def: []) - Allow to exclude from indexing some field (important if you expect field value to be huge or nested).

#### async tree.insertDocuments(documents)

Allow to process one or an array of documents and insert them. 
It returns the inserted object with their _id if not specified in document.

```js
    await tree.insertDocuments({age:33, name:"Jean",_id:'507f191e810c19729de860ea'})
```


####  async tree.getDocument(_id)

Allow to fetch a specific document by it's specific id.

```js
    await tree.getDocument('507f191e810c19729de860ea')
```


#### async tree.findDocuments(query)

Allow to find all documents matching the query

See more info on [queries](/docs/queries.md)


```js
    await tree.findDocuments({age:33});
```

#### async tree.deleteDocuments(query)

Will delete all documents matching the query.

See more info on [queries](/docs/queries.md)

```js
    await tree.deleteDocuments({age:33});
```


####  tree.toJSON()

Allow to return a representation in JSON of the tree. Useful for storing it, as it's result are valid params for the SBTree constructor.

```js
  tree.toJSON()
```
