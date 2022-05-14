import database from '../database.js';
import { v4 } from 'uuid';

export async function productsPOST(req, res) {
	let item = req.body;
	const { authorization } = req.headers;
	const newId = v4();
	const token = authorization?.replace('Bearer', '').trim();
	if (token) {
		try {
			let access = await database
				.collection('session')
				.find({ token: token })
				.toArray();
			if (access.length !== 0) {

				let update = await database.collection('products').find({model: item.model, size: item.size}).toArray();
				let verify = await database.collection('productsHome').find({model: item.model}).toArray();
				if(update.length === 0 && verify.length === 0){
					await database.collection('products').insertOne({
						brand: item.brand,
						model: item.model,
						image: item.image,
						price: item.price,
						id: newId,
						amount: item.amount,
						size: item.size,
						description: item.description
					});

					await database.collection('productsHome').insertOne({
						brand: item.brand,
						model: item.model,
						image: item.image,
						price: item.price,

						id: newId

					});
					res.sendStatus(201);
				} else if(update.length !== 0){
					let itemsAmount = update[0].amount;
					itemsAmount += item.amount;
					await database
						.collection('products')
						.updateOne(
							{ model: item.model, size: item.size },
							{ $set: { amount: itemsAmount } }
						);
					res.sendStatus(201);
				} else {
					await database.collection('products').insertOne({
						brand: item.brand,
						model: item.model,
						image: item.image,
						price: item.price,
						id: verify[0].id,
						amount: item.amount,
						size: item.size,
						description: item.description
					});
					res.sendStatus(201);
				}
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

export async function productGET(req, res){
	let product = req.params.product;
	try{
		let verify = await database.collection('products').find({id: product}).toArray();
		if(verify.length === 0){
			res.sendStatus(404)
		} else {
			res.send(verify);
		}
	} catch(e) {
		console.log(e);
		res.sendStatus(500);
	}
}
// >>>>>>> 4c83157ca3b7c6ed852c7058d7e913d33dc1c81f
