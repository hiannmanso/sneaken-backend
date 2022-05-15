import database from "../database.js";

export async function ordersPOST(req, res){
    let orders = req.body;
    const { authorization } = req.headers;
	const token = authorization?.replace('Bearer', '').trim();
    if(token){
        try{
            let user = await database.collection('session').find({token: token}).toArray();
            if(user.length !== 0){
                for(let i = 0; i<orders.products.length;i++){
                    let verify = orders.products[i];
                    for(let j=orders.products.length-1;j>i;j--){
                        if(verify.model === orders.products[j].model && verify.size === orders.products[j].size){
                            verify.amount += 1;
                            orders.products.splice(j,1);
                        }
                    }
                }
                console.log(orders.products);
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