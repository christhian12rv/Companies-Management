import AddressUpdateType from '../Address/AddressUpdateType';

interface EmployeeUpdateType {
  id: number;
	name?: string;
	companyId?: number;
	dependentsNumber?: number;
	rg?: string;
	cpf?: string;
	address: AddressUpdateType;
	salary?: number;
	discount?: number;
}

export default EmployeeUpdateType;