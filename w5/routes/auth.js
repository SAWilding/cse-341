const routes = require('express').Router();
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// OAuth 2

const store = new MongoDBStore({
  uri: process.env.URI,
  collection: 'sessions'
});

app
  .use(
    session({
      secret: '123456',
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 }
    })
  )
  .use(passport.initialize())
  .use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
  cb(null, id);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: 'https://wilding-cse-341.onrender.com/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

const isAuth = (req, res, next) => {
  // Perform authentication for other requests
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

routes.get('/', isAuth, (req, res) => {
  swagger = false;
  res.sendFile(__dirname + '/dashboard.html');
});

routes.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.sendFile(__dirname + '/login.html');
});

routes.get('/logout', (req, res) => {
  swagger = false;
  req.logout(function (err) {
    if (err) {
      // Handle any error that occurred during logout
      console.error(err);
      return res.status(500).send('Error logging out');
    }
  });
  res.redirect('/login');
});

routes.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

routes.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = routes;
