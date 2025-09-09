import { Skeleton as AntSkeleton, SkeletonProps } from 'antd';

export const Skeleton = ({ ...rest }: SkeletonProps) => {
	return <AntSkeleton {...rest} active />;
};
