describe('Grid test', function() {

  before(function(client, done) {
    done();
  });

  afterEach(function(client, done) {
    done();
  });

  beforeEach(function(client, done) {
    done();
  });

  it('Test Google', function (browser) {
    browser
      .url('http://www.google.com/ncr')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatchjs')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000);
    });

  after(function(client, done) {
    client.end(function() {
      done();
    });
  });
});
