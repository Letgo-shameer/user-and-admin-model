const express = require("express");
const sessions = require("express-session"); 
const db = require('./server/db/dbConnect');
const dotenv = require("dotenv");
const userRouter = require('./server/routes/userRouter');
const adminRouter = require('./server/routes/adminRouter');


//app init and middlewares
const app = express(); 
app.use(express.static('public'));
app.use(express.urlencoded({ extended : false })); //query string library
app.use(sessions({ 
    secret : 'verygoodpassword',
    resave : false,
    saveUninitialized : true,
    cookie : { maxAge : 6000000}   // 1 hr
 }))

//clear cache
app.use(function (req, res, next) {
    res.set('cache-control', 'no-cache , no-store,must-revalidate,max-stale=0,post-check=0,pre-checked=0');
    next();
});

//Setting port
dotenv.config({ path : 'config.env'});
const PORT = process.env.PORT || 3000

//setting view engine
app.set('view engine', 'ejs');

//connecting to db and listening to port
const callback = (err) => {
    if(!err) {
        app.listen(PORT, () => {
            console.log(`listening to port ${PORT}`);
        })
    }
}

db.connectDb(callback)

//setting routes
app.use(userRouter)
app.use(adminRouter)

