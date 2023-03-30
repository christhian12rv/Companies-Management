import * as Joi from 'joi';
import JoiCustomError from '../errors/JoiCustomError';
import UserService from '../services/User.service';
import brazillianUfsArray from '../utils/brazillianUfsArray';

export const create = Joi.object().keys({
	street: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Rua é inválida',
			'string.empty': 'Rua é inválida',
			'any.required':'Rua é obrigatória',
		}),

	number: Joi
		.number()
		.integer()
		.required()
		.messages({
			'number.base': 'Número é inválido',
			'number.empty': 'Número é inválido',
			'number.integer': 'Número é inválido',
			'any.required':'Número é obrigatório',
		}),

	complement: Joi
		.string()
		.optional()
		.allow(null, '')
		.messages({
			'string.base': 'Complemento é inválido',
			'string.empty': 'Complemento é inválido',
		}),

	neighborhood: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Bairro é inválido',
			'string.empty': 'Bairro é inválido',
			'any.required':'Bairro é obrigatório',
		}),

	city: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Cidade é inválida',
			'string.empty': 'Cidade é inválida',
			'any.required':'Cidade é obrigatória',
		}),

	uf: Joi
		.string()
		.required()
		.valid(...brazillianUfsArray)
		.messages({
			'string.base': 'UF é inválido',
			'string.empty': 'UF é inválido',
			'any.only': 'UF é inválido',
			'any.required':'UF é obrigatório',
		}),

	cep: Joi
		.string()
		.required()
		// eslint-disable-next-line no-useless-escape
		.regex(/(^\d{5})\-(\d{3}$)/)
		.messages({
			'string.base': 'CEP é inválido',
			'string.empty': 'CEP é inválido',
			'string.pattern.base': 'CEP é inválido',
			'any.required':'CEP é obrigatório',
		}),
}).options({ abortEarly : false, });


export const update = Joi.object().keys({
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
				throw new JoiCustomError(`Não existe um endereço com id ${value}`, 'id');
		}),

	street: Joi
		.string()
		.optional()
		.messages({
			'string.base': 'Rua é inválida',
			'string.empty': 'Rua é inválida',
		}),

	number: Joi
		.number()
		.integer()
		.optional()
		.messages({
			'number.base': 'Número é inválido',
			'number.empty': 'Número é inválido',
			'number.integer': 'Número é inválido',
		}),

	complement: Joi
		.string()
		.optional()
		.messages({
			'string.base': 'Complemento é inválido',
			'string.empty': 'Complemento é inválido',
		}),

	neighborhood: Joi
		.string()
		.optional()
		.messages({
			'string.base': 'Bairro é inválido',
			'string.empty': 'Bairro é inválido',
		}),

	city: Joi
		.string()
		.optional()
		.messages({
			'string.base': 'Cidade é inválida',
			'string.empty': 'Cidade é inválida',
		}),

	uf: Joi
		.string()
		.optional()
		.valid(...brazillianUfsArray)
		.messages({
			'string.base': 'UF é inválido',
			'string.empty': 'UF é inválido',
			'any.only': 'UF é inválido',
		}),

	cep: Joi
		.string()
		.optional()
		.regex(/(^\d{5})-(\d{3}$)/)
		.messages({
			'string.base': 'CEP é inválido',
			'string.empty': 'CEP é inválido',
			'string.pattern.base': 'CEP é inválido',
		}),
}).options({ abortEarly : false, allowUnknown: true, });


export const _delete = Joi.object().keys({
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
				throw new JoiCustomError(`Não existe um endereço com id ${value}`, 'id');
		}),
});