const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const groceryRouter = require('./routes/grocery');
const cors = require("cors");

mongoose.connect("mongodb+srv://datagrocery:1234@grocerydata.j7ntn.mongodb.net/grocery?retryWrites=true&w=majority", {
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
