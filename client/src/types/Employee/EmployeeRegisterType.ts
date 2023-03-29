import AddressType from '../Address/AddressType';
import CompanyType from '../Company/CompanyType';

interface EmployeeRegisterType {
	name: string;
	company?: CompanyType;
	companyId: number;
	dependentsNumber: number;
	rg: string;
	cpf: string;
	address?: AddressType;
	addressId: number;
	salary: number;
	descount: number;
}

export default EmployeeRegisterType;