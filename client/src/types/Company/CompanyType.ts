import AddressType from '../Address/AddressType';
import BaseModelType from '../BaseModelType';
import EmployeeType from '../Employee/EmployeeType';

interface CompanyType extends BaseModelType{
	companyName: string;
	fantasyName: string;
	cnpj: string;
	stateRegistration?: string;
	address?: AddressType;
	addressId: number;
	employee?: EmployeeType[];
}

export default CompanyType;