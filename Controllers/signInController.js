import { v4 } from 'uuid';
import database from '../database.js';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export async function signInPOST(req, res) {
	const { email, password } = req.body;
	const token = v4();

	try {
		const user = await database.collection('accounts').findOne({ email });
		if (!user && bcrypt.compareSync(password, user.password))
			return res
				.status(400)
				.send(
					'conta não encontrada, por favor cheque os dados passados.'
				);
		const session = await database.collection('session').insertOne({
			userId: user._id,
			token,
		});
		if (!session)
			return res
				.status(400)
				.send(`não foi possivel criar uma nova sessão.`);

		res.status(200).send(token);
	} catch (error) {
		res.status(400).send(`Erro no login: ${error}`);
	}
}

export async function signInGET(req, res) {
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer', '').trim();
	if (!token)
		return res.status(400).send(`erro em encontrar o token: ${token}`);
	try {
		const session = await database.collection('session').findOne({ token });
		if (!session) return res.status(400).send(`token: ${token}`);
		const account = await database
			.collection('accounts')
			.findOne({ _id: ObjectId(session.userId) });
		delete account.password;
		res.status(200).send(account);
	} catch (error) {
		res.status(400).send(
			`erro em pegar dados do usuário: ${error} ${session}, ${account}`
		);
	}
}

export async function signInPUT(req, res) {
	const { name, lastname, email, cpf, sex, birtday, cellphone } = req.body;
	try {
		const setUserInfos = await database
			.collection('accounts')
			.findOneAndUpdate(
				{ email },
				{
					$set: {
						name,
						lastname,
						email,
						cpf,
						sex,
						birtday,
						cellphone,
					},
				}
			);
		res.status(200).send(`informações de usuário trocadas com sucesso.`);
	} catch (error) {
		res.status(400).send(
			`error ao alterar informações de usuário: ${error}`
		);
	}
}
