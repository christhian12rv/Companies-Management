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

		let descount = 0;
		if (dependentsNumber > 2)
			descount = salary * (100 - (dependentsNumber * 3)) / 100;
		else
			descount = salary * (100 - (dependentsNumber * 5)) / 100;

		const addressCreated = await AddressService.create(address);

		const employee = await Database.getInstance().getDatabase().employee.create({
			data: {
				name,
				companyId,
				dependentsNumber,
				rg,
				cpf,
				salary,
				descount,
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

		let descount = 0;

		if (dependentsNumber || salary) {
			const d = dependentsNumber ?? employeeFounded.dependentsNumber;
			const s = salary ?? employeeFounded.salary;

			if (dependentsNumber > 2)
				descount = s * (100 - (d * 3)) / 100;
			else
				descount = s * (100 - (d * 5)) / 100;
		}

		await AddressService.update(employeeFounded.addressId, address);

		const employee = await Database.getInstance().getDatabase().employee.update({
			where: {
				id,
			},
			data: {
				...(!!name && { name, }),
				...(!!companyId && { companyId, }),
				...(!!dependentsNumber && { dependentsNumber, }),
				...(!!rg && { rg, }),
				...(!!cpf && { cpf, }),
				...(!!salary && { salary, }),
				...((dependentsNumber || salary) && { descount, }),
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