import * as Joi from 'joi';
import Database from '../config/Database';
import JoiCustomError from '../errors/JoiCustomError';
import CompanyService from '../services/Company.service';
import * as AddressValidator from '../validators/Address.validator';

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
	companyName: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Razão Social é inválida',
			'string.empty': 'Razão Social é inválida',
			'any.required':'Razão Social é obrigatória',
		})
		.external(async (value) => {
			const company = await Database.getInstance().getDatabase().company.findUnique({
				where: {
					companyName: value,
				},
			});
			if (company)
				throw new JoiCustomError(`Já existe uma empresa com razão social ${value}`, 'companyName');
		}),

	fantasyName: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Nome fantasia é inválido',
			'string.empty': 'Nome fantasia é inválido',
			'any.required':'Nome fantasia é obrigatório',
		}),

	cnpj: Joi
		.string()
		.required()
		.regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
		.messages({
			'string.base': 'CNPJ é inválido',
			'string.empty': 'CNPJ é inválido',
			'string.pattern.base': 'CNPJ é inválido',
			'any.required':'CNPJ é obrigatório',
		})
		.external(async (value) => {
			const employee = await Database.getInstance().getDatabase().company.findUnique({
				where: {
					cnpj: value,
				},
			});

			if (employee)
				throw new JoiCustomError(`Já existe uma empresa com cnpj ${value}`, 'cnpj');
		}),

	stateRegistration: Joi
		.string()
		.optional()
		.allow(null, '')
		.messages({
			'string.base': 'Inscrição estadual é inválida',
			'string.empty': 'Inscrição estadual é inválida',
		}),

	address: AddressValidator.create
		.required()
		.messages({
			'any.required': 'Endereço é obrigatório',
		}),
}).options({ abortEarly : false, allowUnknown: true, });


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
			const Company = await CompanyService.findById(value);

			if (!Company)
				throw new JoiCustomError(`Não existe um usuário com id ${value}`, 'id');
		}),

	companyName: Joi
		.string()
		.optional()
		.messages({
			'string.base': 'Razão Social é inválida',
			'string.empty': 'Razão Social é inválida',
		})
		.external(async (value, helpers) => {
			const company = await Database.getInstance().getDatabase().company.findFirst({
				where: {
					AND: {
						id: {
							not: helpers.state.ancestors[0].id,
						},
						companyName: value,
					},
				},
			});
			if (company)
				throw new JoiCustomError(`Já existe uma empresa com razão social ${value}`, 'companyName');
		}),

	fantasyName: Joi
		.string()
		.optional()
		.messages({
			'string.base': 'Nome fantasia é inválido',
			'string.empty': 'Nome fantasia é inválido',
		}),

	cnpj: Joi
		.string()
		.optional()
		.regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
		.messages({
			'string.base': 'CNPJ é inválido',
			'string.empty': 'CNPJ é inválido',
			'string.pattern.base': 'CNPJ é inválido',
		})
		.external(async (value, helpers) => {
			const employee = await Database.getInstance().getDatabase().company.findFirst({
				where: {
					AND: {
						id: {
							not: helpers.state.ancestors[0].id,
						},
						cnpj: value,
					},
				},
			});

			if (employee)
				throw new JoiCustomError(`Já existe uma empresa com cnpj ${value}`, 'cnpj');
		}),

	stateRegistration: Joi
		.string()
		.optional()
		.allow(null, '')
		.messages({
			'string.base': 'Inscrição estadual é inválida',
			'string.empty': 'Inscrição estadual é inválida',
		}),

	address: AddressValidator.create
		.optional(),
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
			const Company = await CompanyService.findById(value);

			if (!Company)
				throw new JoiCustomError(`Não existe um usuário com id ${value}`, 'id');
		}),
});