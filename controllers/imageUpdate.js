
const handleImageUpdate = (req,res, db) => {
	const {email, link} = req.body;
	console.log(email,link)
	
	db.insert({
		email: email,
		link: link
	}).into('image')
	.then(response => res.json('Okay'))
	.catch(err => {
		res.status(400).json('fail');
		console.log(err)
	})
}


module.exports = {
	handleImageUpdate: handleImageUpdate
}