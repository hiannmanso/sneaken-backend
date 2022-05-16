import Joi from 'joi';

export default function validOrder(req, res, next){
    let order = req.body;
    let orderSchema = Joi.object({
        userId: Joi.string().required(),
        name: Joi.string().min(1).required(),
        cpf: Joi.string().min(1).required(),
        birth: Joi.string().min(1).required(),
        payment: Joi.string().min(1).required(),
        products: Joi.array().items(Joi.object({
            id: Joi.string().min(1).required(),
            size: Joi.string().min(1).required(),
            model: Joi.string().min(1).required(),
            amount: Joi.number().required(),
            price: Joi.string().min(1).required()
        })),
        totalPrice: Joi.string().min(1).required()
    }); 
    let { error } = orderSchema.validate(order);
    if (error) {
		return res
			.status(400)
			.send(`erro na validação de login: ${error}`);
	}
	next();
}