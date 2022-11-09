const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv/config');
const router = require('./routes/routes');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const initializePassport = require('./passport-config');
const gridfsStrem = require('gridfs-stream');
const methodOverride = require('method-override');


initializePassport(passport);



const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>app.listen(PORT, () => console.log(`mongoDB database connected\nServer is running at ${PORT}`)))
.catch(err => console.error(err));

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(methodOverride('_method'));
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
app.use(passport.session());
app.use(express.static('public'));
app.use('/', router);
app.use((req, res) => res.status(404).render('errorPage'));
