const mongoose = require('mongoose');

//* connect to the database *//
mongoose.connect('mongodb://localhost/list_of_contact_db');

//* acquire the connection (to check if it is succesful) *//
const db = mongoose.connection;

//* check error *//
db.on('error', console.error.bind(console, 'error connecting to db'));

//* DB up and running then print the message *//
db.once('open', function () {
  console.log('Successfully connected on the database');
});
