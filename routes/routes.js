const express = require("express");
const controller = require('../controller/appController')
const passport = require("passport");

const router = express.Router();

router.get("/", controller.checkNotAuthenticated, controller.baseRoute);
router.get("/signup", controller.checkNotAuthenticated, controller.signupRoute);
router.get("/login", controller.checkNotAuthenticated, controller.loginRoute);

router.post("/", controller.checkNotAuthenticated, controller.registerUser);

router.post('/login', controller.checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true

}));

router.get('/dashboard', controller.checkAuthenticated, controller.dashboardRoute);


router.delete("/logout", controller.checkAuthenticated, controller.logoutRoute);

module.exports = router;
