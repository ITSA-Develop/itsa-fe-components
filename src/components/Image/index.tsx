import { Image as AntdImage } from 'antd';
import { CSSProperties, ReactNode, useEffect, useMemo, useState } from 'react';

export interface ImageProps {
    alt: string;
    width: number | string;
    height: number | string;
    imgPath?: string;
    src?: string;
    errorLabel?: ReactNode;
    onClick?: () => void;
	/** Aplica efecto hover (zoom suave) */
	hover?: boolean;
	/** Factor de escala para el hover (por defecto 1.05) */
	hoverScale?: number;
}

export const Image = ({ alt, width, height, imgPath, src, errorLabel = 'No image', onClick, hover = false, hoverScale = 1.05 }: ImageProps) => {
    const inputSrc = useMemo(() => src ?? imgPath, [src, imgPath]);
	const [currentSrc, setCurrentSrc] = useState<string | undefined>(inputSrc);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
	const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (inputSrc) {
            setCurrentSrc(inputSrc);
            setError(false);
            setLoading(true);
        } else {
            setCurrentSrc(undefined);
            setError(true);
        }
    }, [inputSrc]);

    const handleError = () => {
		setError(true);
		setLoading(false);
	};

    if (error || !currentSrc) {
		return <div className="flex w-full h-full items-center justify-start">{errorLabel}</div>;
	}

	return (
		<div
			className={`overflow-hidden ${onClick || hover ? 'cursor-pointer' : ''}`}
			style={{
				...(typeof width === 'number' ? ({ width } as CSSProperties) : {}),
				...(typeof height === 'number' ? ({ height } as CSSProperties) : {}),
				...(typeof width === 'string' ? ({ width } as CSSProperties) : {}),
				...(typeof height === 'string' ? ({ height } as CSSProperties) : {}),
			}}
			onMouseEnter={hover ? () => setIsHovered(true) : undefined}
			onMouseLeave={hover ? () => setIsHovered(false) : undefined}
		>
			<AntdImage
				width={typeof width === 'number' ? width : undefined}
				height={typeof height === 'number' ? height : undefined}
				src={currentSrc}
				alt={alt}
				preview={false}
				onError={handleError}
				onLoad={() => setLoading(false)}
				onClick={onClick}
				style={{
					display: loading ? 'none' : 'block',
					transition: 'transform 200ms ease-in-out',
					transform: hover && isHovered ? `scale(${hoverScale})` : 'scale(1)',
					...(typeof width === 'string' ? ({ width } as CSSProperties) : {}),
					...(typeof height === 'string' ? ({ height } as CSSProperties) : {}),
				}}
			/>
		</div>
	);
};
