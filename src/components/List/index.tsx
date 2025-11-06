import { forwardRef } from 'react';
import { List as AntList } from 'antd';
import type { ListProps } from 'antd';

type ListComponent = React.ForwardRefExoticComponent<
	ListProps<any> & React.RefAttributes<HTMLDivElement>
> & {
	Item: typeof AntList.Item;
};

export const List = forwardRef<HTMLDivElement, ListProps<any>>((props, ref) => {
	return <AntList ref={ref} {...props} />;
}) as ListComponent;

List.Item = AntList.Item;

export type { ListProps };