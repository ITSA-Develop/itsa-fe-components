import { WithoutInformationIcon } from '@/assets/icons';
import { Title } from '../Title';

export interface IWithoutInformationProps {
	color?: string;
	title?: string;
    size?: number;
}

export const WithoutInformation = ({ color='#00000073', title = 'Sin información', size = 100 }: IWithoutInformationProps) => {
	return (
		<div className={'w-full h-full flex flex-col gap-4 items-center justify-center'}>
			<WithoutInformationIcon className="fill-current" width={size} height={size} color={color} />
			<Title title={title} level={4} type="secondary" />
		</div>
	);
};
