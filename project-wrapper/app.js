require('dotenv').config();

//REQUIRE GENERAL
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

//REQUIRE AUTH
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();


//MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//PATH
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

//HBS ERROR 
hbs.registerHelper('ifUndefined', (value, options) => {
    if (arguments.length < 2)
        throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
    if (typeof value !== undefined ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
  });


//TITLE INDEX
app.locals.title = 'Project Web API';


//AUTH SESSION + PASSPORT
app.use(session({
    secret: 'webapp',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);
  

//ROUTES
const index = require('./routes/index');
app.use('/', index);
  
// const authRoutes = require('./routes/auth');
// app.use('/auth', authRoutes);
        
  
module.exports = app;