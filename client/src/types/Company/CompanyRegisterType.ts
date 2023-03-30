import AddressRegisterType from '../Address/AddressRegisterType';

interface CompanyRegisterType {
	companyName: string;
	fantasyName: string;
	cnpj: string;
	stateRegistration: string;
	address: AddressRegisterType;
}

export default CompanyRegisterType;