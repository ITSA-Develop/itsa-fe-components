export interface IFormLabelProps {
	label: string;
	htmlFor?: string;
	optional?: boolean;
}

export const FormLabel = ({ label, htmlFor, optional }: IFormLabelProps) => {
	return (
		<div className="flex flex-row w-full justify-between">
			<label htmlFor={htmlFor} className="font-bold">
				{label}
			</label>
			{optional === true && <small className="text-gray-500 text-xs"> (Opcional)</small>}
		</div>
	); 
};
