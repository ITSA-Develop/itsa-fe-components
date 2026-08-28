import { useEncrypt } from '@/hooks/useEncrypt/useEncrypt';
import { useAppLayoutStore } from '@/store/appLayout.store';
import { SettingOutlined } from '@ant-design/icons';
import { Select, SelectProps } from 'antd';
import { useMemo } from 'react';
import { NavigateFunction } from 'react-router-dom';
import {
	MODULE_SELECT_LABEL_MAX_LENGTH,
	truncateHeaderSelectLabel,
} from '../../utils/headerSelectLabel';

const SELECT_CLASSNAME =
	'w-full min-w-0 [&_.ant-select-selector]:!bg-primary-600 [&_.ant-select-selector]:!border-primary-700 [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!text-white-100 [&_.ant-select-selection-item]:!block [&_.ant-select-selection-item]:!max-w-full [&_.ant-select-selection-item]:!truncate [&_.ant-select-selection-placeholder]:!text-white-100 [&_.ant-select-arrow]:!text-white-100 hover:[&_.ant-select-selector]:!bg-primary-700 hover:[&_.ant-select-selector]:!border-primary-700 [&.ant-select-focused_.ant-select-selector]:!bg-primary-700 [&.ant-select-focused_.ant-select-selector]:!border-primary-700';

const MOBILE_SELECT_CLASSNAME =
	`${SELECT_CLASSNAME} [&_.ant-select-selector]:!px-0 [&_.ant-select-selection-placeholder]:!inset-0 [&_.ant-select-selection-placeholder]:!flex [&_.ant-select-selection-placeholder]:!items-center [&_.ant-select-selection-placeholder]:!justify-center`;

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

	const labelRender: SelectProps['labelRender'] = ({ label }) => {
		const text = String(label ?? '');
		return (
			<span title={text}>{truncateHeaderSelectLabel(text, MODULE_SELECT_LABEL_MAX_LENGTH)}</span>
		);
	};

	const selectProps = {
		options: moduleOptions,
		onChange: onSelect,
		value: currentModuleValue,
		loading: loadingAppLayout,
		popupMatchSelectWidth: false,
		styles: POPUP_STYLES,
		labelRender,
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

			<div className="block shrink-0 md:hidden mr-2">
				<Select
					{...selectProps}
					placeholder={<SettingOutlined />}
					suffixIcon={null}
					placement="bottomRight"
					className={MOBILE_SELECT_CLASSNAME}
				/>
			</div>
		</>
	);
};
