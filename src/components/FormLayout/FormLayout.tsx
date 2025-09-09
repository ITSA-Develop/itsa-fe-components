import { TDrawerSize, TTabItem } from '@/types';
import { ReactNode } from 'react';
import { Drawer } from '../Drawer/Drawer';
import { Tabs } from '../Tabs/Tabs';

export interface IFormLayout {
	header: {
		title: string;
		subtitle: string;
	};
	items: TTabItem[];
	defaultActiveKey?: string;
	size?: TDrawerSize;
}

// TODO: waiting for final design to determinate if this is going to be implemented and how
export const FormLayout = ({ header, items, defaultActiveKey = '1', size = undefined }: IFormLayout): ReactNode => {
	return (
		<Drawer
			title={
				<div>
					<p>{header.title}</p>
					<p>{header.subtitle}</p>
				</div>
			}
			open
			size={size}
		>
			<Tabs defaultActiveKey={defaultActiveKey} items={items} />
		</Drawer>
	);
};
