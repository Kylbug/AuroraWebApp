/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "r615ymk87rbc2gc",
    "created": "2024-08-30 06:01:18.432Z",
    "updated": "2024-08-30 06:01:18.432Z",
    "name": "personen",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "aseb6i7i",
        "name": "column",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "lo8jjh3c",
        "name": "e3kDatatype",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "o79nk5yz",
        "name": "notNull",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "rof7vyjn",
        "name": "default",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("r615ymk87rbc2gc");

  return dao.deleteCollection(collection);
})
