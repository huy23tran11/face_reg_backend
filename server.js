const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const app = express();


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'nguyenhuytran',
    password : '',
    database : 'smart-brain'
  }
});

 // db.select('entries').from('users').then(data => console.log(typeof(data[0].entries)));

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req,res)=>{
	res.json(database.users)
})

app.post('/signin',(req,res)=>{
	const {email, password} = req.body;
	db.select('hash').from('login')
	.where({email: email})
	.then(hashDb =>{
		// console.log(hashDb[0].hash)
		if(bcrypt.compareSync(password, hashDb[0].hash)){
			db.select('*').from('users')
			.where({email: email})
			.returning('*')
			.then(user => res.json(user[0]))
		}
		else return res.status(400).json('fail, password is not correct')
	})
	.catch(err => {
		res.status(400).json('fail, email is not correct');
		console.log(err)
	})
})

app.post('/register',(req,res)=> {
	const {email, name, password} = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash : hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
		trx ('users')
		.returning("*")
		.insert({
			name: name,
			email: email,
			joined: new Date()
		}).then(user => {
			res.json(user[0])
		}).then(trx.commit)
		.catch(trx.rollback)
		.catch(err => res.status(400).json('unable to join'))
	})
		.catch(err => res.status(400).json('unable to join'))
})
	.catch(err => res.status(400).json('unable to join'))
})

app.get('/profile/:id',(req,res)=>{
	const {id}= req.params;
	db.select('*').from('users').where({
		id: id
	}).then(user => {
		if (user.length) {
			res.json(user[0]);
		}

		else res.status(400).send('not found');
	})
		.catch(err => res.status(400).send('not found'))
})

app.put('/image',(req, res)=>{
	const {id}= req.body;
	db('users').where('id', '=', id)
		.increment('entires',1)
		.returning('entires')
		.then(count => {
			res.json(count[0])
	})
		.catch(err => res.status(400).send('not found'))
})


app.listen(3000,() =>{
	console.log('app is running on port 3000')
})
