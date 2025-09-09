import { Avatar as AntAvatar, AvatarProps } from 'antd';

export interface IAvatarProps extends AvatarProps {
	name?: string;
}
const stringAvatar = (name: string): string => {
	const splittedFullname = name.trim().split(' ').filter(Boolean);

	const firstLetter = splittedFullname[0]?.[0] ?? '';
	const secondLetter = splittedFullname[1]?.[0] ?? '';

	return firstLetter + secondLetter || firstLetter;
};

export const Avatar = ({ name, ...rest }: IAvatarProps) => {
	return <AntAvatar {...rest}>{stringAvatar(name || '') || ''}</AntAvatar>;
};
