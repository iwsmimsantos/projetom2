//código padrão

var sails = require("sails");

before(function (done) {
  this.timeout(20000);

  sails.lift(
    {
      hooks: { grunt: false, csrf: false },
      log: { level: "warn" },
    },
    function (err) {
      if (err) {
        return done(err);
      }

      return done();
    }
  );
});

after(function (done) {
  sails.lower(done);
});