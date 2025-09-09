import { getMappedOptionFromAPI } from '@/helpers';
import { TInputOptions } from '@/types';
import { InfoRow } from './components/InfoRow/InfoRow';

interface ILocationDisplayProps {
	isEcuador: boolean;
	label: string;
	canton?: number;
	province?: number;
	country?: number;
	parishOptions?: TInputOptions[];
	cantonOptions?: TInputOptions[];
	provinceOptions?: TInputOptions[];
	countryOptions: TInputOptions[];
}

export const LocationDisplay = ({
	isEcuador,
	label,
	canton,
	province,
	country,
	cantonOptions = [],
	provinceOptions = [],
	countryOptions,
}: ILocationDisplayProps) => {
	const locationLabel = isEcuador
		? `${getMappedOptionFromAPI(canton, cantonOptions).label}, ${getMappedOptionFromAPI(province, provinceOptions).label}, ${getMappedOptionFromAPI(country, countryOptions).label}`
		: getMappedOptionFromAPI(country, countryOptions).label;

	return <InfoRow label={label} value={locationLabel} />;
};
