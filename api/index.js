const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const compression = require('compression');
// const path = require('path');

const studentsRoutes = require('./routes/students')
const teachersRoutes = require('./routes/teachers');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const { hashPassword } = require("./utils/util");

const app = express();
app.use(cors()); // this is allow request from different post (3001 => 3000)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(compression());

// app.use('/', express.static(path.join(__dirname, 'build')));
// app.use('/public', express.static(path.join(__dirname, 'build')));
// app.use('/school', express.static(path.join(__dirname, 'build')));

app.use('/api', studentsRoutes);
app.use('/api', teachersRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const hash = hashPassword(Date.now().toString())
console.log({ hash })
app.get('/', (req, res) => res.json({
    welcome: Date.now()
}));


const port = 3000;
app.listen(port, (req, res) => console.log(`Listening at port ${port}`));
