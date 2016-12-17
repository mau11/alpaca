var Game = require('../../src/util/quiz').Game;
var chai = require('chai');


// Start up server prior to running tests.
describe('game',function(){
  it('should set up the game object on start', function(done){
    var game = new Game();
    game.start(function(){
      done();
    });
  });

});
