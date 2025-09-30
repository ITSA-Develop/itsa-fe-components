import { Typography } from 'antd';
import { BaseType } from 'antd/es/typography/Base';

const { Title: AntTitle } = Typography;

export interface ITitle {
	title: string;
	level: 1 | 2 | 3 | 4 | 5;
	className?: string;
	type?: BaseType;
}

export const Title = ({ title, level, className, type }: ITitle) => {
	if (level === 1) {
		return (
			<AntTitle level={1} className={className} type={type}>
				{title}
			</AntTitle>
		);
	}
	if (level === 2) {
		return (
			<AntTitle level={2} className={className} type={type}>
				{title}
			</AntTitle>
		);
	}
	if (level === 3) {
		return (
			<AntTitle level={3} className={className} type={type}>
				{title}
			</AntTitle>
		);
	}
	if (level === 4) {
		return (
			<AntTitle level={4} type={type}>
				{title}
			</AntTitle>
		);
	}
	if (level === 5) {
		return (
			<AntTitle level={5} type={type}>
				{title}
			</AntTitle>
		);
	}
	return (
		<AntTitle level={1} className={className} type={type}>
			{title}
		</AntTitle>
	);
};
