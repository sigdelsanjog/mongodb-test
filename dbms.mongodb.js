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


// Example of displaying relation between two collections
use("mongo-test");
// Step 1: Create and insert documents into the Student collection
db.Student.insertMany([
  { name: "Aman", department: "Computer Science", subject: "Databases", grade: "A" },
  { name: "Naman", department: "Computer Science", subject: "Databases", grade: "B" },
  { name: "Roman", department: "Computer Science", subject: "AI", grade: "A" },
  { name: "suman", department: "Mathematics", subject: "Statistics", grade: "A" },
  { name: "Raman", department: "Mathematics", subject: "Statistics", grade: "B" }
]);

print("Student collection created and data inserted.");

// Step 2: Create and insert documents into the Instructor collection
db.Instructor.insertMany([
  { name: "Dr. Smith", department: "Computer Science", subject: "Databases" },
  { name: "Dr. Johnson", department: "Computer Science", subject: "AI" },
  { name: "Dr. Brown", department: "Mathematics", subject: "Statistics" }
]);

print("Instructor collection created and data inserted.");

// Step 3: Create the Student_Instructor_Assignment collection
db.createCollection("Student_Instructor_Assignment");

print("Student_Instructor_Assignment collection created.");

// Step 4: Group students and instructors based on the same department and subject

// Iterate over each unique (department, subject) combination in the Student collection
db.Student.aggregate([
  {
      $group: {
          _id: { department: "$department", subject: "$subject" },
          students: { $push: { name: "$name", grade: "$grade" } }
      }
  }
]).forEach(function(groupedStudents) {
  // Find the instructor for the same department and subject
  let instructor = db.Instructor.findOne({
      department: groupedStudents._id.department,
      subject: groupedStudents._id.subject
  });

  if (instructor) {
      db.Student_Instructor_Assignment.insertOne({
          department: groupedStudents._id.department,
          subject: groupedStudents._id.subject,
          students: groupedStudents.students,
          instructor: { name: instructor.name }
      });

      print(`Group for department '${groupedStudents._id.department}' and subject '${groupedStudents._id.subject}' added.`);
  } else {
      print(`No instructor found for department '${groupedStudents._id.department}' and subject '${groupedStudents._id.subject}'.`);
  }
});


db.Student_Instructor_Assignment.find().forEach(doc => {
  printjson(doc);
});

