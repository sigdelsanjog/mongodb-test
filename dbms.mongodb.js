// Switch to the 'mongo' database
use("mongo-test"); 

// --- Step 1: Create the 'Fruit' Collection ---
db.createCollection("Fruit-test");
print("Collection 'Fruit' created successfully!");

// --- Step 2: Insert Documents into 'Fruit' Collection ---
db.Fruit-test.insertMany([
    { name: "Apple-test" },
    { name: "Banana-test" },
    { name: "Melon-test" }
]);
print("Documents inserted into 'Fruit' collection:");
printjson(db.Fruit-test.find().toArray());

// --- Step 3: Create the 'Vegetables' Collection ---
db.createCollection("Vegetables");
print("Collection 'Vegetables' created successfully!");

use("mongo");
// --- Step 4: Insert Documents into 'Vegetables' Collection ---
db.Vegetables.insertMany([
    { name: "Spinach" },
    { name: "Pumpkin" },
    { name: "Beans" }
]);
print("Documents inserted into 'Vegetables' collection:");
printjson(db.Vegetables.find().toArray());

// Try creating the same collectin again
db.createCollection("Fruit");
use("mongo"); 
db.Fruit.insertMany([
  { name: "Apple" },
  { name: "Banana" },
  { name: "Melon" }
]);
use("mongo"); 
db.Fruit.updateMany(
    { name: "Apple" },
    { $set: { name: "Avocado" } }
);
print("Updated document where name = 'Apple' to 'Avocado'");
// Verify the update by printing all documents in the 'Fruit' collection
print("Current documents in 'Fruit' collection:");
printjson(db.Fruit.find().toArray());



// Create unique entries in Vegetables collection
use("mongo");
db.Vegetables.dropIndexes();

db.Vegetables.createIndex({ name: 1 }, { unique: true });

// Create a unique index on the 'name' field in the 'Vegetables' collection
db.Vegetables.createIndex({ name: 1 }, { unique: true });
print("Unique index created on the 'name' field in the 'Vegetables' collection.");
db.Vegetables.getIndexes();



try {
  db.Vegetables.insertOne({ name: "Spinach" }); // This will fail
} catch (e) {
  print("Error inserting duplicate document: " + e);
}

db.Vegetables.dropIndexes();
db.Vegetables.createIndex({ name: 1 }, { unique: true });
db.Vegetables.insertOne({ name: "Carrot" });
db.Vegetables.insertMany([
  { name: "Onion" },
  { name: "Tomato" },
  { name: "Peas" },
  { name: "Carrot" },
  { name: "Carrot" }  // Duplicate
]);


// Create the Salad collection with references
use("mongo");
db.createCollection("Salad");
db.showcollections();

// Find the _id of the Spinach document in Vegetables collection
var spinachDoc = db.Vegetables.findOne({ name: "Spinach" });
var spinachId = spinachDoc._id;

// Insert document into Salad collection with reference to Spinach
db.Salad.insertOne({
    name: "Spinach Salad",
    type: "Vegetable",
    vegetable: spinach_Id
});
