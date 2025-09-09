import { Image as AntdImage } from 'antd';
import { ReactNode, useEffect, useState } from 'react';

export interface ImageProps {
	alt: string;
	width: number;
	height: number;
	imgPath?: string;
	errorLabel?: ReactNode;
}

export const Image = ({ alt, width, height, imgPath, errorLabel = 'No image' }: ImageProps) => {
	const [src, setSrc] = useState<string | undefined>(imgPath);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (imgPath) {
			setSrc(imgPath);
			setError(false);
			setLoading(true);
		} else {
			setError(true);
		}
	}, [imgPath]);

	const handleError = () => {
		setError(true);
		setLoading(false);
	};

	if (error || !src) {
		return <div className="flex w-full h-full items-center justify-start">{errorLabel}</div>;
	}

	return (
		<>
			<AntdImage
				width={width}
				height={height}
				src={src}
				alt={alt}
				preview={false}
				onError={handleError}
				onLoad={() => setLoading(false)}
				style={{ display: loading ? 'none' : 'block' }}
			/>
		</>
	);
};
