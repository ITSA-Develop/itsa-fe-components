import { Checkbox as AntCheckbox, CheckboxProps } from 'antd';

export interface ICheckboxProps extends CheckboxProps {
	variant?: 'default' | undefined;
}

export const Checkbox = ({ ...rest }: ICheckboxProps) => {
	const { variant, className, rootClassName, ...props } = rest;
	const mergedRootClassName = [
		rootClassName,
		variant === 'default' ? 'itsa-checkbox--default' : undefined,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<AntCheckbox
			{...props}
			className={className}
			rootClassName={mergedRootClassName}
		/>
	);
};
