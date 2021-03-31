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

//home page
const home = require('./controllers/home.js');
app.get('/', home);
//req login
const login = require('./controllers/login.js');
app.post('/login',login);
//admin page
const admin = require('./controllers/admin.js');
app.get('/admin', authMiddleware, admin);
//user page
const user = require('./controllers/user.js');
app.get('/user', authMiddleware, user);
//borrowBook page
const borrowBook = require('./controllers/borrowBook.js');
app.get('/user/borrowBook/:code', authMiddleware, borrowBook);
//borrowBook of admin page
const borrowBookAdmin = require('./controllers/borrowBookAdmin.js');
app.get('/admin/borrowBook/:code', borrowBookAdmin);
//borrowBoo with code of user
const borrowBookWithCode = require('./controllers/borrowBookWithCode.js');
app.get('/user/borrowBook', authMiddleware, borrowBookWithCode);
//borrow book with code of admin
const borrowBookWithCodeAdmin = require('./controllers/borrowBookWithCodeAdmin.js');
app.get('/admin/borrowBook', authMiddleware, borrowBookWithCodeAdmin);
//addBook page
const addBook = require('./controllers/addBook.js');
app.get('/admin/addBook', authMiddleware, addBook);
//delete book page
const deleteBook = require('./controllers/deleteBook.js');
app.get('/admin/deleteBook', authMiddleware, deleteBook);
//request update book
const updateBook  = require('./controllers/UpdateBook.js');
app.post('/admin/updateBook', authMiddleware, updateBook);
//addUser page
const addUser = require('./controllers/addUser.js');
app.get('/admin/addUser', authMiddleware, addUser);
//request store book
const storeBook = require('./controllers/storeBook.js');
app.post('/admin/addBook/store', authMiddleware, storeBook);
//request delete book
const deleteBookStore = require('./controllers/deleteBookStore');
app.post('/admin/deleteBook/store', authMiddleware, deleteBookStore);
//request update book
const updateBookStore = require('./controllers/updateBookStore.js');
app.post('/admin/updateBook/store', authMiddleware, updateBookStore);
//request borrow book of user
const borrowBookStore = require('./controllers/borrowBookStore.js');
app.post('/user/borrowBook/:code/store', authMiddleware, borrowBookStore);
//request borrow book of admin
const borrowBookStoreAdmin = require('./controllers/borrowBookAdminStore.js');
app.post('/admin/borrowBook/:code/store', authMiddleware , borrowBookStoreAdmin);
//request borrow book with code book of user
const borrowBookStoreWithCode = require('./controllers/borrowBookStoreWithCode.js');
app.post('/user/brrowBook/store', authMiddleware, borrowBookStoreWithCode);
//request borrow book with code book of admin
const borrowBookStoreWithCodeAdmin = require('./controllers/borrowBookStoreWithCodeAdmin');
app.post('/admin/borrowBook/store', borrowBookStoreWithCodeAdmin);
//request add user
const addUserStore = require('./controllers/addUserStore.js');
app.post('/admin/addUser/store', authMiddleware, addUserStore);
//return home
const logout = require('./controllers/logout.js');
app.get('/logout', logout);
//borrowing page
const borrowing = require('./controllers/borrowing.js');
app.get('/user/borrowing', authMiddleware, borrowing);
//reuturn book page
const borrowingAdmin = require('./controllers/borrowingAdmin.js');
app.get('/admin/return', authMiddleware, borrowingAdmin);
//request return book
const returnStore = require('./controllers/returnBook.js');
app.get('/admin/return/:id', authMiddleware, returnStore);