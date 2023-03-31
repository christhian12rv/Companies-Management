import { UserTypeEnum } from '@prisma/client';
import * as Joi from 'joi';
import * as bcrypt from 'bcrypt';
import Database from '../config/Database';
import JoiCustomError from '../errors/JoiCustomError';
import UserService from '../services/User.service';

export const findById = Joi.object().keys({
	id: Joi
		.number()
		.integer()
		.required()
		.messages({
			'number.base': 'Id é inválido',
			'number.integer': 'Id é inválido',
			'any.required':'Id é obrigatório',
		}),
});

export const create = Joi.object().keys({
	token: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Token é inválido',
			'string.empty': 'Token é inválido',
			'any.required': 'Token é obrigatório',
		}),

	name: Joi
		.string()
		.required()
		.min(2)
		.messages({
			'string.base': 'Nome é inválido',
			'string.empty': 'Nome é inválido',
			'string.min': 'Nome deve conter no mínimo 2 caracteres',
			'any.required':'Nome é obrigatório',
		}),

	cpf: Joi
		.string()
		.required()
		.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
		.messages({
			'string.base': 'CPF é inválido',
			'string.empty': 'CPF é inválido',
			'string.pattern.base': 'CPF é inválido',
			'any.required':'CPF é obrigatório',
		})
		.external(async (value) => {
			const user = await Database.getInstance().getDatabase().user.findUnique({
				where: {
					cpf: value,
				},
			});

			if (user)
				throw new JoiCustomError(`Já existe um usuário com cpf ${value}`, 'cpf');
		}),

	email: Joi
		.string()
		.required()
		.email()
		.messages({
			'string.base': 'Email é inválido',
			'string.empty': 'Email é inválido',
			'string.email': 'Email é inválido',
			'any.required':'Email é obrigatório',
		})
		.external(async (value) => {
			const user = await Database.getInstance().getDatabase().user.findUnique({
				where: {
					email: value,
				},
			});

			if (user)
				throw new JoiCustomError(`Já existe um usuário com Email ${value}`, 'email');
		}),

	password: Joi
		.string()
		.required()
		.min(8)
		.messages({
			'string.base': 'Senha é inválida',
			'string.empty': 'Senha é inválida',
			'string.min': 'Senha deve ter no mínimo 8 caracteres',
			'any.required':'Senha é obrigatória',
		}),

	confirmPassword: Joi
		.string()
		.required()
		.min(8)
		.messages({
			'string.base': 'Confirmação de senha é inválida',
			'string.empty': 'Confirmação de senha é inválida',
			'string.min': 'Senha deve ter no mínimo 8 caracteres',
			'any.required':'Confirmação de senha é obrigatória',
		})
		.external(async (value, helpers) => {
			if (value !== helpers.state.ancestors[0].password)
				throw new JoiCustomError('As senhas devem ser iguais', 'confirmPassword');
		}),

	type: Joi
		.string()
		.optional()
		.messages({
			'string.base': 'Tipo é inválido',
			'string.empty': 'Tipo é inválido',
			'any.required': 'Tipo é obrigatório',
		})
		.external(async (value) => {
			if (!UserTypeEnum[value])
				throw new JoiCustomError('Tipo é inválido', 'type');
		}),
}).options({ abortEarly : false, });


export const update = Joi.object().keys({
	token: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Token é inválido',
			'string.empty': 'Token é inválido',
			'any.required': 'Token é obrigatório',
		}),

	id: Joi
		.number()
		.integer()
		.required()
		.messages({
			'number.base': 'Id é inválido',
			'number.integer': 'Id é inválido',
			'any.required':'Id é obrigatório',
		})
		.external(async (value) => {
			const user = await UserService.findById(value);

			if (!user)
				throw new JoiCustomError(`Não existe um usuário com id ${value}`, 'id');
		}),

	name: Joi
		.string()
		.optional()
		.min(2)
		.messages({
			'string.base': 'Nome é inválido',
			'string.empty': 'Nome é inválido',
			'string.min': 'Nome deve conter no mínimo 2 caracteres',
		}),

	cpf: Joi
		.string()
		.optional()
		.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
		.messages({
			'string.base': 'CPF é inválido',
			'string.empty': 'CPF é inválido',
			'string.pattern.base': 'CPF é inválido',
		})
		.external(async (value, helpers) => {
			const user = await Database.getInstance().getDatabase().user.findFirst({
				where: {
					AND: {
						id: {
							not: helpers.state.ancestors[0].id,
						},
						cpf: value,
					},
				},
			});

			if (user)
				throw new JoiCustomError(`Já existe um usuário com cpf ${value}`, 'cpf');
		}),

	email: Joi
		.string()
		.optional()
		.email()
		.messages({
			'string.base': 'Email é inválido',
			'string.empty': 'Email é inválido',
			'string.email': 'Email é inválido',
		})
		.external(async (value, helpers) => {
			const user = await Database.getInstance().getDatabase().user.findFirst({
				where: {
					AND: {
						id: {
							not: helpers.state.ancestors[0].id,
						},
						email: value,
					},
				},
			});

			if (user)
				throw new JoiCustomError(`Já existe um usuário com Email ${value}`, 'email');
		}),

	type: Joi
		.string()
		.optional()
		.messages({
			'string.base': 'Tipo é inválido',
			'string.empty': 'Tipo é inválido',
		})
		.external(async (value) => {
			if (!UserTypeEnum[value])
				throw new JoiCustomError('Tipo é inválido', 'type');
		}),
}).options({ abortEarly : false, });


export const _delete = Joi.object().keys({
	token: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Token é inválido',
			'string.empty': 'Token é inválido',
			'any.required': 'Token é obrigatório',
		}),

	id: Joi
		.number()
		.integer()
		.required()
		.messages({
			'number.base': 'Id é inválido',
			'number.integer': 'Id é inválido',
			'any.required':'Id é obrigatório',
		})
		.external(async (value) => {
			const User = await UserService.findById(value);

			if (!User)
				throw new JoiCustomError(`Não existe um usuário com id ${value}`, 'id');
		}),
}).options({ abortEarly: false, });

export const login = Joi.object().keys({
	email: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Email é inválido',
			'string.empty': 'Email é inválido',
			'any.required':'Email é obrigatório',
		})
		.external(async (value) => {
			const user = await Database.getInstance().getDatabase().user.findUnique({
				where: {
					email: value,
				},
			});

			if (!user)
				throw new JoiCustomError('Email inválido', 'email');
		}),

	password: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Senha é inválida',
			'string.empty': 'Senha é inválida',
			'any.required':'Senha é obrigatória',
		})
		.external(async (value, helpers) => {
			const user = await Database.getInstance().getDatabase().user.findUnique({
				where: {
					email: helpers.state.ancestors[0].email,
				},
			});
			
			if (user && !bcrypt.compareSync(value, user.password))
				throw new JoiCustomError('Senha inválida', 'password');
		}),
}).options({ abortEarly: false, });