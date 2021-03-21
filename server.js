const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')

const app = express();

mongoose.connect('mongodb://localhost/database_library',{useNewUrlParser: true});
const Book = require('./models/books.js');
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.raw());
app.use(fileUpload());

app.listen(4000, () => {
    console.log("Listen on port 4000");
});

const home = require('./controllers/home.js');
app.get('/', home);

const admin = require('./controllers/admin.js');
app.get('/admin', admin);

const getBook = require('./controllers/getBook.js');
app.get('/getBook', getBook);

const addBook = require('./controllers/addBook.js');
app.get('/admin/addBook', addBook);

const storeBook = require('./controllers/storeBook.js');
app.post('/admin/addBook/store', storeBook);

const user = require('./controllers/user.js');
app.get('/user', user);