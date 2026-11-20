import { AutoComplete, type AutoCompleteProps, Input as AntInput, type InputProps } from 'antd';
import { RefCallBack } from 'react-hook-form';

export interface IInputProps extends InputProps {
	showCountCharacters?: boolean;
	/**
	 * If provided, wraps the input with AntD `AutoComplete` to suggest options while typing.
	 * Supports grouped options (categories) as well.
	 */
	suggestOptions?: AutoCompleteProps['options'];
	/** Extra props for the underlying AntD `AutoComplete` (excluding `options` and `children`). */
	suggestProps?: Omit<AutoCompleteProps, 'options' | 'children'>;
	ref?: RefCallBack | undefined;
	type: string;
}

const hasAffixOrAddon = (props: Pick<InputProps, 'prefix' | 'suffix' | 'addonBefore' | 'addonAfter' | 'allowClear'>) =>
	Boolean(props.prefix ?? props.suffix ?? props.addonBefore ?? props.addonAfter ?? props.allowClear);

export const Input = ({
	ref,
	showCountCharacters = false,
	type,
	suggestOptions,
	suggestProps,
	className,
	classNames,
	rootClassName,
	...rest
}: IInputProps) => {
	const {
		onChange,
		value,
		defaultValue,
		prefix,
		suffix,
		addonBefore,
		addonAfter,
		allowClear,
		style,
		...inputRest
	} = rest;

	const withAffixOrAddon = hasAffixOrAddon({ prefix, suffix, addonBefore, addonAfter, allowClear });

	const joinClass = (...parts: Array<string | undefined>) => parts.filter(Boolean).join(' ');

	const mergedClassName = withAffixOrAddon
		? joinClass('w-full', className)
		: joinClass('w-full rounded-lg max-h-8', className);

	const mergedRootClassName = withAffixOrAddon
		? joinClass('w-full itsa-input--with-affix-or-addon', rootClassName)
		: rootClassName;
	// AntD v5 uses `popupClassName` for the dropdown popup.
	// Keep compatibility if someone passes `dropdownClassName` (older naming) via `suggestProps`.
	const suggestPopupClassName = (suggestProps as any)?.popupClassName ?? (suggestProps as any)?.dropdownClassName;
	const { popupClassName: _popupClassName, dropdownClassName: _dropdownClassName, ...restSuggestProps } =
		(suggestProps as any) ?? {};
	const mergedPopupClassName = ['itsa-autocomplete--subtle', suggestPopupClassName].filter(Boolean).join(' ');

	const emitEventLikeOnChange = (nextValue: string) => {
		// Keep compatibility with code expecting the AntD InputChangeEvent
		// (e.g. react-hook-form handlers that read `e.target.value`)
		onChange?.({ target: { value: nextValue } } as any);
	};

	const inputNode = (
		<AntInput
			type={type}
			{...inputRest}
			prefix={prefix}
			suffix={suffix}
			addonBefore={addonBefore}
			addonAfter={addonAfter}
			allowClear={allowClear}
			value={value as any}
			defaultValue={defaultValue as any}
			ref={ref}
			className={mergedClassName}
			rootClassName={mergedRootClassName}
			classNames={classNames}
			style={style}
			count={{
				show: showCountCharacters,
				strategy: txt => String(txt).length,
			}}
			onChange={e => onChange?.(e)}
		/>
	);

	if (suggestOptions && suggestOptions.length > 0) {
		return (
			<AutoComplete
				options={suggestOptions}
				value={value as any}
				defaultValue={defaultValue as any}
				popupClassName={mergedPopupClassName}
				{...restSuggestProps}
				onChange={(nextValue: string) => {
					suggestProps?.onChange?.(nextValue);
					emitEventLikeOnChange(nextValue);
				}}
				onSelect={(nextValue: string, option) => {
					suggestProps?.onSelect?.(nextValue, option as any);
					emitEventLikeOnChange(nextValue);
				}}
			>
				{inputNode}
			</AutoComplete>
		);
	}

	return inputNode;
};
