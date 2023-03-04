const mongoose = require('mongoose')

require('dotenv').config();

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

// Create Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create Model and use Schema
let Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  const jake = new Person({
    name: "Jake the Dog",
    age: 19,
    favoriteFoods: ["Banana", "Chocolate"]
  })

  jake.save(function(err, data) {
    if (err) return console.error(err);
    console.log(`CREATE AND SAVE => ${data}`)
    done(null, data)
  });
};


const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    console.log(`CREATE MANY PEOPLE => ${people}`);
    done(null, people);
  });
};


const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, person) {
    if (err) return console.log(err);
    console.log(`FIND PEOPLE BY NAME => ${person}`);
    done(null, person)
  })
};


const findOneByFood = (food, done) => {

  Person.findOne({ favoriteFoods: { $in: [food] } }, (err, person) => {
    if (err) return console.log(err);
    console.log(`FIND ONE BY FOOD => ${person}`);
    done(null, person);
  })
};


const findPersonById = (personId, done) => {

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
    console.log(`${personId} : FIND PERSON BY ID => ${person}`)
    done(null, person);
  })
};


const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    })
  })

};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    });

};


const removeById = (personId, done) => {

  Person.findByIdAndDelete(personId, (err, deletedPerson) => {
    if (err) return console.log(err);
    done(null, deletedPerson);
  })
};


const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, deletedPerson) => {
    if (err) return console.log(err);
    done(null, deletedPerson)
  })
};


const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find(
    {favoriteFoods: {$in: foodToSearch} } 
  )
  .sort( {name: 'asc'} )
  .limit(2)
  .select('-age')
  .exec( function(err, retrievedPerson) {
    if (err) return console.log(err);
    console.log(retrievedPerson)
    done(null, retrievedPerson);
  })
}
   
      

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------
 
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
