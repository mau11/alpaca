var db = require('../db');

module.exports = {
  tests: {
    get: function (req, res) {
        db.Question.findAll({
          where: {
            testName: req.query.testName
          }
        })
        .then(function(questions) {
          console.log('questions:', questions);
          res.json(questions);
        })
        .catch(function(error) {
          console.log('There was an error:', error);
        });
      },
    post: function (req, res) {
      if (req.body.delete === true) {
        console.log('POST delete request for testName = ' + req.body.testName);
        db.Question.destroy({
          where: {
            testName: req.body.testName
          }
        })
        .then(() => res.json({status: 'deleted'}));
      }
    }
  },
  questions: {
    get: function (req, res) {
      if (req.query.userID) {
        db.Question.findAll({
          where: req.query
        })
        .then(function(questions) {
          console.log('questions:', questions);
          res.json(questions);
        })
        .catch(function(error) {
          console.log('There was an error:', error);
        });
      } else {
        db.Question.findAll({})
        .then(function(questions) {
          console.log('questions:', questions);
          res.json(questions);
        })
        .catch(function(error) {
          console.log('There was an error:', error);
        });
      }
    },
    // in quiz Creation page, POST request will add an entry into database
    post: function (req, res) {
      console.log('POST REQUEST TO QUESTIONS')
      console.log(JSON.stringify(req.body));
      if (req.body.delete === true) {
        console.log('POST delete request for name = ' + req.body.name);
        db.Question.destroy({
            where: {
              name: req.body.name
            }
        })
        .then(() => res.json({status: 'deleted'}))
      } else {
        db.Question.create({
          userID: req.body.userID,
          name: req.body.name,
          correct: req.body.correct,
          wrong1: req.body.wrong1,
          wrong2: req.body.wrong2,
          wrong3: req.body.wrong3,
          testName: req.body.testName,
        }).then(function(question) {
          res.sendStatus(201);
        });
      }
    }
  },
  user: {
    // in signing page, GET request will check for username and return pass
    get: function (req, res) {
      db.User
        .find({ where: { username: req.body.username } })
        .then(function(err, userReturn) {
          if (!userReturn) {
            console.log('No user with username "' + req.body.username + '" was found.');
          } else {
            console.log('Hello ' + userReturn.username + '!');
            console.log('All attributes of john:', userReturn.get());
          }
        });
    },
    // in sign-up page, POST request will create user entry into database
    post: function (req, res) {
          db.User.create({
            username: req.body.username,
            password: generatePasswordHash(req.body.password),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
          }).then(function(user) {
            res.sendStatus(201);
          });
    }
  },
  results: {
    // opportunity to keep track of results in database, sorting by userID.
    get: function (req, res) {

      db.Results.findAll({
          where: {
            userID: req.query.userID
          }
        })
        .then(function(response) {
          if (!response) {
            console.log('No results for that test');
          } else {
            res.json(response);
          }
        });
    },

    post: function (req, res) {
      console.log('posting to results', req.body);
      db.Results.find({
        where:{
          userID: req.body.userID,
          testName: req.body.testName,
          game: req.body.game
        }
      }).then(function(result){
        console.log('Update results post', req.body);
        if(result){
          db.Results.update(req.body,{
            where:{
              userID: req.body.userID,
              testName: req.body.testName,
              game: req.body.game
            }
          });
        } else {
          console.log('New results post', req.body);
          db.Results.create({
            userID: req.body.userID,
            testName: req.body.testName,
            game: req.body.game,
            correct: req.body.correct,
            incorrect: req.body.incorrect
          })
        }

      }).then(function(results) {
        res.sendStatus(201);
      })
    }
  }
};
