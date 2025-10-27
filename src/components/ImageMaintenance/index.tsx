import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { Image } from '../Image';
import { Upload } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { CustomFooterModal } from '../CustomFooterModal';

export interface ImageMaintenanceProps {
	imageUrl?: string | null;
	onUpload?: (file: File) => void | Promise<void>;
	onUpdate?: (file: File) => void | Promise<void>;
	onDelete?: () => void | Promise<void>;
	onDownload?: (url: string) => void | Promise<void>;
	onSaveImage?: (url?: string) => void | Promise<void>;
	onCancelSaveImage?: () => void;
	accept?: string;
	disabled?: boolean;
}

const { Dragger } = Upload;

export const ImageMaintenance = ({
	imageUrl,
	onUpload,
	onUpdate,
	onSaveImage,
	onCancelSaveImage,
	accept = 'image/*',
	disabled = false,
}: ImageMaintenanceProps) => {
	const uploadInputRef = useRef<HTMLInputElement>(null);
	const updateInputRef = useRef<HTMLInputElement>(null);
	const [tempPreviewUrl, setTempPreviewUrl] = useState<string | undefined>(undefined);

	const previewSrc = useMemo(() => tempPreviewUrl ?? imageUrl ?? undefined, [tempPreviewUrl, imageUrl]);

	useEffect(() => {
		return () => {
			if (tempPreviewUrl) URL.revokeObjectURL(tempPreviewUrl);
		};
	}, [tempPreviewUrl]);

	const handleFiles = useCallback(
		(fileList: FileList | null | undefined, action: 'upload' | 'update') => {
			const file = fileList?.item(0);
			if (!file) return;
			const objectUrl = URL.createObjectURL(file);
			// Update local preview immediately
			setTempPreviewUrl(prev => {
				if (prev) URL.revokeObjectURL(prev);
				return objectUrl;
			});
			if (action === 'upload') onUpload?.(file);
			if (action === 'update') onUpdate?.(file);
		},
		[onUpload, onUpdate],
	);

	const handleBeforeUpload = (file: RcFile) => {
		const objectUrl = URL.createObjectURL(file);
		setTempPreviewUrl(prev => {
			if (prev) URL.revokeObjectURL(prev);
			return objectUrl;
		});
		// Decide action based on existing preview
		if (previewSrc) {
			onUpdate?.(file);
		} else {
			onUpload?.(file);
		}
		// Prevent auto upload
		return false;
	};

	// const handleDownload = () => {
	// 	if (!previewSrc) return;
	// 	if (onDownload) {
	// 		onDownload(previewSrc);
	// 		return;
	// 	}
	// 	// Default download behavior
	// 	const a = document.createElement('a');
	// 	a.href = previewSrc;
	// 	const defaultName = previewSrc.split('/').pop() || 'image';
	// 	a.download = defaultName;
	// 	document.body.appendChild(a);
	// 	a.click();
	// 	document.body.removeChild(a);
	// };

	return (
		<div className="flex flex-col gap-4">
			<Dragger
				name="file"
				multiple={false}
				accept={accept}
				disabled={disabled}
				showUploadList={false}
				beforeUpload={handleBeforeUpload}
				openFileDialogOnClick={!disabled}
				pastable
			>
				{previewSrc ? (
					<div className="flex flex-col items-center">
						<Image alt="imagen" width={360} height={240} src={previewSrc} hover />
					</div>
				) : (
					<div className="flex flex-col items-center gap-2 py-10 text-gray-500">
						<div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
							<PictureOutlined className="text-2xl" />
						</div>
						<div className="text-center">
							<div className="font-medium">Arrastra tu imagen aquí</div>
							<div className="text-xs">usa los botones de abajo</div>
							<div className="text-xs">o pegar una imagen desde el portapapeles CTRL + V</div>
						</div>
					</div>
				)}
			</Dragger>
			<div className="text-xs text-gray-500">
				<CustomFooterModal
					onConfirm={() => {
						onSaveImage?.(previewSrc);
					}}
					onCancel={() => {
						onCancelSaveImage?.();
					}}
					confirmLabel="Guardar"
					cancelLabel="Cancelar"
				/>
			</div>

			<input
				ref={uploadInputRef}
				type="file"
				accept={accept}
				className="hidden"
				onChange={e => handleFiles(e.target.files ?? undefined, 'upload')}
			/>
			<input
				ref={updateInputRef}
				type="file"
				accept={accept}
				className="hidden"
				onChange={e => handleFiles(e.target.files ?? undefined, 'update')}
			/>
		</div>
	);
};
