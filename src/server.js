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
const cors = require('cors');
const helmet = require('helmet');

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


app.use(
    helmet({
        referrerPolicy: { 
            policy: 'strict-origin-when-cross-origin' 
        }
    })
);

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["self"],
            scriptSrc: ["self", 'nonce-random-nonce-value', 'unsafe-inline']
        },
    })
);
// app.use(function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     next();
// });

const corsOptions = {
    origin: "*",
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
};
  

initRoutes(app);

const PORT = process.env.PORT || 8080;


app.use(cors(corsOptions));

app.listen(PORT, (req, res) => {
    console.log(`App listening on port http://localhost:${PORT}`);
})