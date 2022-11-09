const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const dataUsers = require('./models/newUser');

function initialize(passport){
    const authenticateUsers = async (email, password, done) =>{
    dataUsers.Users.findOne({email})
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
          
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Incorrect password" });
        }
    
        done(null, user);
      })
      .catch(err => done(err));
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUsers))
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((id, done) => {
        return done(null, dataUsers.Users.findById(id))
    })
    }
    
module.exports = initialize;