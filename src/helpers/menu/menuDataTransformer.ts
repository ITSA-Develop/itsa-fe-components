import React from 'react';
import { ISubmodule } from '@/interfaces';
import { IModule } from '@/interfaces';
import { IconMenu } from '@/components/IconMenu';
import { TExtendedMenuItem } from '@/types';

// Interfaz para los datos adicionales de cada item del menú

export const getIcon = (icon: string | null): React.ReactNode => {
	const iconToUse = icon || '';
	return React.createElement(IconMenu, { icon: iconToUse });
};

/**
 * Transforma un módulo específico a MenuItemType para usar en el componente Menu
 * Estructura: Submódulos -> Grupos -> Programas
 */
export const transformModuleToMenuData = (module: IModule | null): TExtendedMenuItem[] => {
	if (!module) {
		return [];
	}

	const menuData: TExtendedMenuItem[] = [];

	// Agregar item Home al inicio
	menuData.push({
		key: '/home',
		label: 'INICIO',
		icon: getIcon('home'),
		data: {
			path: '/home',
			icon: 'home',
			type: 'program',
			parentModule: 'home',
			parentSubmodule: 'home',
		},
	});

	// Procesar submodules
	module.submodules.forEach((submodule: ISubmodule) => {
		const submoduleChildren: TExtendedMenuItem[] = [];

		// Agregar grupos al submodule
		if (submodule.groups && submodule.groups.length > 0) {
			submodule.groups.forEach(group => {
				const groupChildren: TExtendedMenuItem[] = [];

				// Agregar programas del grupo
				if (group.programs && group.programs.length > 0) {
					group.programs.forEach((program, index) => {
						groupChildren.push({
							key: `group-${group.id}-program-${program.path ?? index}`,
							label: program.name,
							icon: getIcon(program.icon),
							data: {
								path: program.path ?? `group${index}`,
								url: program.url,
								icon: getIcon(program.icon),
								actions: program.actions,
								type: 'program',
								parentGroup: group.name,
								parentSubmodule: submodule.name,
								parentModule: module.name,
							},
						});
					});
				}

				submoduleChildren.push({
					key: `group-${group.id}`,
					label: group.name,
					icon: getIcon('group'),
					children: groupChildren,
					data: {
						path: null,
						url: null,
						icon: getIcon('group'),
						type: 'group',
						parentSubmodule: submodule.name,
						parentModule: module.name,
					},
				});
			});
		}

		// Agregar programas directos del submodule (que no están en grupos)
		if (submodule.programs && submodule.programs.length > 0) {
			submodule.programs.forEach((program, index) => {
				submoduleChildren.push({
					key: `submodule-${submodule.id}-program-${program.path ?? index}`,
					label: program.name,
					icon: getIcon(program.icon),
					data: {
						path: program.path ?? `program${index}`,
						url: program.url,
						icon: getIcon(program.icon),
						actions: program.actions,
						type: 'program',
						parentSubmodule: submodule.name,
						parentModule: module.name,
					},
				});
			});
		}

		// Solo agregar el submodule si tiene contenido
		if (submoduleChildren.length > 0) {
			menuData.push({
				key: `submodule-${submodule.id}`,
				label: submodule.name,
				icon: getIcon('submodule'),
				children: submoduleChildren,
				data: {
					path: null,
					url: null,
					icon: getIcon('submodule'),
					type: 'submodule',
					parentModule: module.name,
					parentSubmodule: submodule.name,
				},
			});
		}
	});

	return menuData;
};

/**
 * Función para filtrar items del menú por término de búsqueda
 */
export const filterMenuItems = (menuData: TExtendedMenuItem[], searchTerm: string): TExtendedMenuItem[] => {
	if (!searchTerm.trim()) {
		return menuData;
	}

	const searchUpper = searchTerm.toUpperCase();

	const filterRecursive = (items: TExtendedMenuItem[]): TExtendedMenuItem[] => {
		return items
			.map(item => {
				// Type guard para verificar si es SubMenuType (tiene children)
				const isSubMenu = 'children' in item;
				const filteredChildren =
					isSubMenu && item.children ? filterRecursive(item.children as TExtendedMenuItem[]) : undefined;

				// Si el item coincide con la búsqueda o tiene hijos que coinciden
				const matchesSearch =
					('label' in item && item.label?.toString().toUpperCase().includes(searchUpper)) ||
					(filteredChildren && filteredChildren.length > 0);

				if (matchesSearch) {
					return {
						...item,
						children: filteredChildren,
					};
				}
				return null;
			})
			.filter(Boolean) as TExtendedMenuItem[];
	};

	return filterRecursive(menuData);
};

/**
 * Función para obtener información de un item del menú seleccionado
 */
export const getMenuItemInfo = (item: TExtendedMenuItem) => {
	return {
		key: item.key,
		label: 'label' in item ? item.label : undefined,
		data: item.data,
		isLeaf: !('children' in item) || !item.children || item.children.length === 0,
	};
};
