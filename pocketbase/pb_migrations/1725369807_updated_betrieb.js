/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i796cyt6z2gqzjg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6j2gomzo",
    "name": "notNull",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cuutuglz",
    "name": "default",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i796cyt6z2gqzjg")

  // remove
  collection.schema.removeField("6j2gomzo")

  // remove
  collection.schema.removeField("cuutuglz")

  return dao.saveCollection(collection)
})
