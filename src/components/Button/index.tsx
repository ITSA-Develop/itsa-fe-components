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
	const disabledClass = disabled ? 'itsa-btn--disabled' : '';
	const defaultSecondaryClass = type === 'secondary' && props.default ? 'itsa-btn--default' : '';
	const className = ['itsa-btn', sizeClass, variantClass, defaultSecondaryClass, disabledClass].filter(Boolean).join(' ');
	const antdType: 'primary' | 'default' = type === 'primary' ? 'primary' : 'default';

	return (
		<ButtonAntd className={className} size={size} type={antdType} disabled={disabled} onClick={onClick} style={{ width: width ? `${width}%` : undefined }}>
			{label}
		</ButtonAntd>
	);
};
