const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Define midlewares
const databaseMiddleware = require('./middlewares/databaseMiddleware');
const timeMiddleware = require('./middlewares/timeMiddleware');

// Define Routes
const authRoutes = require('./routes/authRoutes');
const linkRoutes = require('./routes/linkRoutes');
const getLinkRoutes = require('./routes/getLinkRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')



const app = express();


app.use(cors());

app.use(bodyParser.json());

app.use(databaseMiddleware);
app.use(timeMiddleware);


app.use('/auth', authRoutes);
app.use('/link', linkRoutes);
app.use('/getLink', getLinkRoutes);
app.use('/dashboard', dashboardRoutes)



module.exports = app;