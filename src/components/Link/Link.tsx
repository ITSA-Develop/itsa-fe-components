import { Typography } from 'antd';
import { LinkProps } from 'antd/es/typography/Link';

const { Link: AntLink } = Typography;

// TODO: double check this works as expected for proper routing
export const Link = ({ children, ...rest }: LinkProps) => {
	return <AntLink {...rest}>{children}</AntLink>;
};
