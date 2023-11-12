const http = require('http');
const app = require('./app');

const AuthRoute = require('./api/routes/auth');
const bodyParser = require('body-parser');

//app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

//server.listen(port);

const hostname = '127.0.0.1'; 
const port = process.env.PORT || 3200;
//app.listen(port, () => { 
    server.listen(port, () => { 
console.log(`Server is running at http://${hostname}:${port}/`); 
});


app.use('/api', AuthRoute)