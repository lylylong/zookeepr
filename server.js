// Start by requiring the data, creating a route that the front-end can request data from
// keep on top
const { animals } = require("./data/animals");

// initial setup for express.js
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//With that in mind, instead of handling the filter functionality inside the .get() callback,
//we're going to break it out into its own function. This will keep our code maintainable and clean
// function filterByQuery(query, animalsArray) {
//   let filteredResults = animalsArray;
//   if (query.diet) {
//     filteredResults = filteredResults.filter(
//       (animal) => animal.diet === query.diet
//     );
//   }
//   if (query.species) {
//     filteredResults = filteredResults.filter(
//       (animal) => animal.species === query.species
//     );
//   }
//   if (query.name) {
//     filteredResults = filteredResults.filter(
//       (animal) => animal.name === query.name
//     );
//   }
//   return filteredResults;
// }

function filterByQuery(query, animalsArray) {
  //// used for the formating the query
  let personalityTraitsArray = [];
  // Note that we save the animalsArray as filteredResults here:
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // Save personalityTraits as a dedicated array.
    // If personalityTraits is a string, place it into a new array and save.
    //// my thoughts:
    //// format the input/query -- then use the formated input to iterate all the animal array
    //// to see of the animil array has this input/query
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // Loop through each trait in the personalityTraits array:
    //// the filter process
    //// use forEach only for array!!!
    personalityTraitsArray.forEach((trait) => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  // return the filtered results:
  return filteredResults;
}
// Above the two routes, add a function called findById()
// that takes in the id and array of animals and returns a single animal object
function findById(id, animalsArray) {
  const result = animalsArray.filter((animal) => animal.id === id)[0];
  return result;
}

// To add the require route
// just before app.listen()
app.get("/api/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

app.get("/api/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  res.json(result);
});
