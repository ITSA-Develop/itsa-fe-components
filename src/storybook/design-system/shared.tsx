import { ReactNode } from 'react';
import { Tag } from '../../components/Tag';
import { Title } from '../../components/Title';
import { Alert } from '../../components/Alert/Alert';
import { ImplementationStatus } from './inventory';
import { ColorToken, hexToRgb, preferredTextOn } from './tokens';

const STATUS_LABEL: Record<ImplementationStatus, string> = {
	implemented: 'Implementado',
	partial: 'Parcial',
	'not-exported': 'No exportado',
	'not-implemented': 'No implementado',
	'not-identified': 'No identificado',
};

const STATUS_COLOR: Record<ImplementationStatus, string> = {
	implemented: 'green',
	partial: 'orange',
	'not-exported': 'gold',
	'not-implemented': 'red',
	'not-identified': 'default',
};

export const StatusBadge = ({ status }: { status: ImplementationStatus }) => (
	<Tag color={STATUS_COLOR[status]}>{STATUS_LABEL[status]}</Tag>
);

export const DsSection = ({
	id,
	title,
	description,
	children,
}: {
	id: string;
	title: string;
	description?: string;
	children: ReactNode;
}) => (
	<section id={id} className="flex flex-col gap-4">
		<div className="flex flex-col gap-1">
			<Title title={title} level={2} />
			{description !== undefined && description.length > 0 ? (
				<p className="text-sm text-gray-500 max-w-3xl">{description}</p>
			) : null}
		</div>
		{children}
	</section>
);

export const DsBlock = ({
	title,
	children,
	status,
}: {
	title: string;
	children: ReactNode;
	status?: ImplementationStatus;
}) => (
	<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white-100 p-4">
		<div className="flex flex-wrap items-center justify-between gap-2">
			<Title title={title} level={4} />
			{status !== undefined ? <StatusBadge status={status} /> : null}
		</div>
		{children}
	</div>
);

export const PreviewFrame = ({ children, label }: { children: ReactNode; label?: string }) => (
	<div className="overflow-hidden rounded-lg border border-dashed border-gray-200 bg-gray-25">
		{label !== undefined && label.length > 0 ? (
			<div className="border-b border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500">{label}</div>
		) : null}
		<div className="p-4">{children}</div>
	</div>
);

export const SpecTable = ({ rows }: { rows: Array<{ label: string; value: ReactNode }> }) => (
	<div className="overflow-x-auto">
		<table className="w-full text-left text-sm">
			<tbody>
				{rows.map(row => (
					<tr key={row.label} className="border-b border-gray-100 align-top">
						<th className="w-48 py-2 pr-3 font-semibold text-gray-700">{row.label}</th>
						<td className="py-2 text-gray-800">{row.value}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

export const NotImplementedNote = ({ text }: { text: string }) => (
	<Alert type="warning" showIcon message="No implementado o no identificado" description={text} />
);

export const ColorSwatch = ({ token }: { token: ColorToken }) => {
	const contrast = preferredTextOn(token.hex);
	const rgb = hexToRgb(token.hex);
	const rgbLabel = rgb !== null ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'No identificado';
	const ratioLabel = contrast.ratio !== null ? `${contrast.ratio.toFixed(2)}:1` : 'No identificado';

	return (
		<div className="flex min-w-[180px] flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white-100">
			<div className="flex h-20 items-end p-2" style={{ backgroundColor: token.hex, color: contrast.color }}>
				<span className="text-xs font-semibold">{token.hex}</span>
			</div>
			<div className="flex flex-col gap-1 p-2 text-xs text-gray-700">
				<strong className="text-sm text-gray-800">{token.name}</strong>
				<span>{rgbLabel}</span>
				{token.cssVar !== undefined && token.cssVar.length > 0 ? (
					<span>{token.cssVar}</span>
				) : (
					<span className="text-gray-400">Sin variable CSS</span>
				)}
				{token.tailwindClass !== undefined && token.tailwindClass.length > 0 ? (
					<span>Tailwind: {token.tailwindClass}</span>
				) : null}
				<span>Fuente: {token.source}</span>
				<span>Contraste texto: {ratioLabel}</span>
				<span className="text-gray-500">{token.usage}</span>
			</div>
		</div>
	);
};

export const ColorGrid = ({ tokens }: { tokens: ColorToken[] }) => (
	<div className="flex flex-wrap gap-3">
		{tokens.map(token => (
			<ColorSwatch key={`${token.category}-${token.name}`} token={token} />
		))}
	</div>
);
