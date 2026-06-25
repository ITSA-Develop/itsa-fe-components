import { Checkbox as AntCheckbox, CheckboxProps } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

export interface ICheckboxProps extends CheckboxProps {
	variant?: 'default' | undefined;
}

const CheckboxComponent = ({ variant = 'default', className, rootClassName, ...props }: ICheckboxProps) => {
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

const CheckboxGroup = ({ variant = 'default', className, ...props }: CheckboxGroupProps & Pick<ICheckboxProps, 'variant'>) => {
	const mergedClassName = [className, variant === 'default' ? 'itsa-checkbox--default' : undefined]
		.filter(Boolean)
		.join(' ');

	return <AntCheckbox.Group {...props} className={mergedClassName} />;
};

export const Checkbox = Object.assign(CheckboxComponent, {
	Group: CheckboxGroup,
});
