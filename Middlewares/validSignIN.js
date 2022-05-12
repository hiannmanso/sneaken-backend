import joi from 'joi';
import { validate } from 'uuid';

export default async function validSignIN(req, res, next) {
	const { email, password } = req.body;

	const signInSchema = joi.object({
		email: joi.string().email().required(),
		password: joi
			.string()
			.pattern(/[A-Za-z0-9]/)
			.required(),
	});
	const validation = signInSchema.validate(req.body);
	if (validation.error) {
		return res
			.status(400)
			.send(`erro na validação de login: ${validation.error}`);
	}
	next();
}
