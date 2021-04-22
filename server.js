const express = require('express');
const cors = require('cors');
const {morganChalked} = require('./middleware/morgan/morganChalked');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
require('./db/mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '2mb'}));
app.use(morganChalked);
fs.readdirSync('./routes').map(r => app.use('/api', require(`./routes/${r}`)));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is up on port ${port}`));