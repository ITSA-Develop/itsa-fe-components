export interface IFormLabelProps {
	label: string;
	htmlFor?: string;
}

export const FormLabel = ({ label, htmlFor }: IFormLabelProps) => {
	return <label htmlFor={htmlFor} className="font-bold">{label}</label>;
};
