require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const initRoutes = require('./routes/web');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passPort = require('passport');
const session = require('./config/session');
const connectDB = require('./config/connectDB');


const app = express();
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

session.configSession(app);

configViewEngine(app);

app.use(passPort.initialize());
app.use(passPort.session());

initRoutes(app);

connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
    console.log(`App listening on port http://localhost:${PORT}`);
})