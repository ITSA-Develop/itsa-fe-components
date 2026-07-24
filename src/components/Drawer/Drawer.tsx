import { Drawer as AntDrawer, DrawerProps } from 'antd';

export const Drawer = ({ styles, ...rest }: DrawerProps) => {
	return (
		<AntDrawer
			{...rest}
			styles={{
				...styles,
				body: { padding: 1, ...styles?.body },
			}}
		/>
	);
};
