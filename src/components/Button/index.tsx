import { ButtonAntd } from '../ButtonAntd';
import { ReactNode } from 'react';

export interface IButtonProps {
	size?: 'small' | 'middle' | 'large';
	type?: 'primary' | 'secondary';
	title?: ReactNode;
	disabled?: boolean;
	onClick?: () => void;
	/** Cuando es true en tipo secondary, aplica estilo gris (#595959) */
	default?: boolean;
}

export const Button = (props: IButtonProps) => {
	const { size = 'small', type = 'primary', title, disabled = false, onClick } = props;
	const sizeClass = size === 'small' ? 'itsa-btn--sm' : size === 'middle' ? 'itsa-btn--md' : 'itsa-btn--lg';
	const variantClass = type === 'primary' ? 'itsa-btn--primary' : 'itsa-btn--secondary';
	const disabledClass = disabled ? 'itsa-btn--disabled' : '';
	const defaultSecondaryClass = type === 'secondary' && props.default ? 'itsa-btn--default' : '';
	const className = ['itsa-btn', sizeClass, variantClass, defaultSecondaryClass, disabledClass].filter(Boolean).join(' ');
	const antdType: 'primary' | 'default' = type === 'primary' ? 'primary' : 'default';

	return (
		<ButtonAntd className={className} size={size} type={antdType} disabled={disabled} onClick={onClick}>
			{title}
		</ButtonAntd>
	);
};
