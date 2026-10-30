import { Title } from '../../../components/Title';
import { FormLabel } from '../../../components/FormLabel';
import { FormLabelError } from '../../../components/FormLabelError';
import { Button } from '../../../components/Button';
import { FONT_CSS_VAR, FONT_FAMILY, FONT_WEIGHTS, TYPE_ROLES } from '../tokens';
import { DsBlock, DsSection, NotImplementedNote, PreviewFrame, SpecTable } from '../shared';

export const TypographySection = () => (
	<DsSection
		id="typography"
		title="Tipografía"
		description="Public Sans es la única familia de producto. Los tamaños de encabezado los define Ant Design Typography a través del componente Title."
	>
		<DsBlock title="Familia y tokens" status="implemented">
			<SpecTable
				rows={[
					{ label: 'Familia', value: FONT_FAMILY },
					{ label: 'Variable CSS', value: FONT_CSS_VAR },
					{ label: 'Carga', value: '@fontsource/public-sans (300–700) y Google Fonts en tailwind-entry.css' },
					{ label: 'Ant Design', value: 'UIProvider asigna token.fontFamily = var(--font-sans)' },
					{ label: 'Tokens de tamaño propios', value: 'No implementados. No hay --text-sm / --text-lg de producto' },
				]}
			/>
			<div
				className="rounded-lg border border-gray-200 bg-gray-25 p-4 text-lg"
				style={{ fontFamily: 'var(--font-sans)' }}
			>
				Public Sans — ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
			</div>
		</DsBlock>

		<DsBlock title="Pesos" status="implemented">
			<div className="flex flex-col gap-1">
				{FONT_WEIGHTS.map(item => (
					<p key={item.name} style={{ fontWeight: Number(item.name) }}>
						{item.name} — {item.usage}
					</p>
				))}
			</div>
		</DsBlock>

		<DsBlock title="Encabezados (Title)" status="implemented">
			<PreviewFrame label="Title level 1–5. El componente no acepta level 6">
				<div className="flex flex-col gap-2">
					<Title title="H1 · Title level 1" level={1} />
					<Title title="H2 · Title level 2" level={2} />
					<Title title="H3 · Title level 3" level={3} />
					<Title title="H4 · Title level 4" level={4} />
					<Title title="H5 · Title level 5" level={5} />
					<Title title="Texto secundario · type=secondary" level={5} type="secondary" />
				</div>
			</PreviewFrame>
			<NotImplementedNote text="H6 no está implementado. Title tipa level como 1 | 2 | 3 | 4 | 5." />
		</DsBlock>

		<DsBlock title="Roles de texto" status="implemented">
			<PreviewFrame>
				<div className="flex max-w-md flex-col gap-3">
					<p>Texto normal de cuerpo. Ant Design usa 14px por defecto sobre Public Sans.</p>
					<FormLabel label="Etiqueta de formulario" htmlFor="demo-label" />
					<FormLabel label="Campo opcional" htmlFor="demo-optional" optional />
					<FormLabelError label="Mensaje de error de formulario" />
					<p className="label-text">Clase CSS .label-text (14px)</p>
					<div className="flex flex-wrap gap-2">
						<Button type="primary" size="small" label="Texto botón small" />
						<Button type="primary" size="middle" label="Texto botón middle" />
						<Button type="primary" size="large" label="Texto botón large" />
					</div>
					<p className="text-xs text-gray-500">
						Texto de tablas: 12px en paginación y cabeceras compactas (CSS de .itsa-table--head-rounded).
					</p>
				</div>
			</PreviewFrame>
			<SpecTable
				rows={TYPE_ROLES.map(item => ({
					label: item.role,
					value: `${item.source}. ${item.note}`,
				}))}
			/>
		</DsBlock>
	</DsSection>
);
