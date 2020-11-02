// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.User.findOne({
        where: {
          id: req.user.id
        },
        include: [db.Flock]
      }).then((result) => {
        res.json(result);
      });
    }
  });

  app.post('/api/add_flock', (req, res) => {
    console.log(req.user, req.body)
    db.Flock.create({
      UserId: req.user.id,
      startDate: req.body.startDate,
      birdCount: req.body.birdCount,
    }).then(result => {
      res.json(result)
    })
  })

  app.post('/api/add_record', (req, res) => {
    console.log(req.user, req.body)
    db.DailyRecord.create({
      FlockId: req.body.flockId,
      date: req.body.date,
      temperature: req.body.temperature,
      feed: req.body.feed,
      bedding: req.body.bedding,
      mortality: req.body.mortality,
      notes: req.body.notes
    }).then(result => {
      res.json(result)
    })
  })
};
