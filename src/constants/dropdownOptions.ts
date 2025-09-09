import {
	EAddressType,
	EEmailType,
	EGender,
	EIdType,
	EItemBooleanStatus,
	EItemStatus,
	EMaritalStatus,
	EOptionsConstantsTypes,
	EPhoneType,
	EPricingPolicies,
	EPricingPoliciesInterest,
	ESellerType,
	ESupplierType,
	ETaxPayerType,
	ETransmissionType,
} from '@/enums';

export const ADDRESS_TYPES = {
	[EAddressType.home]: 'Casa',
	[EAddressType.work]: 'Trabajo',
	[EAddressType.delivery]: 'Entrega',
	[EAddressType.other]: 'Otro',
};

export const EMAIL_TYPES = {
	[EEmailType.personal]: 'Personal',
	[EEmailType.work]: 'Trabajo',
	[EEmailType.other]: 'Otro',
};

export const PHONE_TYPES = {
	[EPhoneType.mobile]: 'Personal',
	[EPhoneType.home]: 'Domicilio',
	[EPhoneType.work]: 'Trabajo',
	[EPhoneType.other]: 'Otro',
};

export const IDENTIFICATION_TYPES_BASIC = {
	[EIdType.idCard]: 'Cédula',
	[EIdType.passport]: 'Pasaporte',
};

export const IDENTIFICATION_TYPES = {
	...IDENTIFICATION_TYPES_BASIC,
	[EIdType.ruc]: 'RUC',
};

export const MARITAL_STATUS = {
	[EMaritalStatus.single]: 'Soltero/a',
	[EMaritalStatus.married]: 'Casado/a',
	[EMaritalStatus.divorced]: 'Divorciado/a',
	[EMaritalStatus.widowed]: 'Viudo/a',
	[EMaritalStatus.domesticPartnership]: 'Unión de Hecho',
};

export const TAX_PAYER_TYPES = {
	[ETaxPayerType.naturalPerson]: 'Persona Natural',
	[ETaxPayerType.privateCompany]: 'Empresa Privada',
	[ETaxPayerType.publicCompany]: 'Empresa Pública',
};

export const GENDER_TYPES = {
	[EGender.male]: 'Masculino',
	[EGender.female]: 'Femenino',
};

export const ITEM_STATUS_TYPES = {
	[EItemStatus.active]: 'Activo',
	[EItemStatus.inactive]: 'Inactivo',
};

export const ITEM_BOOLEAN_STATUS_TYPES = {
	[EItemBooleanStatus.yes]: 'Si',
	[EItemBooleanStatus.no]: 'No',
};

export const SUPPLIER_TYPES = {
	[ESupplierType.national]: 'Nacional',
	[ESupplierType.international]: 'International',
};

export const SELLER_TYPES = {
	[ESellerType.internal]: 'Interno',
	[ESellerType.external]: 'Externo',
};

export const CONSTANTS_OPTIONS_TYPES = {
	[EOptionsConstantsTypes.boolean]: 'Booleano',
	[EOptionsConstantsTypes.text]: 'Texto',
	[EOptionsConstantsTypes.numeric]: 'Número',
	[EOptionsConstantsTypes.date]: 'Fecha',
};
export const VEHICLES_PRICING_POLICIES_BASIC = {
	[EPricingPolicies.ipv]: 'Igual Precio Venta',
	[EPricingPolicies.pmc]: 'Porcentaje Margen sobre Costo',
};

export const VEHICLES_PRICING_POLICIES = {
	...VEHICLES_PRICING_POLICIES_BASIC,
	[EPricingPolicies.vgc]: 'Valor Ganancia sobre Costo',
};

export const VEHICLES_PRICING_POLICIES_INTEREST = {
	[EPricingPoliciesInterest.ipg]: 'Igual a Política General',
	[EPricingPoliciesInterest.pes]: 'Porcentaje Margen sobre Costo',
};

export const MONTHS_OPTIONS = [
	{
		label: 'Enero',
		value: 1,
	},
	{
		label: 'Febrero',
		value: 2,
	},
	{
		label: 'Marzo',
		value: 3,
	},
	{
		label: 'Abril',
		value: 4,
	},
	{
		label: 'Mayo',
		value: 5,
	},
	{
		label: 'Junio',
		value: 6,
	},
	{
		label: 'Julio',
		value: 7,
	},
	{
		label: 'Agosto',
		value: 8,
	},
	{
		label: 'Septiembre',
		value: 9,
	},
	{
		label: 'Octubre',
		value: 10,
	},
	{
		label: 'Noviembre',
		value: 11,
	},
	{
		label: 'Diciembre',
		value: 12,
	},
];

export const TRANSMISSION_TYPE = {
	[ETransmissionType.auto]: 'Automático',
	[ETransmissionType.manual]: 'Manual',
};
