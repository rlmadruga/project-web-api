require('dotenv').config();

//REQUIRE GENERAL
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const express       = require('express');
const hbs           = require('hbs');
const mongoose      = require('mongoose');
const logger        = require('morgan');
const path          = require('path');
const favicon       = require('serve-favicon');

//REQUIRE AUTH
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

//MONGOOSE CONNECTION DATABASE
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
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));

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

  hbs.registerHelper('compare', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    var operator = options.hash.operator || "==";
    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }
    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);
    var result = operators[operator](lvalue,rvalue);
    if( result ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
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

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const api = require('./routes/api');
app.use('/api', api);
        
module.exports = app;