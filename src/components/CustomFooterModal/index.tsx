import { ReactNode, HTMLAttributes } from 'react';
import { Button } from '../Button';

export interface ICustomFooterModalProps {
	cancelLabel?: ReactNode;
	confirmLabel?: ReactNode;
	confirmDisabled?: boolean;
	confirmLoading?: boolean;
	onConfirm: () => void;
	onCancel?: () => void;
	align?: 'start' | 'center' | 'end';
	size?: 'small' | 'middle' | 'large';
	className?: string;
	containerProps?: HTMLAttributes<HTMLDivElement>;
	confirmWidthPercent?: number;
}

export const CustomFooterModal = ({
	cancelLabel = 'Cancelar',
	confirmLabel = 'Confirmar',
	confirmDisabled = false,
	confirmLoading = false,
	onCancel,
	onConfirm,
	align = 'end',
	size = 'middle',
	className,
	containerProps,
	confirmWidthPercent,
}: ICustomFooterModalProps) => {
	const justifyClass = align === 'start' ? 'justify-start' : align === 'center' ? 'justify-center' : 'justify-end';
	return (
		<div className={["flex flex-row w-full", justifyClass, 'gap-2', className].filter(Boolean).join(' ')} {...containerProps}>
			{onCancel && <Button type="secondary" size={size} label={cancelLabel} onClick={() => onCancel()} />}
			<Button type="primary" size={size} label={confirmLabel} onClick={() => onConfirm()} disabled={confirmDisabled || confirmLoading} width={confirmWidthPercent} />
		</div>
	);
};
