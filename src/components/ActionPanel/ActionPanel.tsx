import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, Dropdown, MenuProps } from 'antd';

export interface IActionPanel {
	items: MenuProps['items'];
}

export const ActionPanel = ({ items }: IActionPanel) => {
	return (
		<Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
			<Button icon={<Icon path={mdiDotsVertical} size={1} />} type="text" shape="circle" />
		</Dropdown>
	);
};
