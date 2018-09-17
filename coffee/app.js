var Comment         = require('./models/comment'),
    methodOverride  = require('method-override'),
    LocalStrategy   = require('passport-local'),
    flash           = require('connect-flash'),
    User            = require('./models/user'),
    Cafe            = require('./models/cafe'),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    mongoose        = require('mongoose'),
    seedDB          = require('./seeds'),
    express         = require('express'),
    app             = express();

// Routes

var commentRoutes   = require('./routes/comments'),
    cafeRoutes      = require('./routes/cafes'),
    authRoutes      = require('./routes/auth')

var url = process.env.DATABASEURL || "mongodb://localhost/coffee";
mongoose.connect(url);
// mongoose.connect('mongodb://localhost/coffee');
// mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://lisa:A13u6L!maz@ds149481.mlab.com:49481/cafes");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();

app.use(require('express-session')({
  secret: "eunoia fidel beauty mind audelia portland",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error       = req.flash("error");
  res.locals.success     = req.flash("success");
  next();
});

app.use(authRoutes);
app.use('/cafes/:id/comments/', commentRoutes);
app.use(cafeRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log('Coffee server has started');
});
