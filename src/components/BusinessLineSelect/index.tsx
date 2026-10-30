import { Select } from 'antd';
import { CSSProperties } from 'react';
import { useAppLayoutStore } from '@/store';
import { ELineBusinessClientCode } from '@/enums';

export interface IBusinessLineSelectProps {
	className?: string;
	style?: CSSProperties;
	minWidth?: number;
}

export const BusinessLineSelect = ({
	className = 'itsa-business-line-select',
	style,
	minWidth = 220,
}: IBusinessLineSelectProps) => {
	const { userInformation, businessLineId, setBusinessLineId, setBusinessLineCode } = useAppLayoutStore();
	const businessLines = userInformation?.businessLines ?? [];

	const handleChangeBusinessLine = (businessLineId: number) => {
		setBusinessLineId(businessLineId);
		const code = businessLines.find(businessLine => businessLine.id === businessLineId)?.code ?? '';
		setBusinessLineCode(code as ELineBusinessClientCode);
	};

	if (businessLines.length <= 1) {
		return null;
	}

	return (
		<Select
			options={businessLines.map(businessLine => ({ label: businessLine.name, value: businessLine.id }))}
			value={businessLineId}
			onChange={handleChangeBusinessLine}
			size="small"
			className={className}
			style={{ minWidth, ...style }}
			placeholder="Selecciona una línea de negocio"
		/>
	);
};
