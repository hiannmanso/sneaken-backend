import database from '../database.js';

export async function productsPOST(req, res) {
	let item = req.body;
	const { authorization } = req.headers;
	const newObj = {
		model: item.model,
		price: item.price,
		image: item.image,
	};
	const token = authorization?.replace('Bearer', '').trim();
	if (token) {
		try {
			let access = await database
				.collection('session')
				.find({ token: token })
				.toArray();
			if (access.length !== 0) {
				await database.collection('products').insertOne(item);
				await database.collection('productsHome').insertOne(newObj);
				res.sendStatus(201);
			} else {
				res.sendStatus(404);
			}
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	} else {
		res.sendStatus(422);
	}
}

export async function productsGET(req, res) {
	try {
		let products = await database
			.collection('productsHome')
			.find({})
			.toArray();
		res.send(products);
	} catch {
		res.sendStatus(500);
	}
}
// >>>>>>> 4c83157ca3b7c6ed852c7058d7e913d33dc1c81f
