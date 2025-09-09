interface IInfoRowProps {
	label: string;
	value: React.ReactNode;
}

export const InfoRow = ({ label, value }: IInfoRowProps) => (
	<div className="flex justify-between gap-2">
		<span className="font-semibold">{label}</span>
		<span className="text-right">{value}</span>
	</div>
);
