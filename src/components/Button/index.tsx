import { useControlActions } from '@/hooks';
import { ButtonAntd } from '../ButtonAntd';
import { ReactNode, useMemo } from 'react';
import { EActionType } from '@/enums';
import { isDisabledAction } from '@/helpers/functions';
import { useActionsUser, useLegacyAppLayoutStore } from '@/store';
import { useOnlineStatus } from '@/hooks/useOnlineStatus/useOnlineStatus';

export type TButtonType =
	| 'primary'
	| 'secondary'
	| 'default'
	| 'dashed'
	| 'text'
	| 'link'
	| 'submit'
	| 'danger'
	| 'warning'
	| 'success'
	| 'info';

export type TButtonColor = 'primary' | 'danger' | 'warning' | 'success' | 'info';
type TButtonAppearance = 'primary' | 'secondary' | 'default' | 'dashed' | 'text' | 'link';

export interface IButtonProps {
	size?: 'small' | 'middle' | 'large';
	type?: TButtonType;
	/**
	 * Aplica una paleta pastel semántica sin alterar la lógica del botón.
	 * Ejemplo confirmación: `<Button type="primary" color="success" label="Confirmar" />`
	 * Atajo equivalente: `<Button type="success" label="Confirmar" />`
	 */
	color?: TButtonColor;
	/** Alias compatible con Ant Design para color="danger". */
	danger?: boolean;
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
	loading?: boolean;
	allowEnterKey?: boolean;
}

const colorClasses: Record<TButtonColor, string> = {
	primary: 'itsa-btn--color-primary',
	danger: 'itsa-btn--danger',
	warning: 'itsa-btn--warning',
	success: 'itsa-btn--success',
	info: 'itsa-btn--info',
};

const statusTypes: TButtonType[] = ['danger', 'warning', 'success', 'info'];

const getButtonAppearance = (type: TButtonType): TButtonAppearance => {
	switch (type) {
		case 'danger':
		case 'warning':
		case 'success':
		case 'info':
			return 'default';
		case 'submit':
			return 'primary';
		default:
			return type;
	}
};

export const Button = (props: IButtonProps) => {
	const isOnline = useOnlineStatus();
	const currentAgency = useLegacyAppLayoutStore(state => state.currentAgency);
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
		if (actionType !== undefined) {
			const isDisabled = isDisabledAction(actionsUser, actionType);
			return isDisabled;
		}
		return false;
	}, [actionType, actionsUser]);

	const {
		size = 'middle',
		type = 'primary',
		color,
		danger = false,
		htmlType,
		label,
		disabled = false,
		onClick,
		allowEnterKey = false,
		shape,
	} = props;
	const isUnavailableByPropOrNetwork = disabled === true || isOnline === false;
	const sizeClass = size === 'small' ? 'itsa-btn--sm' : size === 'middle' ? 'itsa-btn--md' : 'itsa-btn--lg';
	const statusType = statusTypes.includes(type) ? (type as TButtonColor) : undefined;
	const resolvedColor = danger ? 'danger' : (color ?? statusType);
	const colorClass = resolvedColor ? colorClasses[resolvedColor] : '';

	const appearance = getButtonAppearance(type);
	const variantClass =
		appearance === 'primary'
			? 'itsa-btn--primary'
			: appearance === 'secondary'
				? 'itsa-btn--secondary'
				: appearance === 'default'
					? 'itsa-btn--secondary itsa-btn--default'
					: `itsa-btn--${appearance}`;
	const legacyDefaultClass = type === 'secondary' && (props.default ?? false) ? 'itsa-btn--default' : '';
	const className = ['itsa-btn', sizeClass, colorClass, variantClass, legacyDefaultClass].filter(Boolean).join(' ');
	const antdType =
		appearance === 'secondary' || appearance === 'default'
			? 'default'
			: appearance;

	const disabledClass = isUnavailableByPropOrNetwork ? [className, 'itsa-btn--disabled', 'rounded-[12px]'].join(' ') : '';

	const labelContent = <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">{label}</span>;

	const handleClick = async () => {
		const agencyId = currentAgency?.id;
		if (validateWithApiAction && programId !== undefined && agencyId !== undefined && (actionType !== undefined)) {
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
	if ((actionType !== undefined) && isDisabledActionButtonByUserActions) {
		return null;
	}

	return (
		<ButtonAntd
			className={appliedClassName}
			size={size}
			type={antdType}
			htmlType={htmlType ?? (type === 'submit' ? 'submit' : 'button')}
			danger={resolvedColor === 'danger'}
			shape={shape}
			disabled={isUnavailableByPropOrNetwork}
			onClick={handleClick}
			onKeyDown={e => {
				if (!allowEnterKey && e.key === 'Enter') {
					e.preventDefault();
					e.stopPropagation();
				}
			}}
			block={block}
			style={{ width: block ? '100%' : (width !== undefined) ? `${width}%` : undefined }}
			loading={loading}
		>
			{labelContent}
		</ButtonAntd>
	);
};