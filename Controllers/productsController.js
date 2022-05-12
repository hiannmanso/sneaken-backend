import database from '../database.js';
import Joi from 'joi';

let itemSchema = Joi.object({
	brand: Joi.string().min(1).required(),
	model: Joi.string().min(1).required(),
	amount: Joi.number().required(),
	price: Joi.string().min(1).required(),
});

export async function productsPOST(req, res) {
	let item = req.body;
	let { error } = itemSchema.validate(item);
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer', '').trim();
	if (error === undefined && token) {
		try {
			let access = await database
				.collection('session')
				.find({ token: token })
				.toArray();
			if (access.length !== 0) {
				await database.collection('products').insertOne(item);
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
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer', '').trim();
	if (token) {
		try {
			let access = await database
				.collection('session')
				.find({ token: token })
				.toArray();
			if (access.length !== 0) {
				let products = await database
					.collection('products')
					.find()
					.toArray();
				res.send(products);
			} else {
				res.sendStatus(404);
			}
		} catch {
			res.sendStatus(500);
		}
	} else {
		res.sendStatus(422);
	}
}
