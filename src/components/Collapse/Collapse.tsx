import { Collapse as AntCollapse, CollapseProps } from 'antd';

export const Collapse = ({ ...rest }: CollapseProps) => {
	return <AntCollapse {...rest} />;
};
