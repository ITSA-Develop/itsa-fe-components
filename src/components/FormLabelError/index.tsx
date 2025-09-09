export interface IFormLabelErrorProps {
	label: string;
	htmlFor?: string;
	id?: string;
}

export const FormLabelError = ({ label, htmlFor, id }: IFormLabelErrorProps) => {
	return (
		<label htmlFor={htmlFor} id={id} className="text-red-500">
			{label}
		</label>
	);
};
