import joi from 'joi';

export default async function validRequestMySneakers(req, res, next) {
	const { brand, model, amount, price, size } = req.body;
	const mySneakerSchema = joi.object({
		brand: joi
			.string()
			.pattern(/[a-zA-ZãÃÇ-Üá-ú ]*/)
			.required(),
		model: joi
			.string()
			.pattern(/[a-zA-ZãÃÇ-Üá-ú ]*/)
			.required(),
		amount: joi
			.string()
			.pattern(/^[0-9]{1,}$/)
			.required(),
		price: joi
			.string()
			.pattern(/^[0-9]{1,}\,[0-9]{2}$/)
			.required(),
		size: joi
			.string()
			.pattern(/^[0-9]{1,2}$/)
			.required(),
		// color: joi.string().required(),
	});
	const validation = mySneakerSchema.validate(req.body);
	if (validation.error) return res.status(400).send(`${validation.error}`);

	next();
}
