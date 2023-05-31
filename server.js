const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(
function(username, password, done) {
    if (username === 'admin' && password === 'password') {
        return done(null, { username, password });
    } else {
        return done(null, false);
    }
}));
passport.serializeUser(function(user, done) {
    done(null, user.username);
});
passport.deserializeUser(function(username, done) {
    done(null, { username });
});
const middlewaresRouter = require('./routes/middlewares');
const usersRouter = require('./routes/users');
const servicesRouter = require('./routes/services');
const testimonialsRouter = require('./routes/testimonials');
const vehiclesRouter = require('./routes/vehicles');


app.use('/users', usersRouter);
app.use('/services', servicesRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/vehicles', vehiclesRouter);

app.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login',
}));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.send('Welcome to our API');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.json({ error: err.message });
});


app.listen(3000, () => console.log('Server started on port 3000'));


