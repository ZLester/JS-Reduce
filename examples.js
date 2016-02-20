// The Basics - Sum
{
  var valuesToSum = [10, 12, 15];
   
  var reducer = function(accumulator, item) {
    return accumulator + item;
  };

  var initialValue = 10;
  
  var total = valuesToSum.reduce(reducer, initialValue); 
  console.log(total); // 47
  
  var emptyValuestoSum = [];
  var emptyTotal = emptyValuestoSum.reduce(reducer, initialValue); // 

  console.log(emptyTotal) // 10 (still works despite emptyValuestoSum being empty)
}

// Transforming an Array into an Object
{
  var frameworkVotes = ['angular', 'react', 'react', 'angular', 'react', 'backbone'];

  var tallyVotes = function (tally, item) {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    return tally;
  }

  var tally = frameworkVotes.reduce(tallyVotes, {});

  console.log(tally); // { angular: 2, react: 3, backbone: 1 }
}

// Map
{
  var valuesToDouble = [1, 11, 21, 1211, 111221];

  var doubler = function(accumulator, item) {
    accumulator.push(item * 2);
    return accumulator;
  }

  var doubleMap = valuesToDouble.reduce(doubler, []);
  
  console.log(doubleMap); // [2, 22, 42, 2422, 222442]
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

  var odds = valuesToFilter.reduce(findOdds, []); // [1,3,5,7,9]
}

// FilterMap with Reduce vs. Chaining 1
{
  var valuesToFilterMap = [2,5,7,9,10];

  var findOddsAndDouble = function(acc, item) {
    if (item % 2 !== 0) {
      acc.push(item * 2);
    }
    return acc;
  }

  var oddsDoubled = valuesToFilterMap.reduce(findOddsAndDouble, []);

  console.log(oddsDoubled); // [10,14,18]

  var oddsDoubledChained = valuesToFilterMap.filter(function(item) {
    return item % 2 !== 0;
  }).map(function(item) {
    return item * 2;
  });

  console.log(oddsDoubledChained); // Still [10, 14, 18], and this is arguably more readible
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
  var testScores = [96, 87, 64, 78, 54, 98];
  var sum = function(acc, value) {
    return acc + value;
  }

  console.log(testScores.reduce(sum, 0)/testScores.length); // 79.5
  
  var findMean = function(acc, value, index, collection) {
    var sum = acc + value;
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
  var mistakeVals = [1, 2, 3];

  var mistakeSum = function(acc, val) {
    return acc + val;
  }
  
  var mistakeValsSummedNoInitial = mistakeVals.reduce(mistakeSum);
  var mistakeValsSummedWithInitial = mistakeVals.reduce(mistakeSum, 0);
  console.log(mistakeValsSummedNoInitial, mistakeValsSummedWithInitial) // 6, 6 (despite the first not passing an initial value)

  // ...and almost always leads to unexpected results
  var ironThrone = ['Stark', 'Stark', 'Lannister', 'Lannister', 'Lannister', 'Greyjoy'];
  var mistakeTallyNoInit = function (tally, item) {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    return tally;
  }
  var noInitialValue = ironThrone.reduce(mistakeTallyNoInit);
  console.log(noInitialValue); // Stark
  
  // Failing to return your accumulator is the other most common mistake
  var mistakeTallyNoAccReturn = function (tally, item) {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    // return tally;
  }
  // var noAccReturned = ironThrone.reduce(mistakeTallyNoAccReturn, {}); // throws an error
}

// Toy Problems...reduced!
{
  var findLongestWord = function(sentence) {
    return sentence.split(' ').reduce(function(acc, word, index, wordArr) {
      if (acc.length < word.length) {
        acc = word;
      }
      return acc;
    }, "");
  }

  var longestWord = findLongestWord("I have come here to return accumulators and chew bubblegum..."); 
  console.log(longestWord); // 'accumulators'
}

// Flatten
{
  var nestedArraysToFlatten = [[1,2,3],[4,5,6],[7,8,9]];

  var flatten = function(acc, arr) {
    return acc.concat(arr);
  }

  var flattened = nestedArraysToFlatten.reduce(flatten, []);
  console.log(flattened); // [1,2,3,4,5,6,7,8,9]
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
  
  console.log(mentorNamesAndAges);

  var sortedMentorLikes = techMentors.reduce(function(likes, mentor, index, mentors) {
    mentor.likes.forEach(function(like) {
      if (likes.indexOf(like) === -1) {
        likes.push(like);
      }
    });
    return index !== mentors.length - 1 ? likes : likes.sort();
  }, []);

  console.log(sortedMentorLikes);
}

// Pseudo-react example
{
  var tableRowReducer = function(html, mentor) {
     return html + '<tr><td> ' + mentor.name +', <td><td>' + mentor.age + '</td></tr>';
  };
  techMentors.reduce(tableReducer, "");
}

// Pseudo-redux example
{
  var counterReducer = function(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return Object.assign({}, state, state.count++);
      case 'DECREMENT':
        return Object.assign({}, state, state.count--);
      default:
        return state;
    }
  };

  var initialCountState = {
    count: 0
  };

  var actions = [{type: 'INCREMENT'}, {type: 'NOT_VALID'}, {type: 'INCREMENT'}, {type: 'DECREMENT'}];

  console.log(actions.reduce(counterReducer, initialCountState));
}
