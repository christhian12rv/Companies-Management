import AddressCreateType from '../Address/AddressCreate';

interface CompanyCreateType {
	name: string;
	companyId: number;
	dependentsNumber: number;
	rg: string;
	cpf: string;
	address: AddressCreateType;
	salary: number;
}

export default CompanyCreateType;