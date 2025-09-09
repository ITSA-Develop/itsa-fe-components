import { Dropdown as AntDropdown, DropdownProps } from 'antd';

export const Dropdown = ({ ...rest }: DropdownProps) => {
	return <AntDropdown {...rest} />;
};
