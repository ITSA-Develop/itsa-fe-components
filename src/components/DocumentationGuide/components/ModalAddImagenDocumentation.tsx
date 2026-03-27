import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const MAX_IMAGES = 5;

const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

export interface IModalAddImagenDocumentationProps {
	onUpload: UploadProps['onChange'];
	fileList: UploadFile[];
	maxImages?: number;
	responseSuccess?: {
		key: string;
	};
	loading?: boolean;
}

export const ModalAddImagenDocumentation = ({ onUpload, fileList, maxImages = MAX_IMAGES, responseSuccess, loading = false }: IModalAddImagenDocumentationProps) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>{loading ? 'Cargando...' : 'Upload'}</div>
		</button>
	);

	const previewProps = {
		open: previewOpen,
		onOpenChange: (visible: boolean) => setPreviewOpen(visible),
		afterOpenChange: (visible: boolean) => !visible && setPreviewImage(''),
	} as any;

	const handleCopyKey = async () => {
		if (!responseSuccess?.key) return;

		await navigator.clipboard.writeText(responseSuccess.key);
		message.success('Key copiada al portapapeles');
	};

	return (
		<div>
			<div>
			<Upload
				{...({
					action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
					listType: 'picture-card',
					fileList,
					onPreview: handlePreview,
					onChange: onUpload,
					pastable: true,
					maxCount: maxImages,
					disabled: loading,
				} as any)}
			>
				{fileList.length >= maxImages ? null : uploadButton}
			</Upload>
			{previewImage && (
				<Image {...({ styles: { root: { display: 'none' } }, preview: previewProps, src: previewImage } as any)} />
			)}
			</div>
			<div>
				{responseSuccess?.key && (
					<div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3">
						<p className="text-sm font-medium text-green-700">Imagen subida correctamente</p>
						<button
							type="button"
							className="mt-2 w-full rounded border border-dashed border-green-300 bg-white px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-green-100"
							onClick={handleCopyKey}
							title="Click para copiar key"
						>
							<span className="block text-xs text-gray-500">Click para copiar key</span>
							<span className="block truncate font-mono">{responseSuccess.key}</span>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};