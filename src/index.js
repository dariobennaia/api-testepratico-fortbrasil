const express = require('express');
const routes  = require('./config/routes');
const cors    = require('cors');
require('dotenv/config');
require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = Number(process.env.PORT);
app.listen(port || 3000);