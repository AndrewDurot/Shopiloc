const mongoose = require('mongoose');
var home_services = require('../services/home');

import admin from './admin';
import search from './search';
import store from './store';
import users from './users';

export default function routes(router) {
  /* GET home page. */
  router.get('/', home_services.get_store);


  /* Post home page. */
  router.post('/', home_services.get_Search);
  /* Store create Form */
  router.get('/create', home_services.create_store);
//about page
  router.get('/about', (req, res) => {
    res.render('about');
  })
//admon User 
  router.use('/admin', admin);
//Basic User 
  router.use('/user', users);
  router.use('/store', store);
// Search Store
  router.use('/search', search);
//Country List
  router.get('/country_List', home_services.get_country);
//All country List
  router.get('/country', home_services.get_all_country);
//All state List
  router.get('/state', home_services.get_all_state);
//Url List
  router.get('/Check_Url', home_services.Check_Url);
}
mongoose.connect(
  'mongodb+srv://Farukh:110581F.A@rest-6ss50.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  ()=> console.log("Connected to db!")
);
