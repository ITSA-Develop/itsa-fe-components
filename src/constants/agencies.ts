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
// 								"pathPadre": "",
//                                 "path": "",
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
//                                         "id": 89,
//                                         "name": "ROLES",
//                                         "url": "http://backoffice.127.0.0.1.nip.io:4000/security/accesses/roles?status=1",
//                                         "pathPadre": "security/accesses",
//                                         "path": "security/accesses/roles?status=1",
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
//                                 "pathPadre": "",
//                                 "path": "",
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
//                                 "pathPadre": "",
//                                 "path": "",
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
        "id": 4,
        "name": "CUENCA",
        "modules": [
          {
            "id": 1,
            "name": "VEHÍCULOS",
            "icon": "mdiSquareRoundedOutline",
            "entorno": "FRONTOFFICE",
            "submodules": [
              {
                "id": 2,
                "name": "GESTIÓN DE COMPRAS",
                "icon": "mdiViewModule",
                "groups": [],
                "pathPadre": null,
                "path": null,
                "programs": [
                  {
                    "id": 40,
                    "name": "GESTIÓN DE TRÁNSITO",
                    "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/",
                    "pathPadre": null,
                    "path": "None/",
                    "icon": "mdiLaptop",
                    "actions": {
                      "allActions": true,
                      "read": false,
                      "create": false,
                      "update": false,
                      "delete": false
                    }
                  },
                  {
                    "id": 41,
                    "name": "GESTIÓN DE COMPRAS VEHÍCULOS NUEVOS",
                    "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                    "pathPadre": null,
                    "path": "None/None",
                    "icon": "mdiLaptop",
                    "actions": {
                      "allActions": true,
                      "read": false,
                      "create": false,
                      "update": false,
                      "delete": false
                    }
                  },
                  {
                    "id": 73,
                    "name": "GESTIÓN DE COMPRAS VEHÍCULOS USADOS",
                    "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                    "pathPadre": null,
                    "path": "None/None",
                    "icon": "mdiLaptop",
                    "actions": {
                      "allActions": true,
                      "read": false,
                      "create": false,
                      "update": false,
                      "delete": false
                    }
                  }
                ]
              },
              {
                "id": 3,
                "name": "GESTIÓN DE VENTAS",
                "icon": "mdiViewModule",
                "groups": [],
                "pathPadre": null,
                "path": null,
                "programs": [
                  {
                    "id": 42,
                    "name": "VENTAS",
                    "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                    "pathPadre": null,
                    "path": "None/None",
                    "icon": "mdiLaptop",
                    "actions": {
                      "allActions": true,
                      "read": false,
                      "create": false,
                      "update": false,
                      "delete": false
                    }
                  },
                  {
                    "id": 43,
                    "name": "AUTORIZACIONES",
                    "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                    "pathPadre": null,
                    "path": "None/None",
                    "icon": "mdiLaptop",
                    "actions": {
                      "allActions": true,
                      "read": false,
                      "create": false,
                      "update": false,
                      "delete": false
                    }
                  }
                ]
              },
              {
                "id": 1,
                "name": "MANTENIMIENTOS",
                "icon": "mdiViewModule",
                "pathPadre": null,
                "path": null,
                "groups": [
                  {
                    "id": 1,
                    "name": "GESTIÓN DE ENTIDADES PERSONALES",
                    "icon": "mdiAccount",
                    "pathPadre": null,
                    "path": null,
                    "programs": [
                      {
                        "id": 45,
                        "name": "TRANSPORTISTAS",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 46,
                        "name": "COLABORADORES",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 47,
                        "name": "PROVEEDORES",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 44,
                        "name": "CLIENTES",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/vehicles/clients-management/",
                        "pathPadre": "vehicles/clients-management",
                        "path": "vehicles/clients-management/",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": false,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      }
                    ]
                  },
                  {
                    "id": 4,
                    "name": "PARÁMETROS Y CONFIGURACIÓN",
                    "icon": "mdiCog",
                    "pathPadre": null,
                    "path": null,
                    "programs": [
                      {
                        "id": 60,
                        "name": "CONSTANTES & PARÁMETROS DEL SISTEMA",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 61,
                        "name": "DÍAS DE FERIADO",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      }
                    ]
                  },
                  {
                    "id": 6,
                    "name": "PROCESOS Y DOCUMENTOS LEGALES",
                    "icon": "mdiFileDocument",
                    "pathPadre": null,
                    "path": null,
                    "programs": [
                      {
                        "id": 62,
                        "name": "PEPS",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 63,
                        "name": "PROVIDENCIAS",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 64,
                        "name": "SANCIONADOS ONU",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 65,
                        "name": "OFAC",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      }
                    ]
                  },
                  {
                    "id": 5,
                    "name": "PRECIOS Y VENTAS",
                    "icon": "mdiSale",
                    "pathPadre": null,
                    "path": null,
                    "programs": [
                      {
                        "id": 66,
                        "name": "POLÍTICAS DE PRECIOS",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 67,
                        "name": "PRESUPUESTO DE VENTA",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 68,
                        "name": "REGALOS",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 69,
                        "name": "PROMOCIONES",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 70,
                        "name": "VALOR TRADE IN",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      }
                    ]
                  },
                  {
                    "id": 7,
                    "name": "GESTIÓN DE VEHÍCULOS, PRODUCTOS Y ACCESORIOS",
                    "icon": "mdiCarBack",
                    "pathPadre": null,
                    "path": null,
                    "programs": [
                      {
                        "id": 71,
                        "name": "GESTIÓN DE MODELOS",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 72,
                        "name": "RASTREO Y SEGURIDAD",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      }
                    ]
                  }
                ],
                "programs": []
              }
            ]
          },
          {
            "id": 2,
            "name": "LÍNEA PARA EL HOGAR",
            "icon": "mdiSquareRoundedOutline",
            "entorno": "FRONTOFFICE",
            "submodules": [
              {
                "id": 5,
                "name": "GESTIÓN DE COMPRAS",
                "icon": "mdiViewModule",
                "groups": [],
                "pathPadre": null,
                "path": null,
                "programs": [
                  {
                    "id": 48,
                    "name": "COMPRAS",
                    "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                    "pathPadre": null,
                    "path": "None/None",
                    "icon": "mdiLaptop",
                    "actions": {
                      "allActions": true,
                      "read": false,
                      "create": false,
                      "update": false,
                      "delete": false
                    }
                  },
                  {
                    "id": 49,
                    "name": "GESTIÓN DE RECEPCIÓN",
                    "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                    "pathPadre": null,
                    "path": "None/None",
                    "icon": "mdiLaptop",
                    "actions": {
                      "allActions": true,
                      "read": false,
                      "create": false,
                      "update": false,
                      "delete": false
                    }
                  }
                ]
              },
              {
                "id": 6,
                "name": "GESTIÓN DE VENTAS",
                "icon": "mdiViewModule",
                "groups": [],
                "pathPadre": null,
                "path": null,
                "programs": [
                  {
                    "id": 50,
                    "name": "VENTAS",
                    "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                    "pathPadre": null,
                    "path": "None/None",
                    "icon": "mdiLaptop",
                    "actions": {
                      "allActions": true,
                      "read": false,
                      "create": false,
                      "update": false,
                      "delete": false
                    }
                  },
                  {
                    "id": 51,
                    "name": "AUTORIZACIONES",
                    "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                    "pathPadre": null,
                    "path": "None/None",
                    "icon": "mdiLaptop",
                    "actions": {
                      "allActions": true,
                      "read": false,
                      "create": false,
                      "update": false,
                      "delete": false
                    }
                  }
                ]
              },
              {
                "id": 4,
                "name": "MANTENIMIENTOS",
                "icon": "mdiViewModule",
                "pathPadre": null,
                "path": null,
                "groups": [
                  {
                    "id": 2,
                    "name": "GESTIÓN DE ENTIDADES PERSONALES",
                    "icon": "mdiAccount",
                    "pathPadre": null,
                    "path": null,
                    "programs": [
                      {
                        "id": 52,
                        "name": "CLIENTES",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 53,
                        "name": "TRANSPORTISTAS",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 54,
                        "name": "COLABORADORES",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      },
                      {
                        "id": 55,
                        "name": "PROVEEDORES",
                        "url": "http://frontoffice.127.0.0.1.nip.io:4001/None/None",
                        "pathPadre": null,
                        "path": "None/None",
                        "icon": "mdiLaptop",
                        "actions": {
                          "allActions": true,
                          "read": false,
                          "create": false,
                          "update": false,
                          "delete": false
                        }
                      }
                    ]
                  }
                ],
                "programs": []
              }
            ]
          },
          {
            "id": 6,
            "name": "CARTERA",
            "icon": "mdiSquareRoundedOutline",
            "entorno": "BACKOFFICE",
            "submodules": [
              {
                "id": 7,
                "name": "GESTIÓN DE COBRANZA",
                "icon": "mdiViewModule",
                "groups": [],
                "pathPadre": null,
                "path": null,
                "programs": [
                  {
                    "id": 56,
                    "name": "ABONOS",
                    "url": "http://backoffice.127.0.0.1.nip.io:4000/None/None",
                    "pathPadre": null,
                    "path": "None/None",
                    "icon": "mdiLaptop",
                    "actions": {
                      "allActions": true,
                      "read": false,
                      "create": false,
                      "update": false,
                      "delete": false
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
// export const AGENCIES_DATA: IAgency[] = [
// 	{
// 		id: 4,
// 		name: 'CUENCA',
// 		modules: [
// 			{
// 				id: 1,
// 				name: 'VEHÍCULOS',
// 				path: null,
// 				icon: 'mdiSquareRoundedOutline',
// 				entorno: 'frontoffice',
// 				submodules: [
// 					{
// 						id: 2,
// 						name: 'GESTIÓN DE COMPRAS',
// 						path: null,
// 						icon: 'IconCamion',
// 						groups: [],
// 						programs: [
// 							{
// 								id: 1,
// 								name: 'GESTIÓN DE TRÁNSITO',
// 								path: '/itsa/security/maintenance/modules',
// 								url: '/itsa/security/maintenance/modules',
// 								icon: 'IconCamion',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 2,
// 								name: 'GESTIÓN DE COMPRAS VEHÍCULOS NUEVOS',
// 								path: '/vehiculos/gestion-compras-nuevos',
// 								url: '/vehiculos/gestion-compras-nuevos',
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 41,
// 								name: 'GESTIÓN DE COMPRAS VEHÍCULOS USADOS',
// 								path: '/vehiculos/gestion-compras-usados',
// 								url: '/vehiculos/gestion-compras-usados',
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 42,
// 								name: 'GESTIÓN DE TRÁNSITO',
// 								path: '/vehiculos/gestion-transito',
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 						],
// 					},
// 					{
// 						id: 3,
// 						name: 'GESTIÓN DE VENTAS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [],
// 						programs: [
// 							{
// 								id: 3,
// 								name: 'VENTAS',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 4,
// 								name: 'AUTORIZACIONES',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 						],
// 					},
// 					{
// 						id: 1,
// 						name: 'MANTENIMIENTOS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [
// 							{
// 								id: 1,
// 								name: 'GESTIÓN DE ENTIDADES PERSONALES',
// 								path: null,
// 								icon: 'mdiAccount',
// 								programs: [
// 									{
// 										id: 5,
// 										name: 'CLIENTES',
// 										path: '/nucleo/gestion-clientes',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 6,
// 										name: 'TRANSPORTISTAS',
// 										path: '/nucleo/gestion-transportistas',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 7,
// 										name: 'COLABORADORES',
// 										path: '/nucleo/gestion-colaboradores',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 12,
// 										name: 'PROVEEDORES',
// 										path: '/nucleo/gestion-proveedores',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 								],
// 							},
// 							{
// 								id: 4,
// 								name: 'PARÁMETROS Y CONFIGURACIÓN',
// 								path: null,
// 								icon: 'mdiCog',
// 								programs: [
// 									{
// 										id: 28,
// 										name: 'CONSTANTES & PARÁMETROS DEL SISTEMA',
// 										path: '/nucleo/constantes-y-parametros',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 29,
// 										name: 'DÍAS DE FERIADO',
// 										path: '/nucleo/feriados',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 								],
// 							},
// 							{
// 								id: 6,
// 								name: 'PROCESOS Y DOCUMENTOS LEGALES',
// 								path: null,
// 								icon: 'mdiFileDocument',
// 								programs: [
// 									{
// 										id: 30,
// 										name: 'PEPS',
// 										path: '/nucleo/peps',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 31,
// 										name: 'PROVIDENCIAS',
// 										path: '/nucleo/providencias',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 32,
// 										name: 'SANCIONADOS ONU',
// 										path: '/nucleo/sancionados-onu',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 33,
// 										name: 'OFAC',
// 										path: '/nucleo/ofac',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 								],
// 							},
// 							{
// 								id: 5,
// 								name: 'PRECIOS Y VENTAS',
// 								path: null,
// 								icon: 'mdiSale',
// 								programs: [
// 									{
// 										id: 34,
// 										name: 'POLÍTICAS DE PRECIOS',
// 										path: '/vehiculos/politicas-precios',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 35,
// 										name: 'PRESUPUESTO DE VENTA',
// 										path: '/vehiculos/presupuesto-venta',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 36,
// 										name: 'REGALOS',
// 										path: '/vehiculos/regalos',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 37,
// 										name: 'PROMOCIONES',
// 										path: '/vehiculos/promociones',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 38,
// 										name: 'VALOR TRADE IN',
// 										path: '/vehiculos/trade-in',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 								],
// 							},
// 							{
// 								id: 7,
// 								name: 'GESTIÓN DE VEHÍCULOS, PRODUCTOS Y ACCESORIOS',
// 								path: null,
// 								icon: 'mdiCarBack',
// 								programs: [
// 									{
// 										id: 39,
// 										name: 'GESTIÓN DE MODELOS',
// 										path: '/vehiculos/modelos',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 40,
// 										name: 'RASTREO Y SEGURIDAD',
// 										path: '/vehiculos/rastreo-seguridad',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 								],
// 							},
// 						],
// 						programs: [],
// 					},
// 				],
// 			},
// 			{
// 				id: 2,
// 				name: 'LÍNEA PARA EL HOGAR',
// 				path: null,
// 				icon: 'mdiSquareRoundedOutline',
// 				entorno: 'frontoffice',
// 				submodules: [
// 					{
// 						id: 5,
// 						name: 'GESTIÓN DE COMPRAS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [],
// 						programs: [
// 							{
// 								id: 13,
// 								name: 'COMPRAS',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 14,
// 								name: 'GESTIÓN DE RECEPCIÓN',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 						],
// 					},
// 					{
// 						id: 6,
// 						name: 'GESTIÓN DE VENTAS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [],
// 						programs: [
// 							{
// 								id: 15,
// 								name: 'VENTAS',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 16,
// 								name: 'AUTORIZACIONES',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 						],
// 					},
// 					{
// 						id: 4,
// 						name: 'MANTENIMIENTOS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [
// 							{
// 								id: 2,
// 								name: 'GESTIÓN DE ENTIDADES PERSONALES',
// 								path: null,
// 								icon: 'mdiAccount',
// 								programs: [
// 									{
// 										id: 17,
// 										name: 'CLIENTES',
// 										path: null,
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 18,
// 										name: 'TRANSPORTISTAS',
// 										path: null,
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 19,
// 										name: 'COLABORADORES',
// 										path: null,
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 23,
// 										name: 'PROVEEDORES',
// 										path: null,
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 								],
// 							},
// 						],
// 						programs: [],
// 					},
// 				],
// 			},
// 			{
// 				id: 6,
// 				name: 'CARTERA',
// 				path: null,
// 				icon: 'mdiSquareRoundedOutline',
// 				entorno: 'backoffice',
// 				submodules: [
// 					{
// 						id: 7,
// 						name: 'GESTIÓN DE COBRANZA',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [],
// 						programs: [
// 							{
// 								id: 24,
// 								name: 'ABONOS',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 						],
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		id: 6,
// 		name: 'MACHALA',
// 		modules: [
// 			{
// 				id: 1,
// 				name: 'VEHÍCULOS',
// 				path: null,
// 				icon: 'mdiSquareRoundedOutline',
// 				entorno: 'frontoffice',
// 				submodules: [
// 					{
// 						id: 2,
// 						name: 'GESTIÓN DE COMPRAS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [],
// 						programs: [
// 							{
// 								id: 1,
// 								name: 'GESTIÓN DE TRÁNSITO',
// 								path: '/itsa/security/maintenance/modules',
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 2,
// 								name: 'GESTIÓN DE COMPRAS VEHÍCULOS NUEVOS',
// 								path: '/vehiculos/gestion-compras-nuevos',
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 41,
// 								name: 'GESTIÓN DE COMPRAS VEHÍCULOS USADOS',
// 								path: '/vehiculos/gestion-compras-usados',
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 42,
// 								name: 'GESTIÓN DE TRÁNSITO',
// 								path: '/vehiculos/gestion-transito',
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 						],
// 					},
// 					{
// 						id: 3,
// 						name: 'GESTIÓN DE VENTAS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [],
// 						programs: [
// 							{
// 								id: 3,
// 								name: 'VENTAS',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 4,
// 								name: 'AUTORIZACIONES',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 						],
// 					},
// 					{
// 						id: 1,
// 						name: 'MANTENIMIENTOS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [
// 							{
// 								id: 1,
// 								name: 'GESTIÓN DE ENTIDADES PERSONALES',
// 								path: null,
// 								icon: 'mdiAccount',
// 								programs: [
// 									{
// 										id: 5,
// 										name: 'CLIENTES',
// 										path: '/nucleo/gestion-clientes',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 6,
// 										name: 'TRANSPORTISTAS',
// 										path: '/nucleo/gestion-transportistas',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 7,
// 										name: 'COLABORADORES',
// 										path: '/nucleo/gestion-colaboradores',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 12,
// 										name: 'PROVEEDORES',
// 										path: '/nucleo/gestion-proveedores',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 								],
// 							},
// 							{
// 								id: 5,
// 								name: 'PRECIOS Y VENTAS',
// 								path: null,
// 								icon: 'mdiSale',
// 								programs: [
// 									{
// 										id: 38,
// 										name: 'VALOR TRADE IN',
// 										path: '/vehiculos/trade-in',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 								],
// 							},
// 						],
// 						programs: [],
// 					},
// 				],
// 			},
// 			{
// 				id: 2,
// 				name: 'LÍNEA PARA EL HOGAR',
// 				path: null,
// 				icon: 'mdiSquareRoundedOutline',
// 				entorno: 'frontoffice',
// 				submodules: [
// 					{
// 						id: 5,
// 						name: 'GESTIÓN DE COMPRAS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [],
// 						programs: [
// 							{
// 								id: 13,
// 								name: 'COMPRAS',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 14,
// 								name: 'GESTIÓN DE RECEPCIÓN',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 						],
// 					},
// 					{
// 						id: 6,
// 						name: 'GESTIÓN DE VENTAS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [],
// 						programs: [
// 							{
// 								id: 15,
// 								name: 'VENTAS',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 16,
// 								name: 'AUTORIZACIONES',
// 								path: null,
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 						],
// 					},
// 					{
// 						id: 4,
// 						name: 'MANTENIMIENTOS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [
// 							{
// 								id: 2,
// 								name: 'GESTIÓN DE ENTIDADES PERSONALES',
// 								path: null,
// 								icon: 'mdiAccount',
// 								programs: [
// 									{
// 										id: 17,
// 										name: 'CLIENTES',
// 										path: null,
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 18,
// 										name: 'TRANSPORTISTAS',
// 										path: null,
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 19,
// 										name: 'COLABORADORES',
// 										path: null,
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 									{
// 										id: 23,
// 										name: 'PROVEEDORES',
// 										path: null,
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 								],
// 							},
// 						],
// 						programs: [],
// 					},
// 				],
// 			},
// 		],
// 	},
// ];

// export const AGENCIES_DATA_TOMAS: IAgency[] = [
// 	{
// 		id: 4,
// 		name: 'CUENCA',
// 		modules: [
// 			{
// 				id: 1,
// 				name: 'ESTE ES EL MODULO DEVEHÍCULOS',
// 				path: null,
// 				icon: 'mdiSquareRoundedOutline',
// 				entorno: 'frontoffice',
// 				submodules: [
// 					{
// 						id: 1,
// 						name: 'MANTENIMIENTOS',
// 						path: null,
// 						icon: 'mdiViewModule',
// 						groups: [
// 							{
// 								id: 1,
// 								name: 'GESTIÓN DE ENTIDADES PERSONALES',
// 								path: null,
// 								icon: 'mdiAccount',
// 								programs: [
// 									{
// 										id: 5,
// 										name: 'CLIENTES',
// 										path: '/nucleo/gestion-clientes',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 								],
// 							},
// 						],
// 						programs: [],
// 					},
// 				],
// 			},
// 			{
// 				id: 26,
// 				name: 'REPUESTOS',
// 				path: null,
// 				icon: 'mdiCarSpeedLimiter',
// 				entorno: 'backoffice',
// 				submodules: [
// 					{
// 						id: 11,
// 						name: 'MANTENIMIENTOS',
// 						path: '',
// 						icon: 'mdiFolder',
// 						groups: [],
// 						programs: [
// 							{
// 								id: 43,
// 								name: 'ORIGEN DE REPUESTOS',
// 								path: '/itsa/spare/origin',
// 								url: '/itsa/spare/origin',
// 								icon: 'mdiArchiveArrowDownOutline',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 44,
// 								name: 'MANT. REPUESTOS',
// 								path: '/itsa/spares',
// 								url: '/itsa/spares',
// 								icon: 'mdiCarWrench',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 45,
// 								name: 'MANT. R. EQUIVALENTES',
// 								path: '/itsa/spares-equivalents',
// 								icon: 'mdiSpaceStation',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 46,
// 								name: 'MANT. R. REEMPLAZO',
// 								path: '/itsa/spares-replacements',
// 								icon: 'mdiSpaceStation',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 						],
// 					},
// 				],
// 			},
// 			{
// 				id: 10,
// 				name: 'SEGURIDAD',
// 				path: 'seguridad',
// 				icon: 'mdiSecurity',
// 				entorno: 'backoffice',
// 				submodules: [
// 					{
// 						id: 8,
// 						name: 'MANTENIMIENTOS',
// 						path: '',
// 						icon: 'mdiFolder',
// 						groups: [
// 							{
// 								id: 3,
// 								name: 'GRUPO DE PRUEBA 1',
// 								path: '',
// 								icon: null,
// 								programs: [
// 									{
// 										id: 27,
// 										name: 'MODULOS GRUPO PRUEBA',
// 										path: '/itsa/security/maintenance/modules',
// 										icon: 'mdiLaptop',
// 										actions: {
// 											allActions: 1,
// 											read: 0,
// 											create: 0,
// 											update: 0,
// 											delete: 0,
// 										},
// 									},
// 								],
// 							},
// 						],
// 						programs: [
// 							{
// 								id: 26,
// 								name: 'PROGRAMAS',
// 								path: '/itsa/security/maintenance/programs',
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 							{
// 								id: 25,
// 								name: 'MODULOS',
// 								path: '/itsa/security/maintenance/modules',
// 								icon: 'mdiLaptop',
// 								actions: {
// 									allActions: 1,
// 									read: 0,
// 									create: 0,
// 									update: 0,
// 									delete: 0,
// 								},
// 							},
// 						],
// 					},
// 				],
// 			},
// 		],
// 	},
// ];
