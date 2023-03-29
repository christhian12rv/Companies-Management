import BaseModelType from '../BaseModelType';
import CompanyType from '../Company/CompanyType';
import EmployeeType from '../Employee/EmployeeType';

interface AddressType extends BaseModelType {
	street: string;
	number: number;
	complement: string;
	neighborhood: string;
	city: string;
	uf: string;
	cep: string;
	company?: CompanyType[];
	employee?: EmployeeType[];
}

export default AddressType;