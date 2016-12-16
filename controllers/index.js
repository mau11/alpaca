var db = require('../db');

module.exports = {
  // in quiz page, GET request will return object of all quiz Q's and A's
  tests: {
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
      if (req.query.ID !== undefined) {
        db.Question.findAll({
          where: {
            testName: req.query.ID
          }
        })
        .then(function(questions) {
          res.json(questions);
        });
      } else {
        db.Question.findAll()
        .then(function(questions) {
          res.json(questions);
        });
      }
    },
    // in quiz Creation page, POST request will add an entry into database
    post: function (req, res) {
      console.log(JSON.stringify(req.body));
      if (req.body.delete === true) {
        db.Question.destroy({
            where: {
              name: req.body.name
            }
        })
        .then(() => res.json({status: 'deleted'}))
      } else {
        db.Question.create({
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
          } else {
            res.json(response);
          }
        });
    },

    post: function (req, res) {
      db.Results.find({
        where:{
          userID: req.body.userID,
          testName: req.body.testName
        }
      }).then(function(result){
        if(result){
          db.Results.update(req.body,{
            where:{
              userID: req.body.userID,
              testName: req.body.testName
            }
          });
        } else {
          db.Results.create({
            userID: req.body.userID,
            testName: req.body.testName,
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
