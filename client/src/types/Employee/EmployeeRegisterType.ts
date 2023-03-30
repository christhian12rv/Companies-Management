import AddressRegisterType from '../Address/AddressRegisterType';

interface EmployeeRegisterType {
	name: string;
	companyId: number;
	dependentsNumber: number;
	rg: string;
	cpf: string;
	address: AddressRegisterType;
	salary: number;
}

export default EmployeeRegisterType;