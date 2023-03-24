// const stringSimilarity = require('string-similarity');
// const englishWords = require('an-array-of-english-words');

// function getSimilarWords(word) {
//   if(word.includes(" ")){
//     const arr = word.split(" ");
//     let similarWords = [];
//     arr.forEach(element => {
//       const similarWordsElement = getSimilarWords(element);
//       similarWords = similarWords.concat(similarWordsElement);
//     });
//     return similarWords;
//   }
//   const matches = stringSimilarity.findBestMatch(word, englishWords);
//   const similarWords = matches.ratings
//     .filter((match) => match.rating > 0.7)
//     .map((match) => match.target);
//   return similarWords;
// }

// console.log(getSimilarWords('Turkish Salad'));
// Import the Fuse.js library
// const Fuse = require('fuse.js');

// // Assume the database is an array of words
// const wordsDB = ["Spaghetti Bolognese", "Chicken Alfredo", "Vegetable Curry", "Beef Stir-Fry"];

// // Function to get the closest matching word from the database
// function getClosestMatch(word) {
//     // Create a new Fuse instance with the words in the database
//     const fuse = new Fuse(wordsDB, {
//         includeScore: true, // Include a score for each match
//         threshold: 0.6, // Set a threshold for what is considered a match
//         keys: ['name'] // Specify which properties of each object to search
//     });

//     // Search for the word in the database
//     const result = fuse.search(word);

//     // If a match was found with a low enough score, return the closest matching word
//     if (result.length > 0)
//         return result[0].item;
//     else
//         return 'Not Found :(';

// }

// // Example usage
// console.log(getClosestMatch("I want to order Chickienn Alfgredoo")); // Output: Chicken Alfredo
// console.log(getClosestMatch("Pasta Bolonese")); // Output: Spaghetti Bolognese
// console.log(getClosestMatch("Pizza")); // Output: Not Found :(
// console.log(getClosestMatch("Bee Strrrr fr")); // Output: Beef Stir-Fry
// const allMeals = require("../menu/getMenu");
// a = [];
// allMeals.forEach(element => {
//     a.push(element.name);
// });

console.log("aaaaaaaaa");