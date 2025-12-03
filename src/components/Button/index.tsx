import { useControlActions } from '@/hooks';
import { ButtonAntd } from '../ButtonAntd';
import { ReactNode } from 'react';
import { EActionType } from '@/enums';
import { disabledActionButton } from '@/helpers/functions';
import { useAppLayoutStore } from '@/store';

export interface IButtonProps {
	size?: 'small' | 'middle' | 'large';
	type?: 'primary' | 'secondary' | 'submit' | 'text';
	htmlType?: 'button' | 'submit' | 'reset';
	label?: ReactNode;
	disabled?: boolean;
	onClick?: () => void;
	default?: boolean;
	width?: number;
	block?: boolean;
	shape?: 'default' | 'round' | 'circle' | undefined;
	actionType?: EActionType;
	validateWithApiAction?: boolean;
	showBtnDisabled?: boolean;
	loading?: boolean;
}

export const Button = (props: IButtonProps) => {
	const currentAgency = useAppLayoutStore(state => state.currentAgency);
	const { programId, actions, fnApiValidatePermissionAction } = useControlActions();

	const { width, block = false, actionType, validateWithApiAction = false, showBtnDisabled, loading = false } = props;
	const { size = 'small', type = 'primary', htmlType, label, disabled = false, onClick } = props;
	const sizeClass = size === 'small' ? 'itsa-btn--sm' : size === 'middle' ? 'itsa-btn--md' : 'itsa-btn--lg';
	const variantClass = type === 'primary' ? 'itsa-btn--primary' : 'itsa-btn--secondary';
	const defaultSecondaryClass = type === 'secondary' && props.default ? 'itsa-btn--default' : '';
	const className = ['itsa-btn', sizeClass, variantClass, defaultSecondaryClass].filter(Boolean).join(' ');
	const antdType: 'primary' | 'default' = type === 'primary' ? 'primary' : 'default';

	const disabledClass = disabled ? sizeClass + ' itsa-btn--disabled rounded-[12px]' : '';

	const labelContent = <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">{label}</span>;
	console.log('actions =>', actions);
	console.log('programId =>', programId);
	console.log('actionType =>', actionType);
	const isDisabledAction = disabled === true ? true : disabledActionButton(actionType, actions);

	const handleClick = async () => {
		const agencyId = currentAgency?.id;
		if (validateWithApiAction && programId && agencyId && actionType) {
			const isValid = await fnApiValidatePermissionAction(actionType, programId, agencyId);
			if (isValid) {
				onClick?.();
				return;
			}
		} else {
			onClick?.();
		}
	};
	const appliedClassName = isDisabledAction === true ? disabledClass : className;

	if (actionType) {
		if (showBtnDisabled !== true && isDisabledAction) {
			return null;
		}
	}

	return (
		<ButtonAntd
			className={appliedClassName}
			size={size}
			type={antdType}
			htmlType={htmlType}
			disabled={isDisabledAction}
			onClick={handleClick}
			block={block}
			style={{ width: block ? '100%' : width ? `${width}%` : undefined }}
			loading={loading}
		>
			{labelContent}
		</ButtonAntd>
	);
};
