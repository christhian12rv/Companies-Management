interface EmployeeUpdateType {
    id: number;
	name?: string;
	companyId?: number;
	dependentsNumber?: number;
	rg?: string;
	cpf?: string;
	addressId?: number;
	salary?: number;
	discount?: number;
}

export default EmployeeUpdateType;