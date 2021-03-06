const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const CookieSession = require('cookie-session');
const keys = require('./config/keys');

require('./models/FacebookUser');
require('./models/ArtistManager');
require('./models/Artist');
require('./models/Genre');
require('./models/Post');

require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
  CookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(bodyParser.json());
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/facebookAuthRoutes')(app);

require('./routes/artistManagerRoutes')(app);
require('./routes/artistRoutes')(app);
require('./routes/postRoutes')(app);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
