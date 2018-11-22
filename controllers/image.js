const Clarifai = require('clarifai')

const app = new Clarifai.App({
 apiKey: 'f8150b2572ba4d31923141f490b3cf36'
});

const handleAPICall = (req,res )=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => {console.log(err); res.status(400).json('fail')})
}

const handleImage = (req, res, db)=>{
	const {id}= req.body;
	db('users').where('id', '=', id)
		.increment('entires',1)
		.returning('entires')
		.then(count => {
			res.json(count[0])
	})
		.catch(err => res.status(400).send('not found'))
}


module.exports = {
	handleAPICall: handleAPICall,
	handleImage: handleImage
}