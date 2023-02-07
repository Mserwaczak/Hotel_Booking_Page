const express = require("express");
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const port = 4000;

app.use(cookieParser());

dotenv.config()

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());



mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"))



app.use(cors())
app.use('/app', routesUrls)
app.listen(port, () => {
    console.log(`server is running ... port ${port}`);
});