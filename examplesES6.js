'use strict'
// The Basics - Sum
{
  const valuesToSum = [10, 12, 15];

  const reducer = (accumulator, item) => accumulator + item;

  const initialValue = 10;
  
  const total = valuesToSum.reduce(reducer, initialValue); 
  
  console.log(total); // 47
  
  const emptyValuestoSum = [];
  const emptyTotal = emptyValuestoSum.reduce(reducer, initialValue);
  
  console.log(emptyTotal) // 10 (still works despite emptyValuestoSum being empty)
}

// Transforming an Array into an Object
{
  const frameworkVotes = ['angular', 'react', 'react', 'angular', 'react', 'backbone'];

  const tallyVotes = (tally, item) => {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    return tally;
  }

  const tally = frameworkVotes.reduce(tallyVotes, {});

  console.log(tally); // { angular: 2, react: 3, backbone: 1 }
}

// Map
{
  const valuesToDouble = [1, 2, 3, 4, 5];

  // Notice the inline callback
  const doubleMap = valuesToDouble
    .reduce((accumulator, item) => {
      accumulator.push(item * 2);
      return accumulator;
    }, []);
    
  console.log(doubleMap); // [2, 4, 6, 8, 10]
}

// Filter
{
  const valuesToFilter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const odds = valuesToFilter
    .reduce((accumulator, item) => {
      if (item % 2 !== 0) {
        accumulator.push(item);
      }
      return accumulator;
    }, []); // [1,3,5,7,9]
}

// FilterMap with Reduce vs. Chaining Part 1
{
  const valuesToFilterMap = [2,5,7,9,10];

  const oddsDoubled = valuesToFilterMap
    .reduce((acc, item) => {
      if (item % 2 !== 0) {
        acc.push(item * 2);
      }
      return acc;
    }, []);

  console.log(oddsDoubled); // [10,14,18]

  const oddsDoubledChained = valuesToFilterMap
    .filter(item => item % 2 !== 0)
    .map(item => item * 2);

  console.log(oddsDoubledChained); // [10, 14, 18], and this is quite a bit more readible...so why use reduce at all?
}

// FilterMap with Reduce vs. Chaining Part 2
{
  const bigData = [];
  for (let i = 0; i < 10000000; i++) {
    bigData.push(i);
  }

  console.time('BigDataChaining');
  const bigDataChaining = bigData
    .filter(item => item % 2 !== 0)
    .map(item => item * 2);  
  console.timeEnd('BigDataChaining');

  console.time('BigDataReduce');
  const bigDataReduce = bigData
    .reduce((acc, item) => {
      if (item % 2 !== 0) {
        acc.push(item * 2);
      }
      return acc;
     }, [])
  console.timeEnd('BigDataReduce');

  // What causes the performance boost?
}

// Other Reduce Args - Finding Mean with Reduce
{
  const testScores = [96, 87, 64, 78, 54, 98];
  const sum = (acc, value) => acc + value;

  console.log(testScores.reduce(sum, 0)/testScores.length); // 79.5
  
  const findMean = (acc, value, index, collection) => {
    const sum = acc + value;
    if (index !== collection.length - 1) {
      return sum;
    }
    return sum/collection.length;
  }

  console.log(testScores.reduce(findMean, 0)); // 79.5, all within the reduce!
}

// Common Mistakes with Reduce
{
  // The "feature" of reduce defaulting the intial value to the first element in the collection is rarely useful...
  const mistakeVals = [1, 2, 3];

  const mistakeSum = (acc, val) => acc + val;
  
  const mistakeValsSummedNoInitial = mistakeVals.reduce(mistakeSum);
  const mistakeValsSummedWithInitial = mistakeVals.reduce(mistakeSum, 0);
 
  console.log(mistakeValsSummedNoInitial, mistakeValsSummedWithInitial) // 6, 6 (despite the first not passing an initial value)

  // ...and almost always leads to unexpected results
  const ironThrone = ['Stark', 'Stark', 'Lannister', 'Lannister', 'Lannister', 'Greyjoy'];
  const mistakeTallyNoInit = (tally, item) => {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    return tally;
  }
  // const noInitialValue = ironThrone.reduce(mistakeTallyNoInit);
  
  // console.log(noInitialValue); // Stark (throws an error in strict mode)
  
  // Failing to return your accumulator is the other most common mistake
  const mistakeTallyNoAccReturn = (tally, item) => {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    // return tally;
  }
  // const noAccReturned = ironThrone.reduce(mistakeTallyNoAccReturn, {}); // throws an error
}

// Toy Problems...reduced!
{
  const findLongestWord = (sentence) => {
    return sentence
      .split(' ')
      .reduce((acc, word, index, wordArr) => {
        if (acc.length < word.length) {
          acc = word;
        }
        return acc;
      }, '');
  }

  const longestWord = findLongestWord("I have come here to return accumulators and chew bubblegum..."); 
  
  console.log(longestWord); // 'accumulators'
}

// Flatten
{
  const nestedArraysToFlatten = [[1,2,3],[4,5,6],[7,8,9]];

  const flatten = (acc, arr) => acc.concat(arr);

  const flattened = nestedArraysToFlatten.reduce(flatten, []);

  console.log(flattened); // [1,2,3,4,5,6,7,8,9]
}

// FlatMap
{
  const techMentors = [{
    name: 'Beth',
    age: 28,
    likes: [
      'Math', 
      'JavaScript',
      'Ricochet Robots'
    ]
  }, {
    name: 'Dan',
    age: 29,
    likes: [
      'Crickets',
      'The Queen',
      'Being Proper'
    ]
  }, {
    name: 'Sunny',
    age: 25,
    likes: [
      'BitCoin',
      'Meteor',
      'Beth',
    ]
  }, {
    name: 'Zach',
    age: 28,
    likes: [
      'JavaScript',
      'Bad Puns',
      'Reduce',
    ]
  }, {
    name: 'Magee',
    age: 36,
    likes: [
      'JavaScript',
      'Dogs',
      'Riding Motorcycles',
    ]
  }];

  const mentorNamesAndAges = techMentors
    .reduce((namesAndAges, mentor) => {
      namesAndAges.names.push(mentor.name);
      namesAndAges.ages.push(mentor.age);
      return namesAndAges;
    }, {names: [], ages: []});
  
  console.log(mentorNamesAndAges);

  const sortedMentorLikes = techMentors
    .reduce((likes, mentor) => likes.concat(mentor.likes), [])
    .sort();

  console.log(sortedMentorLikes);
}

// Reducing Functions – Pipe and Compose with Reduce
{
  const add1 = x => x + 1;    
  
  const mult5 = x => x * 5;
  
  const funcs = [add1, mult5];
  
  const pipedResults = funcs
    .reduce((result, func) => func(result), 2);

  // Iterating from back to front with reduceRight
  const composedResults = funcs
    .reduceRight((result, func) => func(result), 2);
  
  console.log(pipedResults); // 15 ((2 + 1) * 5)
  console.log(composedResults); // 11 ((2 * 5) + 1)
}

