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

app.use(function (req, res, next) {
    res.setHeader(
        'Content-Security-Policy', "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self'  'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self'; frame-src 'self' http://player.vimeo.com; report-uri https://csper.io/; connect-src 'self' https://vimeo.com; media-src 'self' http://player.vimeo.com "
    );
    
    next();
});

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