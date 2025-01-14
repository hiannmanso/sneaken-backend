import database from '../database.js';

export async function mySneakersPOST(req, res) {
	const item = req.body;
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer', '').trim();
	if(token){
		try {
			let user = await database.collection('session').find({token: token}).toArray();
			if(user.length !== 0){
				const sneaker = await database
					.collection('products')
					.findOne({model: item.model, size: item.size});
				if (sneaker.amount === 0){
					return res.status(400).send(`Produto esgotado!`);
				} else {
					const insertSneaker = await database
					.collection('mysneakers')
					.insertOne({
						userInfos: {userID: user[0].userId},
						sneakerInfos: {
							brand: item.brand,
							model: item.model,
							price: item.price,
							size: item.size,
							amount: 1
						},
					});
				res.status(200).send(`item adicionado ao carrinho: ${insertSneaker}`);	
				}
			} else {
				res.sendStatus(404);
			}
		} catch (error) {
			res.status(400).send(`erro ao adicionar item ao carrinho : ${error}`);
		}
	} else {
		res.sendStatus(422);
	}
}
export async function mySneakersGET(req, res) {
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer', '').trim();
	if(token){
		try {
			let user = await database.collection('session').find({token: token}).toArray();
			if(user.length !== 0){
				let mySneaker = await database.collection('mysneakers').find({userInfos:{userID: user[0].userId}}).toArray();
				res.send(mySneaker);
			} else {
				res.sendStatus(404);
			}
		} catch (error) {
			res.status(400).send(`erro em buscar seus itens: ${error}`);
		}
	} else {
		res.sendStatus(422);
	}
}
export async function mySneakersDELETE(req, res) {
	const item = req.body;
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer', '').trim();
	if(token){
		try{
			let user = await database.collection('session').find({token: token}).toArray();
			if(user.length !== 0){
				let sneakers = await database.collection('mysneakers').find({userInfos:{userID: user[0].userId}}).toArray();
				for(let i=0;i<sneakers.length;i++){
					if(sneakers[i].sneakerInfos.model === item.model && sneakers[i].sneakerInfos.size === item.size){
						await database.collection('mysneakers').deleteOne({_id: sneakers[i]._id});
						break;
					}
				}
				res.sendStatus(200);				
			} else {
				res.sendStatus(404);
			}
		} catch(e){
			console.log(e);
			res.sendStatus(500);
		}
	} else {
		res.sendStatus(422);
	}
}

//ARRUMAR ESSA FUNÇÃO DE EDIT (botar os parametros de edição certinho)
// export async function mySneakersPUT(req, res) {
// 	const { sneakerID } = req.headers;
// 	const { amount, size } = req.body;
// 	try {
// 		const editRequest = await database
// 			.collection('mysneakers')
// 			.findOneAndUpdate(
// 				{
// 					_id: new ObjectId(sneakerID),
// 				},
// 				{ $set: { size, amount } }
// 			);
// 	} catch (error) {
// 		res.status(400).send(`Erro ao editar item: ${error}`);
// 	}
// }

//TO DO:: MIDDLEWARE DE VALIDAÇÃO SE O USUÁRIO QUE ESTÁ FAZENDO ESSAS REQUEST É O MESMO USUÁRIO LOGADO
