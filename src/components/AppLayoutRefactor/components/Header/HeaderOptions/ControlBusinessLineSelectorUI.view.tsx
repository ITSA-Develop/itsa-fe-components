
import { SettingOutlined } from '@ant-design/icons';
import { Select, SelectProps } from 'antd';
import { useMemo } from 'react';
import { MODULE_SELECT_LABEL_MAX_LENGTH, renderTruncatedHeaderSelectLabel, truncateHeaderSelectLabel } from '../utils/headerSelectLabel';
import { useAppLayoutStore } from '../../store/useAppLayoutStore';
import {
	HEADER_SELECT_CLASSNAME,
	MOBILE_SELECT_WRAPPER_CLASSNAME,
	MOBILE_SELECT_WRAPPER_STYLE,
	MOBILE_TREE_SELECT_CLASSNAME,
	POPUP_STYLES,
	SELECT_WRAPPER_CLASSNAME,
	SELECT_WRAPPER_STYLE,
} from '@/constants';

export interface ControlBusinessLineSelectorUIProps {
	loadingAppLayout?: boolean;
	appNavigate: () => void;
}

export const ControlBusinessLineSelectorUI = ({ loadingAppLayout = false, appNavigate }: ControlBusinessLineSelectorUIProps) => {
	const { subAgency, module, setModule, setSubmodule } = useAppLayoutStore();

	const modulesAgency = subAgency?.modules ?? [];

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

		setModule(module);

		const firstSubmodule = module.submodules[0];
		if (firstSubmodule) {
			setSubmodule(firstSubmodule);
		}
		appNavigate?.();
	};

	const currentModuleValue = module?.id ? String(module.id) : '';

	const labelRenderMobile: SelectProps['labelRender'] = ({ label }) => {
		const text = String(label ?? '');
		return (
			<span title={text}>{truncateHeaderSelectLabel(text, MODULE_SELECT_LABEL_MAX_LENGTH)}</span>
		);
	};

	const selectProps = {
		options: moduleOptions,
		onChange: onSelect,
		value: currentModuleValue,
		size: 'large' as const,
		loading: loadingAppLayout,
		popupMatchSelectWidth: false,
		styles: POPUP_STYLES,
	};

	return (
		<>
			<div className={`hidden md:block ${SELECT_WRAPPER_CLASSNAME}`} style={SELECT_WRAPPER_STYLE}>
				<Select
					{...selectProps}
					placeholder="Sin módulos asignados"
					className={HEADER_SELECT_CLASSNAME}
					labelRender={renderTruncatedHeaderSelectLabel}
				/>
			</div>

			<div className={MOBILE_SELECT_WRAPPER_CLASSNAME} style={MOBILE_SELECT_WRAPPER_STYLE}>
				<Select
					{...selectProps}
					labelRender={labelRenderMobile}
					placeholder={<SettingOutlined className="p-2" />}
					suffixIcon={null}
					placement="bottomRight"
					className={MOBILE_TREE_SELECT_CLASSNAME}
				/>
			</div>
		</>
	);
};
