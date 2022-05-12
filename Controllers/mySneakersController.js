import { ObjectId } from 'mongodb';
import database from '../database.js';

export async function mySneakersPOST(req, res) {
	const { brand, model, amount, price, size, color } = req.body;
	const { userID, name } = req.headers;

	//627c510511dfd0d3b9651510 id pra teste
	//hiann name pra teste
	//email:hiaann@hiann.com
	//password:hiann
	try {
		const sneaker = await database
			.collection('products')
			.findOne({ brand, model, size, color });
		console.log(sneaker);
		if (parseInt(sneaker.amount) === 0)
			return res.status(400).send(`Produto esgotado!`);
		if (parseInt(sneaker.amount) > amount) {
			return res
				.status(400)
				.send(
					`Não temos mais essa quantidade de tenis no nosso estoque. tente novamente`
				);
		}
		const insertSneaker = await database
			.collection('mysneakers')
			.insertOne({
				userInfos: { userID, name },
				sneakerInfos: {
					brand,
					model,
					amount,
					price,
					size,
				},
			});
		res.status(200).send(`item adicionado ao carrinho: ${insertSneaker}`);
	} catch (error) {
		res.status(400).send(`erro ao adicionar item ao carrinho : ${error}`);
	}
}
export async function mySneakersGET(req, res) {
	const { userID } = req.headers;
	const sneakerSoldOff = [];
	try {
		const my_sneakers = await database
			.collection('mysneakers')
			.find({ userID })
			.toArray();

		//fazer uma validação para ver se ainda tem o tenis no estoque
		for (let sneaker of my_sneakers) {
			if (sneaker.sneakerInfos.amount === 0) {
				sneakerSoldOff.push(sneaker);
				console.log(sneakerSoldOff);
			}
		}

		if (!my_sneakers)
			return res.status(400).send(`Seu carrinho está vazio!`);
		res.status(200).send(my_sneakers);
	} catch (error) {
		res.status(400).send(`erro em buscar seus itens: ${error}`);
	}
}
export async function mySneakersDELETE(req, res) {
	const { sneakerID } = req.headers;

	try {
		const deletedSneaker = await database
			.collection('mysneakers')
			.findOneAndDelete({ _id: new ObjectId(sneakerID) });
		if (deletedSneaker.deletedCount !== 1)
			return res.status(400).send(`Item não deletado: ${deletedSneaker}`);
		res.status(400).send(`Item deletado com sucesso!`);
	} catch (error) {
		res.status(400).send(`problema ao deletar item: ${error}`);
	}
}

//ARRUMAR ESSA FUNÇÃO DE EDIT (botar os parametros de edição certinho)
export async function mySneakersPUT(req, res) {
	const { sneakerID } = req.headers;
	const { amount } = req.body;
	try {
		const editRequest = await database
			.collection('mysneakers')
			.findOneAndUpdate(
				{
					_id: new ObjectId(sneakerID),
				},
				{ $set: { amount } }
			);
	} catch (error) {
		res.status(400).send(`Erro ao editar item: ${error}`);
	}
}

//TO DO:: MIDDLEWARE DE VALIDAÇÃO SE O USUÁRIO QUE ESTÁ FAZENDO ESSAS REQUEST É O MESMO USUÁRIO LOGADO
