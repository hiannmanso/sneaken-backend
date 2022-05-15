import database from "../database.js";

export async function ordersPOST(req, res){
    let orders = req.body;
    const { authorization } = req.headers;
	const token = authorization?.replace('Bearer', '').trim();
    if(token){
        try{
            let user = await database.collection('session').find({token: token}).toArray();
            if(user.length !== 0){
                //agrupamento de itens iguais
                for(let i = 0; i<orders.products.length;i++){
                    let verify = orders.products[i];
                    for(let j=orders.products.length-1;j>i;j--){
                        if(verify.model === orders.products[j].model && verify.size === orders.products[j].size){
                            verify.amount += 1;
                            orders.products.splice(j,1);
                        }
                    }
                }
                //verificação de quantidades disponíveis
                let error = 0;
                for(let x = 0; x<orders.products.length;x++){
                    let amount = await database.collection('products').find({model: orders.products[x].model, size: orders.products[x].size}).toArray();
                    if(amount.length === 0){
                        error = 1;
                        break;
                    } else if(amount[0].amount - orders.products[x].amount < 0){
                        error = 1;
                        break;
                    }
                }
                if(error !== 0){
                    res.sendStatus(409);
                } else {
                    //retirada de produtos do estoque e finalização do pedido
                    res.sendStatus(200);
                }
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