const dataUsers = require("../models/newUser");
const bcrypt = require("bcrypt");
const passport = require("passport");


const baseRoute = (req, res) => res.render("index");

const signupRoute = (req, res) => res.render("signup");

const loginRoute = (req, res) => res.render("login", { message: req.flash("error") });

const registerUser = async (req, res) => {
    const users = new dataUsers.Users({
      firstName: req.body.fname,
      lastName: req.body.lname,
      email: req.body.email,
      location: req.body.location.toUpperCase(),
      password: await bcrypt.hash(req.body.password, 10),
    });
    try {
      const found = await dataUsers.Users.findOne({ email: users.email });
      if (found) {
        res.send("This email is already regisered, If it is yours Please login");
        return false;
      } else {
        users.save().then(() => res.redirect("/login"));
        return true;
      }
    } catch (err) {
      console.error(err);
      res.redirect("/signup");
    }
  };

  const dashboardRoute = (req, res) => {
    if (!req.user) {
      return res.redirect("/login"); // not logged-in
    } else {
      // ok, req.user is defined
      res.render('dashboard', {name: req.user.firstName});
    }
  };

  const logoutRoute = (req, res) => {
    req.logout(req.user, err =>{
        if (err) return next(err);
    });
    res.redirect("/login");
  };

  const checkAuthenticated = (req, res, next) =>{
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
  };
  const checkNotAuthenticated = (req, res, next) =>{
    if (req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    next();
  };

module.exports = {
    baseRoute,
    signupRoute,
    loginRoute,
    registerUser,
    dashboardRoute,
    logoutRoute,
    checkAuthenticated,
    checkNotAuthenticated
}