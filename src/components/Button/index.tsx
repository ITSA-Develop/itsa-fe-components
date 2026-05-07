import { useControlActions } from '@/hooks';
import { ButtonAntd } from '../ButtonAntd';
import { ReactNode, useMemo } from 'react';
import { EActionType } from '@/enums';
import { isDisabledAction } from '@/helpers/functions';
import { useActionsUser, useAppLayoutStore } from '@/store';
import { useOnlineStatus } from '@/hooks/useOnlineStatus/useOnlineStatus';

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
	/**
	 * When offline or `disabled` prop is true: `true` (default) renders the button with disabled styling;
	 * `false` hides the button (`null`). Forbidden actions (`actionType` + user permissions) are always hidden when disabled.
	 */
	loading?: boolean;
	allowEnterKey?: boolean;
}

export const Button = (props: IButtonProps) => {
	const isOnline = useOnlineStatus();
	const currentAgency = useAppLayoutStore(state => state.currentAgency);
	const { programId, fnApiValidatePermissionAction } = useControlActions();
	const { actionsUser } = useActionsUser();
	const {
		width,
		block = false,
		actionType,
		validateWithApiAction = false,
		loading = false,
	} = props;

	const isDisabledActionButtonByUserActions = useMemo(() => {
		if (actionType) {
			const isDisabled = isDisabledAction(actionsUser, actionType);
			return isDisabled;
		}
		return false;
	}, [actionType, actionsUser]);

	const { size = 'middle', type = 'primary', htmlType, label, disabled = false, onClick, allowEnterKey = false } = props;
	const isUnavailableByPropOrNetwork = disabled === true || isOnline === false;
	const sizeClass = size === 'small' ? 'itsa-btn--sm' : size === 'middle' ? 'itsa-btn--md' : 'itsa-btn--lg';
	const variantClass = type === 'primary' ? 'itsa-btn--primary' : 'itsa-btn--secondary';
	const defaultSecondaryClass = type === 'secondary' && props.default ? 'itsa-btn--default' : '';
	const className = ['itsa-btn', sizeClass, variantClass, defaultSecondaryClass].filter(Boolean).join(' ');
	const antdType: 'primary' | 'default' = type === 'primary' ? 'primary' : 'default';

	const disabledClass = isUnavailableByPropOrNetwork ? [className, 'itsa-btn--disabled', 'rounded-[12px]'].join(' ') : '';

	const labelContent = <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">{label}</span>;

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

	const appliedClassName = isUnavailableByPropOrNetwork ? disabledClass : className;

	// SOLO ocultar si el usuario no tiene permisos para la acción
	if (actionType && isDisabledActionButtonByUserActions) {
		return null;
	}

	return (
		<ButtonAntd
			className={appliedClassName}
			size={size}
			type={antdType}
			htmlType={htmlType}
			disabled={isUnavailableByPropOrNetwork}
			onClick={handleClick}
			onKeyDown={e => {
				if (!allowEnterKey && e.key === 'Enter') {
					e.preventDefault();
					e.stopPropagation();
				}
			}}
			block={block}
			style={{ width: block ? '100%' : width ? `${width}%` : undefined }}
			loading={loading}
		>
			{labelContent}
		</ButtonAntd>
	);
};