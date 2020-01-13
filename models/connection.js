
// require pgp, call it immediately so we can configure the connection

const pgp = require('pg-promise')({
    query: e=> {
        console.log(`QUERY: ${e.query}`);
    }
});

// give it info about our specific database 
const options = {
    host: 'localhost',
    database: 'fullstack-pets'
};

const db = pgp(options);
module.exports = db;