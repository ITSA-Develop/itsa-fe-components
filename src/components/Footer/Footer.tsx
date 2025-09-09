export interface IFooterProps {
	version: string;
	text: string;
}

export const Footer = ({ version, text }: IFooterProps) => {
	return (
		<footer className="fixed bottom-0 left-0 w-full text-black-100 py-4 flex items-center justify-center text-sm gap-3">
			<p className="text-center">{text}</p>
			<p className="text-center">{version}</p>
		</footer>
	);
};
