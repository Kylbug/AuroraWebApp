/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "i796cyt6z2gqzjg",
    "created": "2024-09-03 13:22:30.908Z",
    "updated": "2024-09-03 13:22:30.908Z",
    "name": "betrieb",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "clnxbepg",
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
        "id": "a8n0mba8",
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
  const collection = dao.findCollectionByNameOrId("i796cyt6z2gqzjg");

  return dao.deleteCollection(collection);
})
