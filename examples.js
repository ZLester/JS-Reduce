// Sum
{
  var data = [];

  var reducer = function(accumulator, item) {
    return accumulator + item;
  };

  var initialValue = 0;

  var total = data.reduce(reducer, initialValue);

  console.log('The total is ' + total + '.');
}

// Transforming an Array into an Object
{
  var frameworkVotes = ['angular', 'react', 'react', 'angular', 'react', 'angular', 'backbone', 'backbone', 'ember', 'react', 'react', 'angular'];

  var tallyVotes = function (tally, item) {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    return tally;
  }

  var tally = frameworkVotes.reduce(tallyVotes, {});

  console.log(tally);
}

// Map
{
  var doubleVals = [1, 11, 21, 1211, 111221];

  var double = function(accumulator, item) {
    accumulator.push(item * 2);
    return accumulator;
  }

  var doubleMap = doubleVals.reduce(double, []);

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
  }

  var odds = valuesToFilter.reduce(findOdds, []);

  console.log(odds);
}

// FilterMap with Reduce vs. Chaining 1
{
  var valuesToFilterMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  var oddsDoubler = function(acc, item) {
    if (item % 2 !== 0) {
      acc.push(item * 2);
    }
    return acc;
  }

  var oddsDoubledReduced = valuesToFilterMap.reduce(oddsDoubler, []);

  var oddsDoubledChained = valuesToFilterMap.filter(function(item) {
    return item % 2 !== 0;
  }).map(function(item) {
    return item * 2;
  });

  console.log(oddsDoubledReduced, oddsDoubledChained);
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
  var findSum = function(acc, value) {
    return acc + value;
  }

  var findMean = function(acc, value, index, collection) {
    var sum = acc + value;
    if (index !== collection.length - 1) {
      return sum;
    }
    return sum/collection.length;
  }
  console.log(testScores.reduce(findSum, 0)/testScores.length);
  console.log(testScores.reduce(findMean, 0));
}

// Common Mistakes with Reduce
{
  // Not including a initial value is rarely useful...
  var mistakeVals = [1, 3, 5, 8, 9];

  var mistakeSum = function(acc, val) {
    return acc + val;
  }

  console.log(mistakeVals.reduce(mistakeSum));

  // ...and almost leads to unexpected results
  var mistakeVotes = ['stark', 'stark', 'lannister', 'lannister', 'lannister', 'greyjoy'];
  var mistakeTally = function (tally, item) {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    // Not returning your accumulator is the other most common mistake
    return tally;
  }

  console.log(mistakeVotes.reduce(mistakeTally));
}

// Flatten
{
  var arrsToFlatten = [[1,2,3],[4,5,6],[7,8,9]];

  var flatArr = arrsToFlatten.reduce(function(acc, arr) {
    return acc.concat(arr);
  }, []);

  console.log(flatArr);
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
    age: 30,
    likes: [
      'Crickets',
      'JavaScript',
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

  var mentorNames = techMentors.reduce(function(names, mentor) {
    return names.concat(mentor.name);
  }, []);

  var mentorNamesAndAges = techMentors.reduce(function(mentors, mentor) {
    mentors.names.push(mentor.name);
    mentors.ages.push(mentor.age);
    return mentors;
  }, {names: [], ages: []});

  var mentorLikes = techMentors.reduce(function(likes, mentor, index, mentors) {
    mentor.likes.forEach(function(like) {
      if (likes.indexOf(like) === -1) {
        likes.push(like);
      }
    });
    return index === mentors.length - 1 ? likes.sort() : likes;
  }, []);
  console.log(mentorNames);
  console.log(mentorNamesAndAges);
  console.log(mentorLikes);
}