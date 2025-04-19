const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const databaseMiddleware = require('./middlewares/databaseMiddleware');
const timeMiddleware = require('./middlewares/timeMiddleware');


const authRoutes = require('./routes/authRoutes')



const app = express();


app.use(cors());

app.use(bodyParser.json());

app.use(databaseMiddleware);
app.use(timeMiddleware);


app.use('/auth', authRoutes)



module.exports = app;