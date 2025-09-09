import { Button } from '@/components/Button/Button';
import { Typography } from 'antd';
export interface ErrorPageProps {
	error: string;
	message: string;
	handleClick: () => void;
}

const { Title } = Typography;

export const ErrorPage = ({ error, message, handleClick }: ErrorPageProps) => {
	return (
		<div className="flex flex-col justify-center items-center h-screen bg-white-100">
			<div className="text-center">
				<Title>{error}</Title>
				<p className="text-lg">{message}</p>
			</div>
			<div className="flex justify-center mt-8">
				<Button onClick={handleClick}>Ir al Inicio</Button>
			</div>
		</div>
	);
};
