import { Address } from '@prisma/client';
import Database from '../config/Database';
import AddressCreate from '../types/Address/AddressCreate';

class AddressService {
	public async create(data: AddressCreate): Promise<Address> {
		const address = await Database.getInstance().getDatabase().address.create({
			data,
		});

		return address;
	}

	public async update(id: number, data: AddressCreate): Promise<Address> {
		const { street, number, complement, neighborhood, city, uf, cep, } = data;
		const address = await Database.getInstance().getDatabase().address.update({
			where: {
				id,
			},
			data: {
				...(!!street && { street, }),
				...(!!number && { number, }),
				...(!!complement && { complement, }),
				...(!!neighborhood && { neighborhood, }),
				...(!!city && { city, }),
				...(!!uf && { uf, }),
				...(!!cep && { cep, }),
			},
		});

		return address;
	}

	public async delete(id: number): Promise<Address> {
		const address = await Database.getInstance().getDatabase().address.delete({
			where: {
				id,
			},
		});

		return address;
	}
}

export default new AddressService();