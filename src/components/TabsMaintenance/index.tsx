import { Tabs } from 'antd';
import { ITabsMaintenanceItem } from '@/interfaces';


export interface ITabsMaintenance {
	items: ITabsMaintenanceItem[];
	onChange: (key: string) => void;
	defaultActiveKey: string;
}

export const TabsMaintenance = ({ items, onChange, defaultActiveKey }: ITabsMaintenance) => {
	return <Tabs className="tabs-maintenance" centered defaultActiveKey={defaultActiveKey} items={items} onChange={onChange} />;
};
