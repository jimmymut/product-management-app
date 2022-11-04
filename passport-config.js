//const passport = require('passport');

// const bcrypt = require('bcrypt');

// function initialize(passport, getUserByEmail, getUserById){
//     const authenticateUser = async (email, password, done) =>{
//         const user = getUserByEmail(email)
//         if (user == null){
//             return done(null, false, {message: 'No user with this email'})
//         }
//         try {
//             if (await bcrypt.compare(password, user.password)){
//                 return done(null, user)
//             }else{
//                 return done(null, false, {message: 'password incorrect!'})
//             }
//         } catch (error) {
//             return done(error)
//         }
//     }
// }
// passport.serializeUser((user, done) => done(null, user._id))
//     passport.deserializeUser((id, done) => {
//         Users.findById(id)
//           .then(user => done(null, user))
//           .catch(err => done(err))
//         ;
//       });
//       passport.use(new LocalStrategy(
//         {passReqToCallback: true},
//         (...args) => {
//           const [req,,, done] = args;
      
//           const {email, password} = req.body;
      
//           Users.findOne({email})
//             .then(user => {
//               if (!user) {
//                 return done(null, false, { message: "No user with this email" });
//               }
                
//               if (!bcrypt.compareSync(password, user.password)) {
//                 return done(null, false, { message: "Incorrect password" });
//               }
          
//               done(null, user);
//             })
//             .catch(err => done(err))
//           ;
//         }
//       ));

// module.exports = initialize;