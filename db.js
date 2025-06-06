// for database connection
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/go_dp';// replace with your db name 

// set up mongodb connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// het the default connection 
//monoose maintain a default connection object representing the mongoDB connetion
const db = mongoose.connection;


// event listener for connection open
db.on('open', () => {
  console.log('MongoDB connection established successfully');
});
// event listener for connection error
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
// event listener for connection close
db.on('close', () => {
  console.log('MongoDB connection closed');
});
// event listener for connection disconnected
db.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});
// event listener for connection reconnected
db.on('reconnected', () => {
  console.log('MongoDB connection reconnected');
});
 
module.exports = db; // export the db connection for use in other files
// you can use this db connection in your models or controllers