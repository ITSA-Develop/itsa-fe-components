// import { useCallback, useMemo } from 'react';

// // import { IPermission, IPermissionActions, IPermissionProgram } from '../../interfaces';

// const normalizePath = (path: string): string => path.replace(/\/+$/, '').toLowerCase();

// export const usePermissionTools = (permissions: IPermission | null) => {
// 	const permissionMap = useMemo(() => {
// 		const map = new Map<string, IPermissionProgram>();
// 		if (!permissions) return map;

// 		const traverse = (programs?: IPermissionProgram[]) => {
// 			if (!programs) return;
// 			for (const program of programs) {
// 				if (program.path) {
// 					map.set(program.path, program);
// 				}
// 				if (program.programs) {
// 					traverse(program.programs);
// 				}
// 			}
// 		};

// 		for (const agency of permissions.agencies) {
// 			for (const module of agency.modules) {
// 				for (const submodule of module.submodules) {
// 					traverse(submodule.programs);
// 					traverse(submodule.groups);
// 				}
// 			}
// 		}

// 		return map;
// 	}, [permissions]);

// 	const getActionFromPath = (path: string): 'read' | 'create' | 'update' => {
// 		const basePath = path.split('?')[0];
// 		const normalized = normalizePath(basePath ?? '');

// 		if (normalized.endsWith('/crear')) return 'create';
// 		if (/\/editar(\/|$)/.test(normalized)) return 'update';
// 		if (/\/detalles(\/|$)/.test(normalized)) return 'read';

// 		return 'read';
// 	};

// 	const canAccessRoute = useCallback(
// 		(path: string): boolean => {
// 			if (!path || !permissions) return false;

// 			const normalized = normalizePath(path);
// 			if (normalized.includes('gestion-personas')) {
// 				return true;
// 			}
// 			const requiredAction = getActionFromPath(normalized);

// 			if (normalized === '' || normalized === '/') {
// 				return true;
// 			}

// 			const exactProgram = permissionMap.get(normalized);
// 			if (exactProgram) {
// 				const { actions } = exactProgram;
// 				if (actions.all_actions === 1) return true;
// 				if (actions[requiredAction] === 1) return true;
// 				return false;
// 			}

// 			const matchingParent = Array.from(permissionMap.entries())
// 				.filter(([permPath]) => normalized.startsWith(permPath + '/'))
// 				.sort((a, b) => b[0].length - a[0].length)
// 				.find(([, program]) => program.actions.all_actions === 1 || program.actions[requiredAction] === 1);

// 			return !!matchingParent;
// 		},
// 		[permissions, permissionMap],
// 	);

// 	const can = useCallback(
// 		(path: string, action: keyof IPermissionActions): boolean => {
// 			if (!path) return false;
// 			const normalized = normalizePath(path);
// 			const program = permissionMap.get(normalized);
// 			if (!program) return false;
// 			const { actions } = program;
// 			return actions.all_actions === 1 || actions[action] === 1;
// 		},
// 		[permissionMap],
// 	);

// 	return {
// 		can,
// 		canAccessRoute,
// 	};
// };
