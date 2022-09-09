const express = require('express');
const path = require('path');
const port = 8000;

//* Database & Schema *//
const db = require('./config/mongoose');
const contact = require('./models/contact');

const app = express();

//* Set up View engine *//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//* Parsing Data from browser *//
app.use(express.urlencoded());

//* Accessing Static Files *//
app.use(express.static('assets'));

//* middleware *//
// app.use(function (req, res, next) {
//   console.log('middleware 1 called');
//   next();
// });

// app.use(function (req, res, next) {
//   console.log('middleware 2 called');
//   next();
// });

//* Test data *//
// var contactList = [
//   {
//     name: 'Fluck',
//     phone: '123456789',
//   },
//   {
//     name: 'Meiw',
//     phone: '987654321',
//   },
//   {
//     name: 'Foitong',
//     phone: '123654789',
//   },
// ];

//* Request & Response *//
app.get('/', function (req, res) {
  contact.find({}, function (err, contacts) {
    if (err) {
      console.log('Error in fetching data from database');
      return;
    }

    return res.render('home', {
      title: 'List of Contacts',
      contact_list: contacts,
    });
  });
});

app.post('/create-contact', function (req, res) {
  // console.log(req.body); //{ name: 'asdsa', phone: '123124' }
  // console.log(req.body.name); //asdsa
  // console.log(req.body.phone); //123124
  // contactList.push(req.body);
  //* Create on database *//
  contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log('Error in creating new Contact ');
        return;
      }

      // console.log('Creating new Contact', newContact);
      return res.redirect('back');
    }
  );
});

app.get('/delete-contact', function (req, res) {
  /* ?phone=<%= i.phone %>&name=<%= i.name %> */
  // console.log(req.query); //{ phone: '123456789', name: 'Fluck' }
  //* get id from query in the url *//
  let id = req.query.id;

  //* fine the contact by id and delete *//
  contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log('Error on Deleting data from database');
      return;
    }

    return res.redirect('back');
  });
});

//* Running our Server on Port *//
app.listen(port, function (err) {
  if (err) {
    console.log('Error in running the server');
  }

  console.log('Express server is running on port 8000');
});
