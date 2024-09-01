//from HERE
const express = require("express");
const user = express();

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

user.use(bodyParser.urlencoded({ extended:true }));

user.use(express.static(path.resolve(__dirname,'public')));

var storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'./public/uploads') // where csv file is stored
    },
    filename:(req,file,cb)=> {
        cb(null,file.originalname)
    }
});

var upload = multer({ storage:storage });
// till HERE
 
const userController = require('../controllers/userController');

//Routing created here
user.post('/importUser',upload.single('file'),userController.importUser); // this statement requires a method from controller which is importUser
//'file' is name of file in postman


module.exports = user;