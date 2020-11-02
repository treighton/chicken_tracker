// Requiring path to so we can use relative routes to our HTML files
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render('index');
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render('index');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Flock]
    }).then((result) => {
      console.log(result.dataValues)
      res.render("profile", result.dataValues);
    });
  })

  app.get('/flock/:id', isAuthenticated, (req, res) => {
    db.Flock.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id
      },
      include: [db.DailyRecord]
    }).then(result => {
      console.log(result)
      res.render("flock", result)
    })
  })

};
