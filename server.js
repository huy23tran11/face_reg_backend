const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const app = express();
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const image = require('./controllers/image');
const users = require('./controllers/users');
const profile = require('./controllers/profile');
const imageUpdate = require ('./controllers/imageUpdate')

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
	ssl: true
  }
});

 // db.select('entries').from('users').then(data => console.log(typeof(data[0].entries)));

app.use(bodyParser.json());

app.use(cors());

app.post('/imageUpdate', (req,res) => imageUpdate.handleImageUpdate(req,res,db))

app.get('/',(req,res) => res.json('it is working'));
// app.get('/',(req,res) => users.handleUsers(req,res,db));

app.post('/signin',(req, res) => signIn.handleSignIn(req, res, db, bcrypt))

app.post('/register',(req, res) => register.handleRegister(req, res, db, bcrypt))

app.post('/profile',(req, res) => profile.handleProfile(req,res,db))

app.put('/image',(req, res)=> image.handleImage(req, res, db))

app.post('/imageurl', (req, res)=> image.handleAPICall(req, res))

app.listen(process.env.PORT || 3000,() =>{
	console.log(`app is running on port ${process.env.PORT }`)
})
