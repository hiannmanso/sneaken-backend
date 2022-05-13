import Joi from 'joi';

export async function validProducts(req, res, next){
    let item = req.body;
    let itemSchema = Joi.object({
        brand: Joi.string().min(1).required(),
        model: Joi.string().min(1).required(),
        amount: Joi.object({
            s32: Joi.number().min(0).required(),
            s33: Joi.number().min(0).required(),
            s34: Joi.number().min(0).required(),
            s35: Joi.number().min(0).required(),
            s36: Joi.number().min(0).required(),
            s37: Joi.number().min(0).required(),
            s38: Joi.number().min(0).required(),
            s39: Joi.number().min(0).required(),
            s40: Joi.number().min(0).required(),
            s41: Joi.number().min(0).required(),
            s42: Joi.number().min(0).required(),
            s43: Joi.number().min(0).required(),
        }),
        price: Joi.string().min(1).required(),
        color: Joi.string().min(1).required(),
        image: Joi.string().min(1).required(),
        description: Joi.string().min(1).required() 
    }); 
    let { error } = itemSchema.validate(item);
    if (error) {
		return res
			.status(400)
			.send(`erro na validação de login: ${error}`);
	}
	next();
}
