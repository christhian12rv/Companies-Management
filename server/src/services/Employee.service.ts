import { Employee } from '@prisma/client';
import Database from '../config/Database';
import EmployeeCreate from '../types/Employee/EmployeeCreate';
import AddressService from './Address.service';

class EmployeeService {
	public async findAll(): Promise<Employee[]> {
		const employees = await Database.getInstance().getDatabase().employee.findMany({
			include: {
				address: true,
				company: true,
			},
		});

		return employees;
	}

	public async findById(id: number): Promise<Employee> {
		const employee = await Database.getInstance().getDatabase().employee.findUnique({
			where: {
				id,
			},
			include: {
				address: true,
				company: true,
			},
		});

		return employee;
	}

	public async create(data: EmployeeCreate): Promise<Employee> {
		const { name, companyId, dependentsNumber, rg, cpf, address, salary, } = data;

		let discount = 0;
		if (dependentsNumber > 2)
			discount = salary - (salary * (100 - (dependentsNumber * 3)) / 100);
		else
			discount = salary - (salary * (100 - (dependentsNumber * 5)) / 100);

		const addressCreated = await AddressService.create(address);

		const employee = await Database.getInstance().getDatabase().employee.create({
			data: {
				name,
				companyId: Number(companyId),
				dependentsNumber: Number(dependentsNumber),
				rg,
				cpf,
				salary: Number(salary),
				discount: Number(discount),
				addressId: addressCreated.id,
			},
			include: {
				address: true,
				company: true,
			},
		});

		return employee;
	}

	public async update(id: number, data: EmployeeCreate): Promise<Employee> {
		const { name, companyId, dependentsNumber, rg, cpf, address, salary, } = data;

		const employeeFounded = await this.findById(id);

		let discount = 0;

		if (dependentsNumber || salary) {
			const d = dependentsNumber ?? employeeFounded.dependentsNumber;
			const s = salary ?? employeeFounded.salary;

			if (dependentsNumber > 2)
				discount = salary - (s * (100 - (d * 3)) / 100);
			else
				discount = salary - (s * (100 - (d * 5)) / 100);
		}

		await AddressService.update(employeeFounded.addressId, address);

		const employee = await Database.getInstance().getDatabase().employee.update({
			where: {
				id,
			},
			data: {
				...(!!name && { name, }),
				...(!!companyId && { companyId: Number(companyId), }),
				...(!!dependentsNumber && { dependentsNumber: Number(dependentsNumber), }),
				...(!!rg && { rg, }),
				...(!!cpf && { cpf, }),
				...(!!salary && { salary: Number(salary), }),
				...((dependentsNumber || salary) && { discount: Number(discount), }),
			},
			include: {
				address: true,
				company: true,
			},
		});

		return employee;
	}

	public async delete(id: number): Promise<Employee> {
		const employee = await Database.getInstance().getDatabase().employee.delete({
			where: {
				id,
			},
			include: {
				address: true,
				company: true,
			},
		});

		return employee;
	}
}

export default new EmployeeService();