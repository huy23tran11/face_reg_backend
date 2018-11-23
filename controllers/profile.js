
const handleProfile = (req,res, db) =>{
	const buffer =[]
	db.select('link').from('image')
	.where({email: req.body.email})
	.returning('link')
	.then(images => {
		images.forEach(image => {
			buffer.push(image.link)
		})
		res.json(buffer)
	})
	.catch(err => res.status(400).json(err))
}


module.exports = {
	handleProfile: handleProfile
}