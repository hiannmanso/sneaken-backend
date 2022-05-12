import express from 'express';
import joi from 'joi';
import { validate } from 'uuid';
import bcrypt from 'bcrypt';

import database from '../database.js';

export async function signUpPOST(req, res) {
	const { name, email, password } = req.body;
	const encryptedPassword = bcrypt.hashSync(password, 10);

	try {
		const findUser = await database
			.collection('accounts')
			.findOne({ email });
		if (findUser)
			return res
				.status(400)
				.send('email já cadastrado, tente outro por favor!');

		const user = await database.collection('accounts').insertOne({
			name,
			email,
			password: encryptedPassword,
		});
		res.status(200).send(`conta criada com sucesso! infos: ${user}`);
	} catch (err) {
		res.status(400).send(`erro no SIGNUPOST: ${err}`);
		console.log(err);
	}
}
export async function signUpGET(req, res) {}
