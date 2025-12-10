import { Select, SelectProps } from "antd";

export interface IFilterSelectProps extends SelectProps {
    label: string;
}

export const FilterSelect = ({ label, ...rest }: IFilterSelectProps) => {
	const rawValue = (rest as any).value ?? (rest as any).defaultValue;
	let hasValue = false;
	if (Array.isArray(rawValue)) {
		hasValue = rawValue.length > 0;
	} else if (rawValue && typeof rawValue === 'object' && 'value' in rawValue) {
		// handle labelInValue: { value, label }
		hasValue = !!(rawValue as any).value;
	} else if (typeof rawValue === 'string') {
		hasValue = rawValue.trim().length > 0;
	} else if (typeof rawValue === 'number') {
		hasValue = true;
	} else {
		hasValue = !!rawValue;
	}

	const shouldHighlight = hasValue;

	const mergedStyles = {
		...(rest as any).styles,
		selector: {
			...((rest as any).styles?.selector ?? {}),
			transition: 'box-shadow 160ms ease, border-color 160ms ease',
			...(shouldHighlight
				? {
						borderColor: '#93c5fd',
						boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.15)',
				  }
				: {}),
		},
	};

	return (
		<div className="flex flex-col gap-0">
            <small className="font-bold pl-1">
                {label}
            </small>
			<Select
				{...rest}
				status={undefined}
				className={`${(rest as any).className || ''} ${shouldHighlight ? 'itsa-select-has-value' : ''}`.trim()}
				styles={mergedStyles as any}
				style={{
					height: '28px',
					lineHeight: '18px',
					padding: '1px 2px',
                    fontSize: '11px',
					transition: 'box-shadow 160ms ease, border-color 160ms ease',
				}}
			/>
		</div>
	);
};