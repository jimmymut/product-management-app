const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv/config');
const router = require('./routes/routes');
const passport = require('passport');
const Users = require('./models/newUser');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const LocalStrategy = require('passport-local').Strategy;
const gridfsStrem = require('gridfs-stream');
const methodOverride = require('method-override');


const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>app.listen(PORT, () => console.log(`mongoDB database connected\nServer is running at ${PORT}`)))
.catch(err => console.error(err));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DATABASE_URI
        })
    })
);
app.use(passport.initialize())
app.use(passport.authenticate('session'));
app.use(express.static('public'));
app.use('/', router);

passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((id, done) => {
    Users.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err))
    ;
  });
  passport.use(new LocalStrategy(
    {passReqToCallback: true},
    (...args) => {
      const [req,,, done] = args;
  
      const {email, password} = req.body;
  
      Users.findOne({email})
        .then(user => {
          if (user === null) {
            return done(null, false, { message: "No user with this email" });
          }
            
          else if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: "Incorrect password" });
          }
          else{
            return done(null, user);
          }               
        })
        .catch(err => done(err))
    }
  ));   
      
app.use((req, res) => res.status(404).render('errorPage'));
