const express = require('express');
const passport = require('passport');
require('./config/passport')(passport);
require('./db/mongoose')
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');

const app = express();
const port = 5000;

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use('/', loginRouter);
app.use('/', registerRouter);


app.listen(port, () => console.log(`Server Started at port ${port}`));