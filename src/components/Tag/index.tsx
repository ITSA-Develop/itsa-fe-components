import { Tag as AntTag, TagProps } from 'antd';

export const Tag = ({ ...rest }: TagProps) => {
	return <AntTag {...rest} />;
}