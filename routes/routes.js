const express = require("express");
const Users = require("../models/newUser");
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/signup", (req, res) => res.render("signup"));
router.get("/dashboard", (req, res) => {
  if (!req.user) {
    res.redirect("/login"); // not logged-in
    return;
  } else {
    // ok, req.user is defined
    res.render("/dashboard", { name: req.user });
  }
});

router.post("/", async (req, res) => {
  const users = new Users({
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    location: req.body.location.toUpperCase(),
    password: await bcrypt.hash(req.body.password, 10),
  });
  try {
    const found = await Users.findOne({ email: users.email });
    if (found) {
      res.render("alreadyRegisted");
      return false;
    } else {
      users.save().then(() => res.redirect("/login"));
      return true;
    }
  } catch (err) {
    console.error(err);
    res.redirect("/signup");
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      // Something went wrong authenticating user
      return next(err);
    }

    if (!theUser) {
      // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      res.render("login", { message: "Wrong password or username" });
      return;
    }

    // save user in session: req.user
    req.login(theUser, (err) => {
      if (err) {
        // Session save went bad
        return next(err);
      }

      // All good, we are now logged in and `req.user` is now set
      res.redirect("/dashboard");
    });
  })(req, res, next);
});
router.get("/login", (req, res, next) => {
  res.render("login", { message: req.flash("error") });
  //                       👆
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
