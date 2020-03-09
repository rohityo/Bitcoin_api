const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
 

const app = express();
// const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/ticker_currency', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

  var data = mongoose.Schema({
    data:Object
  });

var mongo_data = mongoose.model('mongo_data',data, 'data_store');


const ticker_curr = express.Router();
app.use('/',ticker_curr)
require ("./ticker_curr")(ticker_curr, app, mongo_data,axios);


app.listen(8080);
console.log("port is workking...")


