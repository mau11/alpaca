// To run these tests, enter the following in your terminal.
// $ npm run client

describe('Crash Course (before logging in)', function() {

  it('should load page', function (client, done) {
    client
      .url('http://localhost:1337')
      .waitForElementVisible('body', 1000)
      .assert.title('CrashCourse')
      .assert.visible('.navbar-brand')
      .assert.visible('.fa.fa-desktop')
      .assert.visible('#volumeIcon')
      .pause(1000);
    });

  it('should prompt auth0 when clicking log in', function(client){
    client
      .assert.visible('.login')
      .click('.login')
      .waitForElementVisible('.auth0-lock-header-logo', 1000)
      .click('.auth0-lock-close-button')
      .pause(1000);
  });

  it('should load all games without logging in', function(client){
    client
      client.click('link text', 'Games')
      .pause(1000);
      client.click('link text', 'Regular Quiz Game')
      .pause(1000);
      client.click('link text', 'Car Quiz')
      .pause(1000);
      client.click('link text', 'Racer Quiz Game')
      .pause(1000);
      client.click('link text', '3D Racer Quiz Game')
      .pause(1000);
      client.click('link text', 'Wolfenstein 3D - Quizz edition')
      .pause(1000);
  });

  after(function(client, done) {
    client.end(function() {
      done();
    });
  });
});


describe('Crash Course (after logging in)', function() {

  it('should have access to all management components of app after logging in', function(client){
    client
    .url('http://localhost:1337/#/access_token=AD06oaKJ1Q3QAKIU&expires_in=86400&id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3N0ZWZhbnIuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExODMwMTI1NDM5MDYwNDcyNDE5IiwiYXVkIjoiaUg3SHZ4cTdHa2d4WkVJVkZLN050YjV5U21UOGpXZEUiLCJleHAiOjE0ODIxODIzNjIsImlhdCI6MTQ4MjE0NjM2Mn0.r8l-ZybZz-MBHGHIm1hD5fvfuf3RBWStw4FyBUBABRw&token_type=Bearer')
    .waitForElementVisible('body', 5000)
    .click('link text', 'Build a Quiz')
/*    .click('link text', 'Manage Quizzes')
    .click('link text', 'My Results')
    .click('link text', 'Log Out')*/
    .pause(1000);
  });

  after(function(client, done) {
    client.end(function() {
      done();
    });
  });
});

