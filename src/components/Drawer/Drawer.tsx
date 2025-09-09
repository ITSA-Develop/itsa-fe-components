import { Drawer as AntDrawer, DrawerProps } from 'antd';

export const Drawer = ({ ...rest }: DrawerProps) => {
	return <AntDrawer {...rest} />;
};
