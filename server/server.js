const express = require('express');
const passport = require('passport');
require('./config/passport')(passport);
require('./config/mongoose')
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const userRouter = require('./routers/user');
const questionRouter = require('./routers/question');
const session = require('express-session');

const app = express();
const port = 5000;

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true, 
      cookie: {
        maxAge: 6000000
      }
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/user', userRouter);
app.use('/', questionRouter);


app.listen(port, () => console.log(`Server Started at port ${port}`));