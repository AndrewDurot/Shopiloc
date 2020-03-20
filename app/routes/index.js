const mongoose = require('mongoose');
const homeServices = require('../services/home');

import admin from './admin';
import search from './search';
import store from './store';
import users from './users';

export default function routes(app) {
  app.get('/', homeServices.get_store);
  app.post('/', homeServices.get_Search);
  app.get('/create', homeServices.create_store);
  app.get('/about', (req, res) => {
    res.render('about');
  });
  app.use('/admin', admin);
  app.use('/user', users);
  app.use('/store', store);
  app.use('/search', search);
  app.get('/country_List', homeServices.get_country);
  app.get('/country', homeServices.get_all_country);
  app.get('/state', homeServices.get_all_state);
  app.get('/Check_Url', homeServices.Check_Url);
}
mongoose.connect(
  'mongodb+srv://Farukh:110581F.A@rest-6ss50.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  ()=> console.log("Connected to db!")
);
