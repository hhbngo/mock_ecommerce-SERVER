const admin = require('firebase-admin');

const serviceAccount = require('../config/a-commerce-8652f-firebase-adminsdk-t2agr-cb323e9995.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;