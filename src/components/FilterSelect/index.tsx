import { Select, SelectProps } from "antd";

export interface IFilterSelectProps extends SelectProps {
    label: string;
}

export const FilterSelect = ({ label, ...rest }: IFilterSelectProps) => {
	return (
		<div className="flex flex-col gap-0.5">
            <small className="font-bold">
                {label}
            </small>
			<Select
				{...rest}
				style={{
					height: '28px',
					lineHeight: '18px',
					padding: '1px 2px',
                    fontSize: '11px',
				}}
			/>
		</div>
	);
};