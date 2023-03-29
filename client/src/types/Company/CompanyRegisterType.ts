import AddressType from '../Address/AddressType';
import EmployeeRegisterType from '../Employee/EmployeeRegisterType';

interface CompanyRegisterType {
	companyName: string;
	fantasyName: string;
	cnpj: string;
	stateRegistration: string;
	address?: AddressType;
	addressId: number;
	employee?: EmployeeRegisterType[];
}

export default CompanyRegisterType;