import { Button } from '@/components/Button';
import { pageNotFound } from '@/assets/images';
import { Title } from '../Title';
export interface ErrorPageProps {
	handleClick: () => void;
	error?: string;
	message?: string;
    imageClassName?: string;
}


export const ErrorPage = ({ error, message, handleClick, imageClassName }: ErrorPageProps) => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-white-100 px-4 text-center gap-4">
			<img src={pageNotFound} alt="Página no encontrada" className={`w-full max-w-[560px] h-auto max-h-[50vh] object-contain ${imageClassName ?? ''}`} />
			<div className="flex flex-col justify-center items-center">
				{error && <Title title={error} level={5} />  }
				{message && <Title title={message} level={5} />  }
			</div>
			<div className="flex flex-col justify-center items-center pt-4">
				<Button onClick={handleClick} size="middle" label={`Regresar al inicio`} />
			</div>
		</div>
	);
};
