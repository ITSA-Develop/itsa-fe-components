import { Input, InputProps } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { RefCallBack } from "react-hook-form";

export interface IInputPasswordProps extends InputProps {
	ref?: RefCallBack;
	type: string;
}

export const InputPassword = ({ ref, type, ...rest }: IInputPasswordProps) => {
	return (
		<Input.Password
			{...rest}
			ref={ref}
			type={type}
			iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
		/>
	);
};
