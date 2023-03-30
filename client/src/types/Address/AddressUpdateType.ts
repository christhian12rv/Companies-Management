interface AddressUpdateType {
	id: number;
	street?: string;
	number?: number;
	complement?: string;
	neighborhood?: string;
	city?: string;
	uf?: string;
	cep?: string;
}

export default AddressUpdateType;