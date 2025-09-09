import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

const { TextArea: AntTextArea } = Input;

export const Textarea = ({ ...rest }: TextAreaProps) => {
	return <AntTextArea {...rest} />;
};
