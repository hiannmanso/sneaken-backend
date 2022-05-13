import Joi from 'joi';

export async function validProducts(req, res, next){
    let item = req.body;
    let itemSchema = Joi.object({
        brand: Joi.string().min(1).required(),
        model: Joi.string().min(1).required(),
        amount: Joi.number().required(),
        price: Joi.string().min(1).required() 
    }); 
    let { error } = itemSchema.validate(item);
    if (error) {
		return res
			.status(400)
			.send(`erro na validação de login: ${error}`);
	}
	next();
}
