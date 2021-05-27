const express = require('express');
require("dotenv").config();
const path = require('path');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const groceryRouter = require('./routes/grocery');
const cors = require("cors");

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  function(err){
      if(err){
          console.log("err", err);
      }
      else{
          console.log("Connected to DB successfully");
      }
  }
  );
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/grocery", groceryRouter);
module.exports = app;
