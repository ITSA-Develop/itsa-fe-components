import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

export interface IBreadcrumbCustomProps {
	title: string;
	description: string;
	action: () => void;
}
export const BreadcrumbCustom = ({ title, description, action }: IBreadcrumbCustomProps) => {
	return (
		<div className="flex flex-row items-center gap-2">
			<Button onClick={action} type="text" icon={<LeftOutlined className="font-bold" style={{ fontSize: '20px' }} />} />
			<div className="flex flex-row items-center gap-2">
				<h4 className="font-bold text-lg text-black-100">{title}</h4>
				<span className="text-black-100">|</span>
				<small className="text-sm text-black-100">{description}</small>
			</div>
		</div>
	);
};
