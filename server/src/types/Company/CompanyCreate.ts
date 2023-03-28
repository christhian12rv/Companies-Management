import AddressCreateType from '../Address/AddressCreate';

interface CompanyCreateType {
	companyName: string;
	fantasyName: string;
	cnpj: string;
	stateRegistration: string | null;
	address: AddressCreateType;
}

export default CompanyCreateType;