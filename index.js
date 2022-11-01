// if (process.env.NODE_ENV !== 'production'){
//     require('dotenv');
// }
const password = require('./passw');
const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const DATABASE_URL = "mongodb+srv://jimmymut:" + password + "@cluster0.ldrujdj.mongodb.net/?retryWrites=true&w=majority"


const PORT = process.env.PORT || 3000;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>app.listen(PORT, () => console.log(`mongoDB database connected\nServer is running at ${PORT}`)))
.catch(err => console.error(err));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('index'));
app.get('/signup', (req, res) => res.render('signup'));

app.get('/api/products', (req, res) =>{
    res.json(producs);
})

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
// app.use(express.static(path.join(__dirname, 'public')));
