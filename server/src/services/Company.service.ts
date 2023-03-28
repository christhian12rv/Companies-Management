import { Company } from '@prisma/client';
import Database from '../config/Database';
import CompanyCreate from '../types/Company/CompanyCreate';
import AddressService from './Address.service';

class CompanyService {
	public async findAll(): Promise<Company[]> {
		const companies = await Database.getInstance().getDatabase().company.findMany({
			include: {
				address: true,
			},
		});

		return companies;
	}

	public async findById(id: number): Promise<Company> {
		const company = await Database.getInstance().getDatabase().company.findUnique({
			where: {
				id,
			},
			include: {
				address: true,
			},
		});

		return company;
	}

	public async create(data: CompanyCreate): Promise<Company> {
		const { companyName, fantasyName, cnpj, stateRegistration, address, } = data;

		const addressCreated = await AddressService.create(address);

		const company = await Database.getInstance().getDatabase().company.create({
			data: {
				companyName,
				fantasyName,
				cnpj,
				stateRegistration,
				addressId: addressCreated.id,
			},
			include: {
				address: true,
			},
		});

		return company;
	}

	public async update(id: number, data: CompanyCreate): Promise<Company> {
		const { companyName, fantasyName, cnpj, stateRegistration, address, } = data;

		const companyFounded = await this.findById(id);

		await AddressService.update(companyFounded.addressId, address);

		const company = await Database.getInstance().getDatabase().company.update({
			where: {
				id,
			},
			data: {
				...(!!companyName && { companyName, }),
				...(!!fantasyName && { fantasyName, }),
				...(!!cnpj && { cnpj, }),
				...(!!stateRegistration && { stateRegistration, }),
			},
			include: {
				address: true,
			},
		});

		return company;
	}

	public async delete(id: number): Promise<Company> {
		const company = await Database.getInstance().getDatabase().company.delete({
			where: {
				id,
			},
			include: {
				address: true,
			},
		});

		return company;
	}
}

export default new CompanyService();