var db = require('./db/index.js');
var Question = db.Question;
var Results = db.Results;

db.Question.create({
  userID: 'admin',
  name: 'Is the earth round?',
  correct: 'Yes',
  wrong1: 'No',
  wrong2: 'Non',
  wrong3: 'Nein',
  testName: 'fancy quiz'
})
.then(function () {
  return db.Question.create({
    userID: 'admin',
    name: 'Is the moon round?',
    correct: 'Yes',
    wrong1: 'No',
    wrong2: 'Non',
    wrong3: 'Nein',
    testName: 'fancy quiz'
  });
})
.then(function () {
  return db.Question.create({
    userID: 'admin',
    name: 'Are the stars round?',
    correct: 'Yes',
    wrong1: 'No',
    wrong2: 'Non',
    wrong3: 'Nein',
    testName: 'fancy quiz'
  });
})
.then(function () {
  return db.Question.create({
    userID: 'admin',
    name: '1+1?',
    correct: '2',
    wrong1: '4',
    wrong2: '3',
    wrong3: '5',
    testName: 'math quiz'
  });
})
.then(function () {
  return db.Question.create({
    userID: 'admin',
    name: '2+2?',
    correct: '4',
    wrong1: '5',
    wrong2: '3',
    wrong3: '6',
    testName: 'math quiz'
  });
})
.then(function () {
  return db.Question.create({
    userID: 'admin',
    name: 'What is the capital of France?',
    correct: 'Paris',
    wrong1: 'Milan',
    wrong2: 'Barcelona',
    wrong3: '5',
    testName: 'geography quiz'
  });
})
.then(function () {
  return db.Question.create({
    userID: 'admin',
    name: 'What is the Capital of Spain?',
    correct: 'Madrid',
    wrong1: 'Barcelona',
    wrong2: 'Malaga',
    wrong3: 'Valencia',
    testName: 'geography quiz'
  });
})
.then(function () {
  process.exit();
});
