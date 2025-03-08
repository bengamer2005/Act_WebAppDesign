// Nota: Este archivo está pensado para ser ejecutado con herramientas de migración como migrate-mongo
module.exports = {
    async up(db, client) {
      // Crear la colección "users" con un validador de esquema
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
  
      // Crear la colección "posts" con validación, simulando la existencia de una foreign key
      await db.createCollection("posts", {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["title", "user"],
            properties: {
              title: { bsonType: "string" },
              content: { bsonType: "string" },
              // En este caso, se espera que "user" sea un ObjectId que referencie a un usuario
              user: { bsonType: "objectId" }
            }
          }
        }
      });
    },
    async down(db, client) {
      // Eliminar las colecciones en caso de hacer rollback
      await db.collection("posts").drop();
      await db.collection("users").drop();
    }
  };
  