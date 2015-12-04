// Sum
{
  var valuesToSum = [];

  var reducer = function(accumulator, item) {
    return accumulator + item;
  };

  var initialValue = 10;

  var total = valuesToSum.reduce(reducer, initialValue); // Still works despite valuesToSum being empty

  console.log(total);
}

// Transforming an Array into an Object
{
  var votesToTally = ['angular', 'react', 'react', 'angular', 'react', 'backbone'];

  var tallyVotes = function (tally, item) {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    return tally;
  }

  var tally = votesToTally.reduce(tallyVotes, {});

  console.log(tally);
}

// Map
{
  var valuesToDouble = [1, 11, 21, 1211, 111221];

  var doubler = function(accumulator, item) {
    accumulator.push(item * 2);
    return accumulator;
  }

  var doubleMap = valuesToDouble.reduce(doubler, []);
  
  console.log(doubleMap);
  
}

// Filter
{
  var valuesToFilter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  var findOdds = function(accumulator, item) {
    if (item % 2 !== 0) {
      accumulator.push(item);
    }
    return accumulator;
  };

  var odds = valuesToFilter.reduce(findOdds, []);

}

// FilterMap with Reduce vs. Chaining 1
{
  var valuesToFilterMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  var findOddsAndDouble = function(acc, item) {
    if (item % 2 !== 0) {
      acc.push(item * 2);
    }
    return acc;
  }

  var oddsDoubledReduced = valuesToFilterMap.reduce(findOddsAndDouble, []);

  console.log(oddsDoubledReduced);

  var oddsDoubledChained = valuesToFilterMap.filter(function(item) {
    return item % 2 !== 0;
  }).map(function(item) {
    return item * 2;
  });

  console.log(oddsDoubledChained);
}

// FilterMap with Reduce vs. Chaining 2
{
  var bigData = [];
  for (var i = 0; i < 10000000; i++) {
    bigData.push(i);
  }

  console.time('BigDataChaining');
  var bigDataChaining = bigData.filter(function(item) {
    return item % 2 !== 0;
  }).map(function(item) {
    return item * 2;
  });
  console.timeEnd('BigDataChaining');

  console.time('BigDataReduce');
  var bigDataReduce = bigData.reduce(function(acc, item) {
    if (item % 2 !== 0) {
      acc.push(item * 2);
    }
    return acc;
  }, [])
  console.timeEnd('BigDataReduce');
}

// Other Reduce Args - Finding Mean with Reduce
{
  var testScores = [96, 88, 64, 78, 54, 98];
  var sum = function(acc, value) {
    return acc + value;
  }

  var findMean = function(acc, value, index, collection) {
    var sum = acc + value;
    if (index !== collection.length - 1) {
      return sum;
    }
    return sum/collection.length;
  }
  
  console.log(testScores.reduce(sum, 0)/testScores.length);
  console.log(testScores.reduce(findMean, 0));

}

// Common Mistakes with Reduce
{
  // The "feature" of reduce defaulting the intial value to the first element in the collection is rarely useful...
  var mistakeVals = [1, 2, 3];

  var mistakeSum = function(acc, val) {
    return acc + val;
  }
  
  var mistakeValsReduced = mistakeVals.reduce(mistakeSum);
  
  console.log(mistakeValsReduced) // Still returns 6 despite no initial value

  // ...and almost always leads to unexpected results
  var mistakeVotes = ['stark', 'stark', 'lannister', 'lannister', 'lannister', 'greyjoy'];
  var mistakeTally = function (tally, item) {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    // Failing to return your accumulator is the other most common mistake
    return tally;
  }

  var unexpectedResult = mistakeVotes.reduce(mistakeTally);
  
  console.log(unexpectedResult);
}

// Flatten
{
  var nestedArraysToFlatten = [[1,2,3],[4,5,6],[7,8,9]];

  var flatten = function(acc, arr) {
    return acc.concat(arr);
  }

  var flattened = nestedArraysToFlatten.reduce(flatten, []);

  console.log(flattened);
}

// FlatMap
{
  var techMentors = [{
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

  var mentorNamesAndAges = techMentors.reduce(function(namesAndAges, mentor) {
    namesAndAges.names.push(mentor.name);
    namesAndAges.ages.push(mentor.age);
    return namesAndAges;
  }, {names: [], ages: []});

  var mentorLikes = techMentors.reduce(function(likes, mentor, index, mentors) {
    mentor.likes.forEach(function(like) {
      if (likes.indexOf(like) === -1) {
        likes.push(like);
      }
    });
    return index !== mentors.length - 1 ? likes : likes.sort();
  }, []);

  console.log(mentorNamesAndAges);
  console.log(mentorLikes);

}
