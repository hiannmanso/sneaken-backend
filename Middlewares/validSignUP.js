import joi from 'joi';
import { validate } from 'uuid';

export default function validSignUP(req, res, next) {
	const signUpSchema = joi.object({
		name: joi
			.string()
			.min(3)
			.max(20)
			.pattern(/[a-zA-ZãÃÇ-Üá-ú ]*/)
			.required(),
		email: joi.string().email().required(),
		password: joi
			.string()
			.min(3)
			.max(20)
			.pattern(/[a-zA-Z0-9]/)
			.required(),
	});
	const validation = signUpSchema.validate(req.body);
	if (validation.error) {
		console.log(validate.error);
		return res.status(400).send(`Erro na validação: ${validation.error}`);
	}
	next();
}
