

const handleRegister = (req,res, db, bcrypt) => {
	const {email, name, password} = req.body;
	if (!email || !name || !password){
		return res.status(400).json('wrong submittion form')
	}

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
}


module.exports = {
	handleRegister: handleRegister
}