// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/todo_list_db');

// const db = mongoose.connection;
// db.on('error', console.log.bind(console, 'error connecting to db'));

// db.once('open', function(){
//     console.log("successfully connected to database");
// });

//****************************NEW CONNECTION TO CONNECT TO CLOUD BASED DATABASE--**************************************
const mongoose = require('mongoose');
const {mongoClient} = require('mongodb')

//const uri = "mongodb+srv://uchihabloodline:YDRYCt9TqNJeQB3a@cluster0-lx13z.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb+srv://uchihabloodline:YDRYCt9TqNJeQB3a@cluster0.lx13z.mongodb.net/Ecommerce?retryWrites=true&w=majority";
// const pass = "YDRYCt9TqNJeQB3a";
// const dbuser = "uchihabloodine";
// const dbname = "Ecommerce";

mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

db.on('error', console.error.bind(console,"error connecting to DB!!"));

// db.on('disconnected', () => {
//     console.log('Mongoose connection is disconnected...');
//   })

db.once('open', function(){
    console.log('Successfully connected to Atlas DB!');
})

 module.exports = db;

