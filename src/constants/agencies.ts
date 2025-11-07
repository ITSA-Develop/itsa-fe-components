import { IAgency } from '@/interfaces';


// export const AGENCIES_DATA: IAgency[] = [
//             {
//                 "id": 4,
//                 "name": "CUENCA",
//                 "modules": [
//                     {
//                         "id": 7,
//                         "name": "SEGURIDAD",
//                         "icon": "SettingsIcon",
//                         "entorno": "BACKOFFICE",
//                         "submodules": [
//                             {
//                                 "id": 8,
//                                 "name": "MANTENIMIENTOS",
//                                 "icon": "PackageIcon",
//                                 "pathPadre": null,
//                                 "path": null,
//                                 "groups": [],
//                                 "programs": [
//                                     {
//                                         "id": 57,
//                                         "name": "ACCESOS",
//                                         "url": "http://backoffice.127.0.0.1.nip.io:4000/security/accesses/modules?status=1",
//                                         "pathPadre": "security/accesses",
//                                         "path": "security/accesses/modules?status=1",
//                                         "icon": "mdiLaptop",
//                                         "actions": {
//                                             "allActions": true,
//                                             "read": false,
//                                             "create": false,
//                                             "update": false,
//                                             "delete": false
//                                         }
//                                     },
//                                     {
//                                         "id": 90,
//                                         "name": "POLITICAS DE ACCESO",
//                                         "url": "http://backoffice.127.0.0.1.nip.io:4000/security/accesses/access-policies?status=1",
//                                         "pathPadre": "security/accesses",
//                                         "path": "security/accesses/access-policies?status=1",
//                                         "icon": "mdiLaptop",
//                                         "actions": {
//                                             "allActions": true,
//                                             "read": false,
//                                             "create": false,
//                                             "update": false,
//                                             "delete": false
//                                         }
//                                     },
//                                     {
//                                         "id": 89,
//                                         "name": "ROLES",
//                                         "url": "http://backoffice.127.0.0.1.nip.io:4000/security/accesses/roles?status=1",
//                                         "pathPadre": "security/accesses",
//                                         "path": "security/accesses/roles?status=1",
//                                         "icon": "mdiLaptop",
//                                         "actions": {
//                                             "allActions": false,
//                                             "read": false,
//                                             "create": true,
//                                             "update": false,
//                                             "delete": false
//                                         }
//                                     },
//                                     {
//                                         "id": 102,
//                                         "name": "ROL AGENCIA PRO. ACCIONES",
//                                         "url": "http://backoffice.127.0.0.1.nip.io:4000/security/accesses/role-agency-program-actions",
//                                         "pathPadre": "security/accesses",
//                                         "path": "security/accesses/role-agency-program-actions",
//                                         "icon": "PackageIcon",
//                                         "actions": {
//                                             "allActions": true,
//                                             "read": true,
//                                             "create": false,
//                                             "update": false,
//                                             "delete": false
//                                         }
//                                     },
//                                     {
//                                         "id": 103,
//                                         "name": "USUARIOS",
//                                         "url": "http://backoffice.127.0.0.1.nip.io:4000/security/accesses/users",
//                                         "pathPadre": "security/accesses",
//                                         "path": "security/accesses/users",
//                                         "icon": "PackageIcon",
//                                         "actions": {
//                                             "allActions": true,
//                                             "read": true,
//                                             "create": false,
//                                             "update": true,
//                                             "delete": false
//                                         }
//                                     }
//                                 ]
//                             }
//                         ]
//                     },
//                     {
//                         "id": 21,
//                         "name": "NUCLEO",
//                         "icon": "PackageIcon",
//                         "entorno": "FRONTOFFICE",
//                         "submodules": [
//                             {
//                                 "id": 34,
//                                 "name": "MANTENIMINENTOS",
//                                 "icon": "PackageIcon",
//                                 "pathPadre": null,
//                                 "path": null,
//                                 "groups": [],
//                                 "programs": [
//                                     {
//                                         "id": 105,
//                                         "name": "CLIENTES REPUESTOS",
//                                         "url": "http://frontoffice.127.0.0.1.nip.io:4001/spares/clients-management",
//                                         "pathPadre": "spares",
//                                         "path": "spares/clients-management",
//                                         "icon": "IconCamion",
//                                         "actions": {
//                                             "allActions": true,
//                                             "read": true,
//                                             "create": true,
//                                             "update": true,
//                                             "delete": true
//                                         }
//                                     },
//                                     {
//                                         "id": 104,
//                                         "name": "CLIENTES",
//                                         "url": "http://frontoffice.127.0.0.1.nip.io:4001/core/clients-management",
//                                         "pathPadre": "core",
//                                         "path": "core/clients-management",
//                                         "icon": "IconCamion",
//                                         "actions": {
//                                             "allActions": false,
//                                             "read": true,
//                                             "create": false,
//                                             "update": false,
//                                             "delete": false
//                                         }
//                                     }
//                                 ]
//                             }
//                         ]
//                     },
//                     {
//                         "id": 26,
//                         "name": "REPUESTOS ITEMS",
//                         "icon": "PackageIcon",
//                         "entorno": "BACKOFFICE",
//                         "submodules": [
//                             {
//                                 "id": 41,
//                                 "name": "MANT. REPUESTOS",
//                                 "icon": "IconCamion",
//                                 "pathPadre": null,
//                                 "path": null,
//                                 "groups": [],
//                                 "programs": [
//                                     {
//                                         "id": 110,
//                                         "name": "R. EQUIVALENTES",
//                                         "url": "http://backoffice.127.0.0.1.nip.io:4000/spare/equivalents?status=1",
//                                         "pathPadre": "spare",
//                                         "path": "spare/equivalents?status=1",
//                                         "icon": "PackageIcon",
//                                         "actions": {
//                                             "allActions": true,
//                                             "read": false,
//                                             "create": false,
//                                             "update": false,
//                                             "delete": false
//                                         }
//                                     },
//                                     {
//                                         "id": 112,
//                                         "name": "R. ORIGEN",
//                                         "url": "http://backoffice.127.0.0.1.nip.io:4000/spare/origin",
//                                         "pathPadre": "spare",
//                                         "path": "spare/origin",
//                                         "icon": "IconCamion",
//                                         "actions": {
//                                             "allActions": true,
//                                             "read": false,
//                                             "create": false,
//                                             "update": false,
//                                             "delete": false
//                                         }
//                                     },
//                                     {
//                                         "id": 111,
//                                         "name": "R. ITEMS",
//                                         "url": "http://backoffice.127.0.0.1.nip.io:4000/spare/items",
//                                         "pathPadre": "spare",
//                                         "path": "spare/items",
//                                         "icon": "IconCamion",
//                                         "actions": {
//                                             "allActions": true,
//                                             "read": false,
//                                             "create": false,
//                                             "update": false,
//                                             "delete": false
//                                         }
//                                     }
//                                 ]
//                             }
//                         ]
//                     },
//                     {
//                         "id": 8,
//                         "name": "REPUESTOS",
//                         "icon": "mdiCarSpeedLimiter",
//                         "entorno": "FRONTOFFICE",
//                         "submodules": [
//                             {
//                                 "id": 9,
//                                 "name": "MANTENIMIENTOS",
//                                 "icon": "mdiViewModule",
//                                 "pathPadre": null,
//                                 "path": null,
//                                 "groups": [],
//                                 "programs": [
//                                     {
//                                         "id": 80,
//                                         "name": "CLIENTES",
//                                         "url": "http://frontoffice.127.0.0.1.nip.io:4001/spares/clients-management",
//                                         "pathPadre": "spares",
//                                         "path": "spares/clients-management",
//                                         "icon": "PackageIcon",
//                                         "actions": {
//                                             "allActions": true,
//                                             "read": false,
//                                             "create": false,
//                                             "update": false,
//                                             "delete": false
//                                         }
//                                     }
//                                 ]
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]

export const AGENCIES_DATA: IAgency[] = [
	{
		id: 4,
		name: 'CUENCA',
		modules: [
			{
				id: 1,
				name: 'VEHÍCULOS',
				icon: 'VehicleIcon',
				entorno: 'FRONTOFFICE',
				submodules: [
					{
						id: 2,
						name: 'GESTIÓN DE COMPRAS',
						icon: 'mdiViewModule',
						groups: [],
						pathPadre: null,
						path: null,
						programs: [
							{
								id: 40,
								name: 'GESTIÓN DE TRÁNSITO',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/',
								pathPadre: null,
								path: 'None/',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
							{
								id: 41,
								name: 'GESTIÓN DE COMPRAS VEHÍCULOS NUEVOS',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
							{
								id: 73,
								name: 'GESTIÓN DE COMPRAS VEHÍCULOS USADOS',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
						],
					},
					{
						id: 3,
						name: 'GESTIÓN DE VENTAS',
						icon: 'mdiViewModule',
						groups: [],
						pathPadre: null,
						path: null,
						programs: [
							{
								id: 42,
								name: 'VENTAS',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
							{
								id: 43,
								name: 'AUTORIZACIONES',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
						],
					},
					{
						id: 1,
						name: 'MANTENIMIENTOS',
						icon: 'mdiViewModule',
						pathPadre: null,
						path: null,
						groups: [
							{
								id: 1,
								name: 'GESTIÓN DE ENTIDADES PERSONALES',
								icon: 'mdiAccount',
								pathPadre: null,
								path: null,
								programs: [
									{
										id: 45,
										name: 'TRANSPORTISTAS',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 46,
										name: 'COLABORADORES',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 47,
										name: 'PROVEEDORES',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 44,
										name: 'CLIENTES',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/vehicles/clients-management/',
										pathPadre: 'vehicles/clients-management',
										path: 'vehicles/clients-management/',
										icon: 'mdiLaptop',
										actions: {
											allActions: false,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
								],
							},
							{
								id: 4,
								name: 'PARÁMETROS Y CONFIGURACIÓN',
								icon: 'mdiCog',
								pathPadre: null,
								path: null,
								programs: [
									{
										id: 60,
										name: 'CONSTANTES & PARÁMETROS DEL SISTEMA',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 61,
										name: 'DÍAS DE FERIADO',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
								],
							},
							{
								id: 6,
								name: 'PROCESOS Y DOCUMENTOS LEGALES',
								icon: 'mdiFileDocument',
								pathPadre: null,
								path: null,
								programs: [
									{
										id: 62,
										name: 'PEPS',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 63,
										name: 'PROVIDENCIAS',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 64,
										name: 'SANCIONADOS ONU',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 65,
										name: 'OFAC',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
								],
							},
							{
								id: 5,
								name: 'PRECIOS Y VENTAS',
								icon: 'mdiSale',
								pathPadre: null,
								path: null,
								programs: [
									{
										id: 66,
										name: 'POLÍTICAS DE PRECIOS',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 67,
										name: 'PRESUPUESTO DE VENTA',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 68,
										name: 'REGALOS',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 69,
										name: 'PROMOCIONES',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 70,
										name: 'VALOR TRADE IN',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
								],
							},
							{
								id: 7,
								name: 'GESTIÓN DE VEHÍCULOS, PRODUCTOS Y ACCESORIOS',
								icon: 'mdiCarBack',
								pathPadre: null,
								path: null,
								programs: [
									{
										id: 71,
										name: 'GESTIÓN DE MODELOS',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 72,
										name: 'RASTREO Y SEGURIDAD',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
								],
							},
						],
						programs: [],
					},
					{
						id: 12,
						name: 'GESTIÓN DE COMPRAS',
						icon: 'mdiViewModule',
						groups: [],
						pathPadre: null,
						path: null,
						programs: [],
					},
					{
						id: 13,
						name: 'GESTIÓN DE COMPRAS',
						icon: 'mdiViewModule',
						groups: [],
						pathPadre: null,
						path: null,
						programs: [],
					},
					{
						id: 14,
						name: 'GESTIÓN DE COMPRAS',
						icon: 'mdiViewModule',
						groups: [],
						pathPadre: null,
						path: null,
						programs: [],
					},
					{
						id: 15,
						name: 'GESTIÓN DE COMPRAS',
						icon: 'mdiViewModule',
						groups: [],
						pathPadre: null,
						path: null,
						programs: [
							{
								id: 41,
								name: 'GESTIÓN DE TRÁNSITO',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/',
								pathPadre: null,
								path: 'None/',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
							{
								id: 42,
								name: 'GESTIÓN DE COMPRAS VEHÍCULOS NUEVOS',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
							{
								id: 43,
								name: 'GESTIÓN DE COMPRAS VEHÍCULOS USADOS',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
						],
					},
				],
			},
			{
				id: 2,
				name: 'TALLERES',
				icon: 'WorkshopIcon',
				entorno: 'FRONTOFFICE',
				submodules: [
					{
						id: 5,
						name: 'GESTIÓN DE COMPRAS',
						icon: 'mdiViewModule',
						groups: [],
						pathPadre: null,
						path: null,
						programs: [
							{
								id: 48,
								name: 'COMPRAS',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
							{
								id: 49,
								name: 'GESTIÓN DE RECEPCIÓN',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
						],
					},
					{
						id: 6,
						name: 'GESTIÓN DE VENTAS',
						icon: 'mdiViewModule',
						groups: [],
						pathPadre: null,
						path: null,
						programs: [
							{
								id: 50,
								name: 'VENTAS',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
							{
								id: 51,
								name: 'AUTORIZACIONES',
								url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
						],
					},
					{
						id: 4,
						name: 'MANTENIMIENTOS',
						icon: 'mdiViewModule',
						pathPadre: null,
						path: null,
						groups: [
							{
								id: 2,
								name: 'GESTIÓN DE ENTIDADES PERSONALES',
								icon: 'mdiAccount',
								pathPadre: null,
								path: null,
								programs: [
									{
										id: 52,
										name: 'CLIENTES',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 53,
										name: 'TRANSPORTISTAS',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 54,
										name: 'COLABORADORES',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
									{
										id: 55,
										name: 'PROVEEDORES',
										url: 'http://frontoffice.127.0.0.1.nip.io:4001/None/None',
										pathPadre: null,
										path: 'None/None',
										icon: 'mdiLaptop',
										actions: {
											allActions: true,
											read: false,
											create: false,
											update: false,
											delete: false,
										},
									},
								],
							},
						],
						programs: [],
					},
				],
			},
			{
				id: 6,
				name: 'CARTERA',
				icon: 'WalletIcon2',
				entorno: 'BACKOFFICE',
				submodules: [
					{
						id: 7,
						name: 'GESTIÓN DE COBRANZA',
						icon: 'mdiViewModule',
						groups: [],
						pathPadre: null,
						path: null,
						programs: [
							{
								id: 56,
								name: 'ABONOS',
								url: 'http://backoffice.127.0.0.1.nip.io:4000/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
						],
					},
				],
			},
			{
				id: 7,
				name: 'LINEAS PARA EL HOGAR',
				icon: 'HouseholdIcon',
				entorno: 'BACKOFFICE',
				submodules: [
					{
						id: 7,
						name: 'GESTIÓN DE COBRANZA',
						icon: 'mdiViewModule',
						groups: [],
						pathPadre: null,
						path: null,
						programs: [
							{
								id: 56,
								name: 'ABONOS',
								url: 'http://backoffice.127.0.0.1.nip.io:4000/None/None',
								pathPadre: null,
								path: 'None/None',
								icon: 'mdiLaptop',
								actions: {
									allActions: true,
									read: false,
									create: false,
									update: false,
									delete: false,
								},
							},
						],
					},
				],
			},
			{
				id: 9,
				name: 'SEGURIDAD',
				icon: 'SecurityIcon',
				entorno: 'BACKOFFICE',
				submodules: [],
			},
		],
	},
];