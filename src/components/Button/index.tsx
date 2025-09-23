import { ButtonAntd } from '../ButtonAntd';
import { ReactNode } from 'react';

export interface IButtonProps {
	size?: 'small' | 'middle' | 'large';
	type?: 'primary' | 'secondary' | 'submit';
	label?: ReactNode;
	disabled?: boolean;
	onClick?: () => void;
	default?: boolean;
	width?: number;
}

export const Button = (props: IButtonProps) => {
	const { width } = props;
	const { size = 'small', type = 'primary', label, disabled = false, onClick } = props;
	const sizeClass = size === 'small' ? 'itsa-btn--sm' : size === 'middle' ? 'itsa-btn--md' : 'itsa-btn--lg';
	const variantClass = type === 'primary' ? 'itsa-btn--primary' : 'itsa-btn--secondary';
	const defaultSecondaryClass = type === 'secondary' && props.default ? 'itsa-btn--default' : '';
	const className = ['itsa-btn', sizeClass, variantClass, defaultSecondaryClass].filter(Boolean).join(' ');
	const antdType: 'primary' | 'default' = type === 'primary' ? 'primary' : 'default';

	const disabledClass = disabled ? sizeClass + 'itsa-btn--disabled rounded-[12px]' : '';

	if (disabled === true) {
		return (
			<ButtonAntd
				className={disabledClass}
				size={size}
				type={antdType}
				disabled={disabled}
				onClick={onClick}
				style={{ width: width ? `${width}%` : undefined }}
			>
				{label}
			</ButtonAntd>
		);
	}

	return (
		<ButtonAntd className={className} size={size} type={antdType} disabled={disabled} onClick={onClick} style={{ width: width ? `${width}%` : undefined }}>
			{label}
		</ButtonAntd>
	);
};
