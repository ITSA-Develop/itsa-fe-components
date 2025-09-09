import { Input as AntInput, InputProps } from 'antd';
import { RefCallBack } from 'react-hook-form';

export interface IInputProps extends InputProps {
	showCountCharacters?: boolean;
	ref?: RefCallBack;
	type: string;
}

export const Input = ({ ref, showCountCharacters = false, type, ...rest }: IInputProps) => {
	return (
		<AntInput
			type={type}
			{...rest}
			ref={ref}
			className="w-full rounded-lg max-h-8"
			count={{
				show: showCountCharacters,
				strategy: txt => String(txt).length,
			}}
		/>
	);
};
