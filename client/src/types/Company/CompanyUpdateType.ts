import AddressUpdateType from '../Address/AddressUpdateType';

interface CompanyUpdateType {
	id: number;
	companyName?: string;
	fantasyName?: string;
	cnpj?: string;
	stateRegistration?: string;
	address?: AddressUpdateType;
}

export default CompanyUpdateType;