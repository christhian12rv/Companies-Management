import AddressType from '../Address/AddressType';
import BaseModelType from '../BaseModelType';
import CompanyType from '../Company/CompanyType';

interface EmployeeType extends BaseModelType {
	name: string;
	company?: CompanyType;
	companyId: number;
	dependentsNumber: number;
	rg: string;
	cpf: string;
	address?: AddressType;
	addressId: number;
	salary: number;
	discount: number;
}

export default EmployeeType;