const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware.js')


const app = express();
app.use(expressSession({
    secret: 'keyboard cat'
}));
mongoose.connect('mongodb://localhost/database_library',{useNewUrlParser: true});
const Book = require('./models/books.js');
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.raw());
app.use(fileUpload());

let code;

app.listen(4000, () => {
    console.log("Listen on port 4000");
});

const home = require('./controllers/home.js');
app.get('/', home);

const login = require('./controllers/login.js');
app.post('/login',login);

const admin = require('./controllers/admin.js');
app.get('/admin', authMiddleware, admin);

const user = require('./controllers/user.js');
app.get('/user', authMiddleware, user);

const borrowBook = require('./controllers/borrowBook.js');
app.get('/user/borrowBook/:code', authMiddleware, borrowBook);

const borrowBookAdmin = require('./controllers/borrowBookAdmin.js');
app.get('/admin/borrowBook/:code', borrowBookAdmin);

const borrowBookWithCode = require('./controllers/borrowBookWithCode.js');
app.get('/user/borrowBook', authMiddleware, borrowBookWithCode);

const borrowBookWithCodeAdmin = require('./controllers/borrowBookWithCodeAdmin.js');
app.get('/admin/borrowBook', authMiddleware, borrowBookWithCodeAdmin);

const addBook = require('./controllers/addBook.js');
app.get('/admin/addBook', authMiddleware, addBook);

const deleteBook = require('./controllers/deleteBook.js');
app.get('/admin/deleteBook', authMiddleware, deleteBook);

const updateBook  = require('./controllers/UpdateBook.js');
app.post('/admin/updateBook', authMiddleware, updateBook);

const addUser = require('./controllers/addUser.js');
app.get('/admin/addUser', authMiddleware, addUser);

const storeBook = require('./controllers/storeBook.js');
app.post('/admin/addBook/store', authMiddleware, storeBook);

const deleteBookStore = require('./controllers/deleteBookStore');
app.post('/admin/deleteBook/store', authMiddleware, deleteBookStore);

const updateBookStore = require('./controllers/updateBookStore.js');
app.post('/admin/updateBook/store', authMiddleware, updateBookStore);

const borrowBookStore = require('./controllers/borrowBookStore.js');
app.post('/user/borrowBook/:code/store', authMiddleware, borrowBookStore);

const borrowBookStoreAdmin = require('./controllers/borrowBookAdminStore.js');
app.post('/admin/borrowBook/:code/store', authMiddleware , borrowBookStoreAdmin);

const borrowBookStoreWithCode = require('./controllers/borrowBookStoreWithCode.js');
app.post('/user/brrowBook/store', authMiddleware, borrowBookStoreWithCode);

const borrowBookStoreWithCodeAdmin = require('./controllers/borrowBookStoreWithCodeAdmin');
app.post('/admin/borrowBook/store', borrowBookStoreWithCodeAdmin);

const addUserStore = require('./controllers/addUserStore.js');
app.post('/admin/addUser/store', authMiddleware, addUserStore);

const logout = require('./controllers/logout.js');
app.get('/logout', logout);

const borrowing = require('./controllers/borrowing.js');
app.get('/user/borrowing', authMiddleware, borrowing);

const borrowingAdmin = require('./controllers/borrowingAdmin.js');
app.get('/admin/return', authMiddleware, borrowingAdmin);

const returnStore = require('./controllers/returnBook.js');
app.get('/admin/return/:id', authMiddleware, returnStore);