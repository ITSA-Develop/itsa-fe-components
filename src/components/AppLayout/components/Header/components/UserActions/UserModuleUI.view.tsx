import { useEncrypt } from '@/hooks/useEncrypt/useEncrypt';
import { useAppLayoutStore } from '@/store/appLayout.store';
import { SettingOutlined } from '@ant-design/icons';
import { Select, SelectProps } from 'antd';
import { useMemo } from 'react';
import { NavigateFunction } from 'react-router-dom';

const SELECT_CLASSNAME =
	'w-full min-w-0 [&_.ant-select-selector]:!bg-primary-600 [&_.ant-select-selector]:!border-primary-700 [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!text-white-100 [&_.ant-select-selection-placeholder]:!text-white-100 [&_.ant-select-arrow]:!text-white-100 hover:[&_.ant-select-selector]:!bg-primary-700 hover:[&_.ant-select-selector]:!border-primary-700 [&.ant-select-focused_.ant-select-selector]:!bg-primary-700 [&.ant-select-focused_.ant-select-selector]:!border-primary-700';

const SELECT_WRAPPER_CLASSNAME = 'w-[200px] min-w-[160px] max-w-[220px] shrink-0';

const POPUP_STYLES: SelectProps['styles'] = {
	popup: { root: { minWidth: 220, maxWidth: 'calc(100vw - 24px)', maxHeight: 320, overflow: 'auto' } },
};

export interface UserModuleUIProps {
	loadingAppLayout?: boolean;
	navigateApp?: NavigateFunction;
}

export const UserModuleUI = ({ loadingAppLayout = false, navigateApp }: UserModuleUIProps) => {
	const { encryptKey } = useEncrypt();
	const { modulesAgency, currentModule, setCurrentModule, setSubmodulesAgency, setCurrentSubmodule } =
		useAppLayoutStore();

	const moduleOptions = useMemo(
		() =>
			modulesAgency.map(module => ({
				value: module.id.toString(),
				label: module.name,
			})),
		[modulesAgency],
	);

	const onSelect = (moduleId: string) => {
		const module = modulesAgency.find(item => item.id.toString() === moduleId);
		if (!module) return;

		setCurrentModule(module, encryptKey);
		setSubmodulesAgency(module.submodules);

		const firstSubmodule = module.submodules[0];
		if (firstSubmodule) {
			setCurrentSubmodule(firstSubmodule, encryptKey);
		}

		navigateApp?.('/home');
	};

	const currentModuleValue = currentModule?.id ? String(currentModule.id) : undefined;

	const selectProps = {
		options: moduleOptions,
		onChange: onSelect,
		value: currentModuleValue,
		loading: loadingAppLayout,
		popupMatchSelectWidth: false,
		styles: POPUP_STYLES,
	};

	return (
		<>
			<div className={`hidden md:block ${SELECT_WRAPPER_CLASSNAME}`}>
				<Select
					{...selectProps}
					placeholder="Sin módulos asignados"
					className={SELECT_CLASSNAME}
				/>
			</div>

			<div className="block shrink-0 md:hidden">
				<Select
					{...selectProps}
					placeholder={<SettingOutlined />}
					placement="bottomRight"
					className={SELECT_CLASSNAME}
				/>
			</div>
		</>
	);
};
