import { EOptionsFilterStatus, EActionType } from '@/enums';
import { IActions, IModule, IProgramActions } from '@/interfaces';
import { TNotificationProps } from '@/types';
import { notification } from 'antd';

export const openNotificationWithIcon = ({ type, message, description }: TNotificationProps) => {
	notification[type]({
		message,
		description,
	});
};

export const normalizeStatus = (status?: string | boolean | number): EOptionsFilterStatus => {
	if (status === undefined || status === null || status === '') return 2;

	if (status === true || status === 'true' || status === 1 || status === '1') return 1;

	if (status === false || status === 'false' || status === 0 || status === '0') return 0;

	return 2;
};

export const getProgramActionsbyPath = (path: string, module: IModule): IProgramActions | undefined => {
    if (!path || !module?.submodules?.length) return undefined;
    // Normaliza paths para comparar por segmentos y evitar coincidencias parciales (role vs roles)
    const extractPathname = (input: string): string => {
        if (!input) return '';
        let cleaned: string = input.trim();
        // elimina protocolo y host si vienen en la URL
        cleaned = cleaned.replace(/^[a-zA-Z]+:\/\/[^/]+/, '');
        // toma solo el path sin query/hash sin usar indexación insegura
        const qIndex = cleaned.indexOf('?');
        const hIndex = cleaned.indexOf('#');
        let endIndex = cleaned.length;
        if (qIndex !== -1 && hIndex !== -1) endIndex = Math.min(qIndex, hIndex);
        else if (qIndex !== -1) endIndex = qIndex;
        else if (hIndex !== -1) endIndex = hIndex;
        const withoutQuery: string = cleaned.substring(0, endIndex);
        // normaliza slashes de inicio/fin
        let pathname: string = withoutQuery;
        if (pathname.startsWith('/')) pathname = pathname.slice(1);
        if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
        return pathname;
    };

    const matchesPath = (urlString: string, target: string): boolean => {
        const urlPath = extractPathname(urlString);
        const targetPathname = extractPathname(target);
        if (!urlPath || !targetPathname) return false;
        if (urlPath === targetPathname) return true;
        // debe coincidir por segmento: target + '/...'
        return urlPath.startsWith(targetPathname + '/');
    };

    const targetPath: string = path;

    const submodules = module.submodules ?? [];
    for (const submodule of submodules) {
		// 1) Buscar en programs del submódulo
		const programs = submodule.programs;
		if (programs) {
            for (const program of programs) {
                const url = program.url ? program.url : undefined;
                if (typeof url === 'string' && url.length > 0 && matchesPath(url, targetPath)) {
					if (program.actions) {
						return { actions: program.actions, program: program};
					}
				}
			}
		}

		// 2) Buscar en groups -> programs
		const groups = submodule.groups;
		if (groups) {
			for (const group of groups) {
				const groupPrograms = group.programs;
				if (groupPrograms) {
                    for (const program of groupPrograms) {
                        const url = program.url ? program.url : undefined;
                        if (typeof url === 'string' && url.length > 0 && matchesPath(url, targetPath)) {
							if (program.actions) {
								return { actions: program.actions, program: program };
							}
						}
					}
				}
			}
		}
	}

	return undefined;
};



export const disabledActionButton = (actionExecute?: EActionType, actions?: IActions) => {
	if (!actionExecute) return false;
	if (!actions) return true;
	if (actions.allActions === true) {
		return false;
	}
	if (actions.create === true && actionExecute === EActionType.create) {
		return false;
	}
	if (actions.read === true && actionExecute === EActionType.read) {
		return false;
	}
	if (actions.update === true && actionExecute === EActionType.update) {
		return false;
	}
	if (actions.delete === true && actionExecute === EActionType.delete) {
		return false;
	}
	return true;
};
