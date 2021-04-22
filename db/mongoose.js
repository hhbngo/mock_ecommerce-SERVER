const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database connected.');
}).catch((err) => console.log('ERROR: ' + err));