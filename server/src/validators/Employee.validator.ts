import * as Joi from 'joi';
import Database from '../config/Database';
import logger from '../config/logger';
import JoiCustomError from '../errors/JoiCustomError';
import CompanyService from '../services/Company.service';
import EmployeeService from '../services/Employee.service';
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
			'string.empty': 'Nome é obrigatório',
			'string.min': 'Nome deve conter no mínimo 2 caracteres',
			'any.required':'Nome é obrigatório',
		}),

	companyId: Joi
		.number()
		.integer()
		.required()
		.messages({
			'number.base': 'Empresa é inválida',
			'number.empty': 'Empresa é obrigatória',
			'number.integer': 'Empresa é inválida',
			'any.required':'Empresa é obrigatória',
		})
		.external(async (value) => {
			logger.info('COMPANY', value);
			const company = await CompanyService.findById(value);
			if (!company)
				throw new JoiCustomError('Empresa inválida ou não existe', 'companyId');
		}),

	dependentsNumber: Joi
		.number()
		.integer()
		.required()
		.messages({
			'number.base': 'Número de dependentes é inválido',
			'number.empty': 'Número de dependentes é obrigatório',
			'number.integer': 'Número de dependentes é inválido',
			'any.required':'Número de dependentes é obrigatório',
		}),

	rg: Joi
		.string()
		.required()
		.regex(/\d{2}\.\d{3}\.\d{3}-[0-9X]/)
		.messages({
			'string.base': 'RG é inválido',
			'string.empty': 'RG é obrigatório',
			'string.pattern.base': 'RG é inválido',
			'any.required':'RG é obrigatório',
		})
		.external(async (value) => {
			const employee = await Database.getInstance().getDatabase().employee.findUnique({
				where: {
					rg: value,
				},
			});

			if (employee)
				throw new JoiCustomError(`Já existe um usuário com rg ${value}`, 'rg');
		}),

	cpf: Joi
		.string()
		.required()
		.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
		.messages({
			'string.base': 'CPF é inválido',
			'string.empty': 'CPF é obrigatório',
			'string.pattern.base': 'CPF é inválido',
			'any.required':'CPF é obrigatório',
		})
		.external(async (value) => {
			const employee = await Database.getInstance().getDatabase().employee.findUnique({
				where: {
					cpf: value,
				},
			});

			if (employee)
				throw new JoiCustomError(`Já existe um usuário com cpf ${value}`, 'cpf');
		}),

	salary: Joi
		.number()
		.required()
		.min(0)
		.messages({
			'number.base': 'Salário é inválido',
			'number.empty': 'Salário é obrigatório',
			'any.required':'Salário é obrigatório',
		}),

	address: AddressValidator.create
		.required()
		.messages({
			'any.required': 'Endereço é obrigatório',
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
			const Employee = await EmployeeService.findById(value);

			if (!Employee)
				throw new JoiCustomError(`Não existe um usuário com id ${value}`, 'id');
		}),

	name: Joi
		.string()
		.optional()
		.min(2)
		.messages({
			'string.base': 'Nome é inválido',
			'string.min': 'Nome deve conter no mínimo 2 caracteres',
		}),

	companyId: Joi
		.number()
		.optional()
		.integer()
		.messages({
			'number.base': 'Empresa é inválida',
			'number.integer': 'Empresa é inválida',
		})
		.external(async (value) => {
			if (!value)
				return;

			const company = await CompanyService.findById(value);

			if (!company)
				throw new JoiCustomError('Empresa inválida ou não existe', 'companyId');
		}),

	dependentsNumber: Joi
		.number()
		.optional()
		.integer()
		.messages({
			'number.base': 'Número de dependentes é inválido',
			'number.integer': 'Número de dependentes é inválido',
		}),

	rg: Joi
		.string()
		.optional()
		// eslint-disable-next-line no-useless-escape
		.regex(/\d{2}\.\d{3}\.\d{3}-[0-9X]/)
		.messages({
			'string.base': 'RG é inválido',
			'string.pattern.base': 'RG é inválido',
		})
		.external(async (value) => {
			if (!value)
				return;

			const employee = await Database.getInstance().getDatabase().employee.findUnique({
				where: {
					rg: value,
				},
			});

			if (employee)
				throw new JoiCustomError(`Já existe um usuário com rg ${value}`, 'rg');
		}),

	cpf: Joi
		.string()
		.optional()
		.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
		.messages({
			'string.base': 'CPF é inválido',
			'string.pattern.base': 'CPF é inválido',
		})
		.external(async (value) => {
			if (!value)
				return;

			const employee = await Database.getInstance().getDatabase().employee.findUnique({
				where: {
					cpf: value,
				},
			});

			if (employee)
				throw new JoiCustomError(`Já existe um usuário com cpf ${value}`, 'cpf');
		}),

	salary: Joi
		.number()
		.optional()
		.min(0)
		.messages({
			'number.base': 'Salário é inválido',
		}),

	address: AddressValidator.update
		.optional(),
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
			const Employee = await EmployeeService.findById(value);

			if (!Employee)
				throw new JoiCustomError(`Não existe um usuário com id ${value}`, 'id');
		}),
}).options({ abortEarly: false, });