
const handleSignIn = (req, res, db, bcrypt)=>{
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
}


module.exports = {
	handleSignIn: handleSignIn
}