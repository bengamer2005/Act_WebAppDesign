module.exports = {
  async up(db, client) {
      await db.createCollection("users", {
          validator: {
              $jsonSchema: {
                  bsonType: "object",
                  required: ["name", "email"],
                  properties: {
                      name: { bsonType: "string" },
                      email: { bsonType: "string" }
                  }
              }
          }
      });

      await db.createCollection("posts", {
          validator: {
              $jsonSchema: {
                  bsonType: "object",
                  required: ["title", "user"],
                  properties: {
                      title: { bsonType: "string" },
                      content: { bsonType: "string" },
                      user: { bsonType: "objectId" }
                  }
              }
          }
      });
  },
  async down(db, client) {
      await db.collection("posts").drop();
      await db.collection("users").drop();
  }
};
