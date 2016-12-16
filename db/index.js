var Sequelize = require('sequelize');
var db = new Sequelize('crashcourse', 'root', '');

var Question = db.define('Question', {
  userID: Sequelize.STRING,
  name: Sequelize.STRING,
  correct: Sequelize.STRING,
  wrong1: Sequelize.STRING,
  wrong2: Sequelize.STRING,
  wrong3: Sequelize.STRING,
  categories: Sequelize.STRING,
  testName: Sequelize.STRING
});

var Results = db.define('Results', {
  userID: Sequelize.INTEGER,
  testName: Sequelize.STRING,
  correct: Sequelize.INTEGER,
  incorrect: Sequelize.INTEGER
});

// If we are adding columns or otherwise changing the schema
// we can add {force: true} inside .sync to drop the tables
// NOTE: THIS DELETES ALL THE DATA IN THE TABLE

Question.sync();
Results.sync();

exports.Question = Question;
exports.Results = Results;
